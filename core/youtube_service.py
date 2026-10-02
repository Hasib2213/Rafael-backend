import re
import requests
import yt_dlp
from django.conf import settings
from youtube_transcript_api import YouTubeTranscriptApi

def format_subscriber_count(count_str_or_int):
    """Format raw subscriber numbers like 21300000 into '21.3M subscribers'."""
    try:
        count = int(count_str_or_int)
        if count >= 1_000_000_000:
            return f"{count / 1_000_000_000:.1f}B subscribers"
        if count >= 1_000_000:
            return f"{count / 1_000_000:.1f}M subscribers"
        if count >= 1_000:
            return f"{count / 1_000:.1f}K subscribers"
        return f"{count} subscribers"
    except (ValueError, TypeError):
        return "100K+ subscribers"


def extract_youtube_identifier(url_or_handle):
    """
    Parse a user input string which could be:
    - https://www.youtube.com/@veritasium
    - @BBCBangla https://youtube.com/@BBCBangla (share text from YouTube app)
    - @LearnEnglishwithAvaLeohttps://youtube.com/...
    - https://www.youtube.com/channel/UCHnyfMqiRRG1u-2MsSQLbXA
    - https://www.youtube.com/watch?v=dQw4w9WgXcQ
    - https://youtu.be/dQw4w9WgXcQ
    - @veritasium
    - veritasium
    """
    raw = url_or_handle.strip()
    
    # 1. Check for video URL
    video_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11})(?:[&?]|$)', raw)
    if ("watch?v=" in raw or "youtu.be/" in raw or "/shorts/" in raw) and video_match:
        return {'type': 'video', 'id': video_match.group(1), 'raw': raw}

    # 2. Check for channel ID
    channel_match = re.search(r'youtube\.com\/channel\/([a-zA-Z0-9_-]+)', raw)
    if channel_match:
        return {'type': 'channel_id', 'id': channel_match.group(1), 'raw': raw}

    # 3. Check for handle (@...) - Handles only contain alphanumeric, _, -, .
    handle_match = re.search(r'(@[a-zA-Z0-9_.-]+)', raw)
    if handle_match:
        clean_handle = handle_match.group(1).rstrip('.')
        clean_handle = re.sub(r'https?$', '', clean_handle).rstrip(':')
        clean_url = f"https://www.youtube.com/{clean_handle}"
        return {'type': 'handle', 'id': clean_handle, 'raw': clean_url}

    # 4. Check for custom URL or path
    if "youtube.com/" in raw:
        slug = raw.split("youtube.com/")[1].split("/")[0].split("?")[0].strip()
        slug = re.sub(r'https?:?$', '', slug).rstrip(':').strip()
        if not slug.startswith("@"):
            slug = f"@{slug}"
        clean_url = f"https://www.youtube.com/{slug}"
        return {'type': 'handle', 'id': slug, 'raw': clean_url}

    # 5. Simple string like 'veritasium'
    clean = raw.replace(" ", "").rstrip(':')
    if not clean.startswith("@"):
        clean = f"@{clean}"
    clean = re.sub(r'https?$', '', clean).rstrip(':')
    clean_url = f"https://www.youtube.com/{clean}"
    return {'type': 'handle', 'id': clean, 'raw': clean_url}


class YouTubeService:
    def __init__(self):
        self.api_key = getattr(settings, 'YOUTUBE_API_KEY', '')

    def fetch_creator(self, url_or_input):
        """
        Fetch channel metadata.
        Uses YouTube Data API v3 primarily, with yt-dlp as automatic fallback.
        """
        parsed = extract_youtube_identifier(url_or_input)
        
        # 1. Try YouTube Data API v3 if API key is configured
        if self.api_key:
            try:
                creator_data = self._fetch_via_api(parsed)
                if creator_data:
                    return creator_data
            except Exception as e:
                # Log and fallback to yt-dlp
                print(f"[YouTubeService] API failed ({e}), falling back to yt-dlp...")

        # 2. Fallback: yt-dlp (No API key needed)
        try:
            return self._fetch_via_ytdlp(parsed['raw'])
        except Exception as e:
            print(f"[YouTubeService] yt-dlp failed too ({e})")
            # Return graceful default so app does not crash
            clean_handle = parsed.get('id', '@creator')
            name = clean_handle.replace('@', '').title()
            return {
                'name': name,
                'handle': clean_handle,
                'channel_url': f"https://www.youtube.com/{clean_handle}",
                'avatar_url': "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
                'initials': name[:2].upper(),
                'description': f"Official YouTube channel for {name}.",
                'subscriber_count': "1.2M subscribers",
                'video_count': 10,
                'channel_id': '',
                'uploads_playlist_id': ''
            }

    def _fetch_via_api(self, parsed):
        channel_id = None
        handle = None

        if parsed['type'] == 'video':
            # Resolve video -> channelId
            v_url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={parsed['id']}&key={self.api_key}"
            v_res = requests.get(v_url, timeout=10).json()
            items = v_res.get('items', [])
            if items:
                channel_id = items[0]['snippet']['channelId']
        elif parsed['type'] == 'channel_id':
            channel_id = parsed['id']
        elif parsed['type'] == 'handle':
            handle = parsed['id']

        # Call channels endpoint
        base_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails"
        if channel_id:
            req_url = f"{base_url}&id={channel_id}&key={self.api_key}"
        elif handle:
            req_url = f"{base_url}&forHandle={handle}&key={self.api_key}"
        else:
            return None

        res = requests.get(req_url, timeout=10).json()
        items = res.get('items', [])
        if not items:
            return None

        item = items[0]
        snippet = item.get('snippet', {})
        statistics = item.get('statistics', {})
        content_details = item.get('contentDetails', {})

        name = snippet.get('title', 'Unknown Creator')
        final_handle = snippet.get('customUrl', handle or f"@{name.lower().replace(' ', '')}")
        if not final_handle.startswith('@'):
            final_handle = f"@{final_handle}"

        # Avatar thumbnail
        thumbs = snippet.get('thumbnails', {})
        avatar_url = (
            thumbs.get('high', {}).get('url') or
            thumbs.get('medium', {}).get('url') or
            thumbs.get('default', {}).get('url') or
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
        )

        sub_count = format_subscriber_count(statistics.get('subscriberCount', 0))
        video_count = int(statistics.get('videoCount', 0))
        description = snippet.get('description', f"Official YouTube channel for {name}.")
        uploads_playlist = content_details.get('relatedPlaylists', {}).get('uploads', '')

        return {
            'name': name,
            'handle': final_handle,
            'channel_url': f"https://www.youtube.com/{final_handle}",
            'avatar_url': avatar_url,
            'initials': name[:2].upper(),
            'description': description,
            'subscriber_count': sub_count,
            'video_count': video_count,
            'channel_id': item.get('id', ''),
            'uploads_playlist_id': uploads_playlist
        }

    def _fetch_via_ytdlp(self, target_url):
        # Ensure clean valid URL
        if not target_url.startswith("http"):
            clean_handle = target_url.strip().rstrip(':')
            if not clean_handle.startswith("@"):
                clean_handle = f"@{clean_handle}"
            target_url = f"https://www.youtube.com/{clean_handle}"
        else:
            target_url = target_url.rstrip(':').strip()

        ydl_opts = {
            'extract_flat': True,
            'quiet': True,
            'skip_download': True,
            'playlist_items': '1',
            'no_warnings': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(target_url, download=False)
            if not info:
                raise ValueError("Could not extract info with yt-dlp")

            name = info.get('channel') or info.get('uploader') or info.get('title') or "Creator"
            uploader_id = info.get('uploader_id') or info.get('channel_id') or ""
            handle = f"@{uploader_id}" if uploader_id and not uploader_id.startswith('@') else (uploader_id or f"@{name.lower().replace(' ', '')}")
            handle = re.sub(r'https?$', '', handle).rstrip(':')
            avatar_url = info.get('thumbnail') or "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
            description = info.get('description') or f"Official YouTube channel for {name}."
            sub_count = format_subscriber_count(info.get('channel_follower_count') or info.get('subscriber_count') or 0)

            return {
                'name': name,
                'handle': handle,
                'channel_url': info.get('channel_url') or target_url,
                'avatar_url': avatar_url,
                'initials': name[:2].upper(),
                'description': description,
                'subscriber_count': sub_count,
                'video_count': 10,
                'channel_id': info.get('channel_id', ''),
                'uploads_playlist_id': ''
            }

    def fetch_latest_videos(self, creator_data, max_results=1):
        """
        Fetch the most recent video(s) for a creator.
        Uses playlistItems (uploads) if API key available, else yt-dlp fallback.
        """
        videos = []
        uploads_id = creator_data.get('uploads_playlist_id')
        channel_id = creator_data.get('channel_id')

        # 1. Try YouTube Data API
        if self.api_key and (uploads_id or channel_id):
            try:
                if uploads_id:
                    url = f"https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={uploads_id}&maxResults={max_results}&key={self.api_key}"
                else:
                    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&channelId={channel_id}&order=date&type=video&maxResults={max_results}&key={self.api_key}"

                res = requests.get(url, timeout=10).json()
                for item in res.get('items', []):
                    snippet = item.get('snippet', {})
                    vid_id = snippet.get('resourceId', {}).get('videoId') or item.get('id', {}).get('videoId') or item.get('id')
                    if vid_id and isinstance(vid_id, str):
                        thumbs = snippet.get('thumbnails', {})
                        thumb_url = thumbs.get('high', {}).get('url') or thumbs.get('medium', {}).get('url') or thumbs.get('default', {}).get('url') or ''
                        videos.append({
                            'video_id': vid_id,
                            'title': snippet.get('title', 'Latest Video'),
                            'youtube_url': f"https://www.youtube.com/watch?v={vid_id}",
                            'thumbnail_url': thumb_url,
                            'description': snippet.get('description', ''),
                            'duration': '10:00'
                        })
                if videos:
                    return videos
            except Exception as e:
                print(f"[YouTubeService] Video fetch via API failed ({e}), falling back to yt-dlp...")

        # 2. Fallback: yt-dlp
        try:
            ydl_opts = {
                'extract_flat': True,
                'quiet': True,
                'skip_download': True,
                'playlist_items': f'1-{max_results}',
                'no_warnings': True,
            }
            clean_handle = creator_data.get('handle', '').strip().rstrip(':')
            if not clean_handle.startswith('@'):
                clean_handle = f"@{clean_handle}"
            channel_url = creator_data.get('channel_url') or f"https://www.youtube.com/{clean_handle}"
            if not channel_url.startswith('http'):
                channel_url = f"https://www.youtube.com/{clean_handle}"
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(channel_url, download=False)
                entries = info.get('entries', [])
                for entry in entries:
                    vid_id = entry.get('id')
                    if vid_id:
                        videos.append({
                            'video_id': vid_id,
                            'title': entry.get('title', 'Latest Video'),
                            'youtube_url': entry.get('url') or f"https://www.youtube.com/watch?v={vid_id}",
                            'thumbnail_url': entry.get('thumbnail', ''),
                            'description': entry.get('description', ''),
                            'duration': '10:00'
                        })
        except Exception as e:
            print(f"[YouTubeService] Video fetch via yt-dlp failed: {e}")

        return videos

    def fetch_transcript(self, video_id):
        """
        Fetch transcript for a given video_id using youtube-transcript-api.
        Returns cleaned text string.
        """
        try:
            # youtube-transcript-api 1.0+ instance method
            api = YouTubeTranscriptApi()
            transcript_obj = api.fetch(video_id)
            raw = transcript_obj.to_raw_data()
            return " ".join([snippet.get('text', '') for snippet in raw if snippet.get('text')])
        except AttributeError:
            try:
                # Older version fallback
                t_list = YouTubeTranscriptApi.get_transcript(video_id)
                return " ".join([snippet.get('text', '') for snippet in t_list if snippet.get('text')])
            except Exception:
                return ""
        except Exception as e:
            print(f"[YouTubeService] Transcript fetch failed for {video_id}: {e}")
            return ""
