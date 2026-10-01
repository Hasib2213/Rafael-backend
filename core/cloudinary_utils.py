"""
Cloudinary upload utility helpers.

Usage examples:
    from core.cloudinary_utils import upload_to_cloudinary, delete_from_cloudinary

    # Upload an avatar image
    result = upload_to_cloudinary(file_obj, folder='avatars', resource_type='image')
    url = result['secure_url']

    # Upload an audio briefing
    result = upload_to_cloudinary(file_obj, folder='audio_briefings', resource_type='video')
    url = result['secure_url']

    # Delete a file by public_id
    delete_from_cloudinary('avatars/some_public_id')
"""
import cloudinary.uploader


def upload_to_cloudinary(file, folder='uploads', resource_type='auto', **kwargs):
    """
    Upload a file to Cloudinary.

    Args:
        file: File object (InMemoryUploadedFile, TemporaryUploadedFile, or file path string)
        folder: Cloudinary folder to organize uploads (e.g., 'avatars', 'audio_briefings')
        resource_type: 'image', 'video' (also for audio), 'raw', or 'auto'
        **kwargs: Additional Cloudinary upload options

    Returns:
        dict: Cloudinary upload response with 'secure_url', 'public_id', etc.
    """
    upload_options = {
        'folder': f'rafael/{folder}',
        'resource_type': resource_type,
        'overwrite': True,
        **kwargs,
    }

    result = cloudinary.uploader.upload(file, **upload_options)
    return result


def upload_image(file, folder='avatars', **kwargs):
    """Upload an image to Cloudinary with auto-optimization."""
    return upload_to_cloudinary(
        file,
        folder=folder,
        resource_type='image',
        transformation=[
            {'quality': 'auto', 'fetch_format': 'auto'}
        ],
        **kwargs,
    )


def upload_audio(file, folder='audio_briefings', **kwargs):
    """Upload an audio file to Cloudinary."""
    return upload_to_cloudinary(
        file,
        folder=folder,
        resource_type='video',  # Cloudinary uses 'video' type for audio too
        **kwargs,
    )


def delete_from_cloudinary(public_id, resource_type='image'):
    """
    Delete a file from Cloudinary by its public_id.

    Args:
        public_id: The public ID of the file to delete
        resource_type: 'image', 'video', or 'raw'

    Returns:
        dict: Cloudinary deletion response
    """
    return cloudinary.uploader.destroy(public_id, resource_type=resource_type)


def get_cloudinary_url(public_id, **kwargs):
    """
    Generate a Cloudinary URL with optional transformations.

    Args:
        public_id: The public ID of the file
        **kwargs: Transformation options (width, height, crop, quality, etc.)

    Returns:
        str: The generated Cloudinary URL
    """
    import cloudinary.utils
    url, _ = cloudinary.utils.cloudinary_url(public_id, **kwargs)
    return url
