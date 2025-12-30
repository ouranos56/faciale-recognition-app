import requests
from PIL import Image
from io import BytesIO

def load_image_from_url(url):
    response = requests.get(url)
    # response.raise_for_status()
    # cette ci-dessus fait lever une exception pour les codes d'erreur HTTP
    return Image.open(BytesIO(response.content)).convert("RGB")
