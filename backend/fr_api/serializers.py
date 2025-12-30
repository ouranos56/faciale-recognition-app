from rest_framework import serializers

from .utils.unique_id import generate_unique_id

from .utils.supabase_storage import upload_image_to_supabase
from .models import UploadImageAndPredict
from datetime import datetime
import os, random, string
from django.core.validators import FileExtensionValidator
from django.forms import ValidationError

def validate_file_size(file):
    max_size = 3.5 # Mo en octets
    if file.size > max_size * 1024 * 1024:
        raise ValidationError(f"La taille du fichier ne doit pas dépasser {max_size}MB.")


class UploadImageAndPredictSerializer(serializers.ModelSerializer):
    # accepter une session_id fournie ou en générer une côté serveur
    session_id = serializers.UUIDField(required=False, allow_null=True)
    
    # Fichiers temporaires pour l'upload (pas persistants en base)
    img1 = serializers.ImageField(
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                message = "Format d'image non supporté. Utilisez JPG, PNG, GIF ou WEBP."
            ),
            validate_file_size
        ],
        required=True,  
        allow_null=False,
        write_only=True
    )
    img2 = serializers.ImageField(
        validators = [
            FileExtensionValidator(
                allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                message = "Format d'image non supporté. Utilisez JPG, PNG, GIF ou WEBP."
            ),
            validate_file_size
        ],
        required=True,  
        allow_null=False,
        write_only=True
    )    

    class Meta:
        model = UploadImageAndPredict
        fields = '__all__'
        # read_only_fields permet d'empêcher la modification de ces champs via l'API
        read_only_fields = ['id', 'unique_id', 'img1_url', 'img2_url', 'prediction', 'date_upload']

    def create(self, validated_data):
        unique_id = generate_unique_id()

        # Extraire les images (elles ne vont PAS en DB)
        img1 = validated_data.pop("img1")
        img2 = validated_data.pop("img2")

        # Upload vers Supabase avec le même UUID
        img1_url = upload_image_to_supabase(img1, unique_id, 1)
        img2_url = upload_image_to_supabase(img2, unique_id, 2)

        # Créer l’objet UNE SEULE FOIS
        instance = UploadImageAndPredict.objects.create(
            unique_id=unique_id,
            img1_url=img1_url,
            img2_url=img2_url,
            **validated_data
        )

        # Lancer la prédiction
        # instance.make_prediction()
        instance.save()

        return instance
