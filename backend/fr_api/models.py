import uuid
from django.db import models
import os, random, string
from datetime import datetime
from .utils.unique_id import generate_unique_id
from .fr_facenet import fr_predict

class UploadImageAndPredict(models.Model):
    """Modèle pour stocker les images avec leurs métadonnées"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    unique_id = models.CharField(
        max_length=10,
        default=generate_unique_id,
        editable=False,
        verbose_name="Identifiant unique"
    )

    img1_url = models.URLField(
        blank=True, 
        null=True,
        editable= False
    )
    
    img2_url = models.URLField(
        blank=True, 
        null=True,
        editable= False
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
        image1_url = self.img1_url
        image2_url = self.img2_url
        model = "SVC" if self.selected_model == 0 else "MLPClassifier"
        
        self.prediction = fr_predict(
            image1_url, 
            image2_url, 
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
    