import uuid
from django.db import models
from django.core.validators import FileExtensionValidator
from django.forms import ValidationError
from django.utils import timezone
import os, random, string
from datetime import datetime
from .fr_facenet import fr_predict


def validate_file_size(file):
    max_size = 5 * 1024 * 1024  # 5 Mo en octets
    if file.size > max_size:
        raise ValidationError('La taille du fichier ne doit pas dépasser 5 Mo.')

def generate_unique_id(length=5):
    """Génère un ID unique de la longueur spécifiée"""
    # Utiliser des chiffres et des lettres pour plus d'unicité
    chars = string.digits + string.ascii_lowercase
    # Ajouter un timestamp court pour garantir l'unicité
    timestamp = datetime.now().strftime('%M%S')
    # Génère la partie aléatoire
    random_part = ''.join(random.choices(chars, k=length))
    return f"{timestamp}{random_part}"

def get_path_1(instance, filename):
    # Récupère l'extension du fichier original
    ext = os.path.splitext(filename)[1].lower()
    new_name = f"img_{instance.unique_id}_1{ext}"
    return new_name

def get_path_2(instance, filename):
    # Récupère l'extension du fichier original
    ext = os.path.splitext(filename)[1].lower()
    new_name = f"img_{instance.unique_id}_2{ext}"
    return new_name

def get_prediction(instance):
    """Modèle pour stocker les résultats de la reconnaissance faciale"""
    
    instance = instance.objects.all()
    instance = instance[:1] #len(instance) 

    # Accès au chemin physique sur le serveur/PC (pour lecture/écriture locale)
    image1_path = instance[0].path # Ex. '/path/to/project/media/images/monimage1.jpg'
    image2_path = instance[1].path 

    # Accès à l'URL pour l'affichage web (relatif à MEDIA_URL)
    # print(instance.image1.url)  # Ex. '/media/images/monimage1.jpg'
    
    prediction = fr_predict(image1_path, image2_path, 'C:/Users/HP/Pracrice/fullstack_fr/backend/fr_api/fr_facenet_SVC.joblib')

    return prediction


class UploadImageAndPredict(models.Model):
    """Modèle pour stocker les images avec leurs métadonnées"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    unique_id = models.CharField(
        max_length=10,
        default=generate_unique_id,
        editable=False,
        verbose_name="Identifiant unique"
    )

    img1 = models.ImageField(
        upload_to=get_path_1,
        validators=[
            FileExtensionValidator(
                allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp'],
                message="Format d'image non supporté. Utilisez JPG, PNG, GIF ou WEBP."
            ),
            validate_file_size
        ],
        verbose_name="Image 1"
    )
    
    img2 = models.ImageField(
        upload_to = get_path_2,
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                message = "Format d'image non supporté. Utilisez JPG, PNG, GIF ou WEBP."
            ),
            validate_file_size
        ],
        verbose_name = "Image 2"
    )
    
    selected_model = models.IntegerField(
        null = False, 
        blank = False, 
        editable= True,
        default= 0,
        verbose_name = "Model choisi"
    )
    
    prediction = models.CharField(
        max_length = 255,
        null = True,
        blank = False,
        editable= True,
        verbose_name = "Prédiction"
    )

    rightprediction = models.CharField(
        # Corrige la prédiction d'après l'utilisateur
        max_length = 255,
        null = True,
        blank = True,
        editable=  True,
        verbose_name = "Prédiction corriger par l'utilisateur"
    )
    
    #  make_prediction est exécutée automatiquement après la création de l'instance
    # une instance c'est-à-dire un enregistrement de ce modèle dans la base de données
    
    def make_prediction(self):
        """Effectue la prédiction après la création de l'instance"""
        # Accès au chemin physique sur le serveur/PC
        image1_path = self.img1.path
        image2_path = self.img2.path
        model = "SVC" if self.selected_model == 0 else "MLPClassifier"
        
        self.prediction = fr_predict(
            image1_path, 
            image2_path, 
            f'C:/Users/HP/Pracrice/fullstack_fr/backend/fr_api/fr_facenet_{model}_1.joblib'
        )
        self.save()

    date_upload = models.DateTimeField(
        auto_now_add=True,
        editable= False,
        verbose_name="Date d'upload"
    )

    session_id = models.CharField(
        max_length=255, 
        null=True, 
        blank=True,
        verbose_name="ID de session"    
    )

    class Meta:
        verbose_name = "Image"
        verbose_name_plural = "Images"
        ordering = ['-date_upload']  # Plus récent en premier
    
    def __str__(self):
        return f"Images {self.unique_id} (Uploadé le {self.date_upload.strftime('%d/%m/%Y')})"
    