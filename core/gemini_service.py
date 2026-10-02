import json
import re
import requests
from django.conf import settings

CANDIDATE_MODELS = [
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash-lite',
]


class GeminiService:
    def __init__(self):
        self.api_key = getattr(settings, 'GEMINI_API_KEY', '')

    def summarize_video(self, video_title, transcript_or_text, creator_name=""):
        """
        Generate AI briefing: title, summary, full_summary, key_takeaways, and category.
        """
        if not self.api_key:
            return self._fallback_summary(video_title, transcript_or_text, creator_name)

        # Truncate text if too long to save token processing
        truncated_text = transcript_or_text[:12000] if transcript_or_text else video_title

        prompt = f"""You are an elite AI content synthesizer for Curio, an executive audio briefing app.
Transform this YouTube video into an engaging, high-impact executive briefing.

Video Title: {video_title}
Creator: {creator_name}
Content/Transcript:
{truncated_text}

Respond ONLY with a valid JSON object with the following fields:
{{
  "title": "A punchy, professional headline for this briefing (max 90 chars)",
  "summary": "A captivating, concise 2-3 sentence teaser/executive summary (approx 40-60 words) suitable to be read aloud as audio introduction",
  "full_summary": "A rich, comprehensive 2-3 paragraph summary breaking down the core thesis, insights, and evidence",
  "key_takeaways": [
    "First actionable key takeaway with depth",
    "Second critical insight or revelation",
    "Third strategic takeaway or implication"
  ],
  "category": "Pick best one from: Science, Technology, Business, Productivity, Philosophy, Design, Economics"
}}
Do NOT include markdown formatting or backticks around the JSON. Output pure JSON."""

        for model in CANDIDATE_MODELS:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={self.api_key}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "temperature": 0.4,
                    }
                }
                res = requests.post(url, json=payload, timeout=25)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get('candidates', [])
                    if candidates:
                        text_output = candidates[0]['content']['parts'][0]['text']
                        parsed = self._clean_and_parse_json(text_output)
                        if parsed and 'summary' in parsed:
                            return parsed
                elif res.status_code in [429, 503]:
                    # Temporary rate limit or busy, try next candidate model
                    continue
                else:
                    print(f"[GeminiService] Model {model} returned status {res.status_code}: {res.text[:200]}")
            except Exception as e:
                print(f"[GeminiService] Error calling {model}: {e}")
                continue

        # If all API calls fail, fallback gracefully
        return self._fallback_summary(video_title, transcript_or_text, creator_name)

    def _clean_and_parse_json(self, raw_text):
        """Extract and parse JSON safely from LLM output."""
        cleaned = raw_text.strip()
        # Remove ```json and ``` code blocks if present
        if cleaned.startswith("```"):
            cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
            cleaned = re.sub(r"\s*```$", "", cleaned)

        try:
            return json.loads(cleaned)
        except json.JSONDecodeError:
            # Try to find JSON inside text
            match = re.search(r'(\{[\s\S]*\})', cleaned)
            if match:
                try:
                    return json.loads(match.group(1))
                except json.JSONDecodeError:
                    pass
        return None

    def _fallback_summary(self, video_title, text, creator_name):
        """Graceful fallback if AI is unreachable."""
        teaser = text[:300].strip() if text else f"An engaging briefing by {creator_name or 'the creator'} on {video_title}."
        return {
            "title": video_title or f"Briefing: {creator_name}",
            "summary": teaser,
            "full_summary": f"In this briefing, {creator_name or 'the creator'} discusses key concepts surrounding '{video_title}'.\n\n{teaser}",
            "key_takeaways": [
                f"Core focus on {video_title}.",
                f"Presented with expert perspective from {creator_name}.",
                "Critical concepts synthesized for daily digest."
            ],
            "category": "Technology"
        }
