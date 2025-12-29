import uuid
from supabase import create_client
from django.conf import settings

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

BUCKET = settings.SUPABASE_BUCKET

def upload_image_to_supabase(file, session_uuid: uuid.UUID, index: int):
    """
    Upload une image vers Supabase avec un nom déterministe :
    <uuid>_<index>.ext
    """
    # Extension du fichier
    ext = file.name.split(".")[-1]

    # Nom final du fichier
    filename = f"{session_uuid}_{index}.{ext}"

    # Upload
    supabase.storage.from_(BUCKET).upload(
        filename,
        file.file,
        {"content-type": file.content_type}
    )

    # URL publique
    public_url = supabase.storage.from_(BUCKET).get_public_url(filename)

    return public_url