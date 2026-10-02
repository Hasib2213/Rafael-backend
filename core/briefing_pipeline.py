import threading
from apps.creators.models import Creator, CreatorFollow
from apps.briefings.models import Briefing
from core.youtube_service import YouTubeService
from core.gemini_service import GeminiService
from core.tts_service import generate_audio_briefing


def generate_briefing_for_video(creator, video_data):
    """
    Given a creator and video data, fetch transcript, summarize with Gemini,
    synthesize speech with edge-tts, upload to Cloudinary, and save Briefing.
    """
    try:
        vid_url = video_data.get('youtube_url', '')
        if not vid_url:
            return None

        # Check if briefing already exists for this video
        existing = Briefing.objects.filter(youtube_url=vid_url).first()
        if existing:
            return existing

        yt = YouTubeService()
        gemini = GeminiService()

        # 1. Fetch transcript or fallback to description
        transcript = yt.fetch_transcript(video_data['video_id'])
        content_text = transcript if transcript else video_data.get('description', '')

        # 2. Generate AI summary
        ai_res = gemini.summarize_video(
            video_title=video_data['title'],
            transcript_or_text=content_text,
            creator_name=creator.name
        )

        # 3. Generate neural TTS audio and upload to Cloudinary
        audio_text = ai_res.get('summary', '')
        audio_url = ""
        if audio_text:
            try:
                audio_url = generate_audio_briefing(audio_text, identifier=video_data['video_id'])
            except Exception as e:
                print(f"[Pipeline] Audio generation failed: {e}")

        # 4. Save Briefing record
        briefing = Briefing.objects.create(
            creator=creator,
            title=ai_res.get('title') or video_data['title'],
            youtube_url=vid_url,
            duration=video_data.get('duration', '10:00'),
            thumbnail_url=video_data.get('thumbnail_url') or creator.avatar_url,
            summary=ai_res.get('summary', ''),
            full_summary=ai_res.get('full_summary', ''),
            key_takeaways=ai_res.get('key_takeaways', []),
            audio_url=audio_url,
            timeframe='daily',
            category=ai_res.get('category', 'Technology')
        )
        print(f"[Pipeline] Successfully generated briefing for '{briefing.title}' with audio: {bool(audio_url)}")
        return briefing

    except Exception as e:
        print(f"[Pipeline] Error generating briefing for video {video_data.get('title')}: {e}")
        return None


def generate_creator_briefings_background(creator, creator_dict):
    """Worker function to fetch latest videos and generate briefings in background thread."""
    try:
        yt = YouTubeService()
        latest_videos = yt.fetch_latest_videos(creator_dict, max_results=1)
        for vid in latest_videos:
            generate_briefing_for_video(creator, vid)
    except Exception as e:
        print(f"[Pipeline] Background briefing task failed: {e}")


def process_add_creator(user, url, run_background_briefing=True):
    """
    Main entry point for adding a creator by URL or handle.
    1. Fetches channel metadata (YouTube API v3 with yt-dlp fallback)
    2. Creates or updates Creator
    3. Auto-follows creator for the user
    4. Triggers AI briefing generation for the latest video
    """
    yt = YouTubeService()
    creator_dict = yt.fetch_creator(url)

    # Clean handle
    handle = creator_dict['handle']
    if not handle.startswith('@'):
        handle = f"@{handle}"

    creator, created = Creator.objects.get_or_create(
        handle=handle,
        defaults={
            'name': creator_dict['name'],
            'channel_url': creator_dict['channel_url'],
            'avatar_url': creator_dict['avatar_url'],
            'initials': creator_dict['initials'],
            'description': creator_dict['description'],
            'subscriber_count': creator_dict['subscriber_count'],
            'video_count': creator_dict['video_count'],
        }
    )

    if not created:
        # Update existing record with fresh stats
        creator.name = creator_dict['name']
        creator.avatar_url = creator_dict['avatar_url']
        creator.description = creator_dict['description']
        creator.subscriber_count = creator_dict['subscriber_count']
        creator.video_count = creator_dict['video_count']
        creator.save()

    # Auto follow for user
    if user and user.is_authenticated:
        CreatorFollow.objects.get_or_create(user=user, creator=creator)

    # Generate briefing for latest video
    if run_background_briefing:
        # Run asynchronously in background thread so HTTP response is instant
        t = threading.Thread(
            target=generate_creator_briefings_background,
            args=(creator, creator_dict),
            daemon=True
        )
        t.start()
    else:
        generate_creator_briefings_background(creator, creator_dict)

    return creator, created
