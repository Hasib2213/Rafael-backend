import os
import tempfile
import asyncio
import edge_tts
from core.cloudinary_utils import upload_audio

DEFAULT_VOICE = "en-US-ChristopherNeural"


async def synthesize_speech(text: str, output_path: str, voice: str = DEFAULT_VOICE):
    """Generate MP3 audio file from text using Microsoft edge-tts."""
    clean_text = text.strip()
    if not clean_text:
        clean_text = "Welcome to your Curio briefing."
    communicate = edge_tts.Communicate(clean_text, voice)
    await communicate.save(output_path)


def generate_audio_briefing(text: str, identifier: str = "briefing") -> str:
    """
    Generate TTS audio for the briefing and upload it to Cloudinary.

    Args:
        text (str): Summary text to synthesize into spoken audio.
        identifier (str): Unique identifier or slug for naming.

    Returns:
        str: Secure Cloudinary URL of the uploaded audio briefing, or empty string on error.
    """
    temp_dir = tempfile.gettempdir()
    temp_file = os.path.join(temp_dir, f"curio_{identifier}_{os.getpid()}.mp3")

    try:
        # Run async synthesis synchronously
        asyncio.run(synthesize_speech(text, temp_file))

        if os.path.exists(temp_file) and os.path.getsize(temp_file) > 0:
            with open(temp_file, 'rb') as f:
                res = upload_audio(f, folder='audio_briefings')
                return res.get('secure_url', '')
    except Exception as e:
        print(f"[TTSService] Failed to synthesize/upload audio: {e}")
        return ""
    finally:
        # Clean up temporary file
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except OSError:
                pass

    return ""
