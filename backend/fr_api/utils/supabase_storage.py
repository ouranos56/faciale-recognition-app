import uuid
from supabase import create_client
from django.conf import settings

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

BUCKET = settings.SUPABASE_BUCKET

def upload_image_to_supabase(file, session_uuid, index: int):
    """
    Upload une image vers Supabase avec un nom déterministe :
    <uuid>_<index>.ext
    """
    try:
        # Extension du fichier
        ext = file.name.split(".")[-1]

        # Nom final du fichier
        filename = f"{session_uuid}_{index}.{ext}"

        # lire les bytes du fichier Django
        file_bytes = file.read()
        print(f"⏩⏩Uploading file to Supabase with name: {filename}")  
        # Upload
        response = supabase.storage.from_(BUCKET).upload(
            path=filename,
            file=file_bytes,
            file_options={
                "content-type": file.content_type,
                # "upsert": True
            }
        )
        print(f"⏩⏩ File {filename} uploaded successfully.")

        # IMPORTANT : reset le curseur
        file.seek(0)

        # URL publique
        public_url = supabase.storage.from_(BUCKET).get_public_url(filename)
        print("✅ UPLOAD VIA BYTES SUPABASE")

        return public_url
    
    except Exception as e:
        print(f"❌ Erreur lors de l'upload vers Supabase : {str(e)}")
        raise Exception(f"Erreur upload Supabase : {str(e)}")