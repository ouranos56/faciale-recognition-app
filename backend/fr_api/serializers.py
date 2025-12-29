from rest_framework import serializers

from .utils.unique_id import generate_unique_id

from .utils.supabase_storage import upload_image_to_supabase
from .models import UploadImageAndPredict
from datetime import datetime
import os, random, string


class UploadImageAndPredictSerializer(serializers.ModelSerializer):
    # accepter une session_id fournie ou en générer une côté serveur
    session_id = serializers.UUIDField(required=False, allow_null=True)

    class Meta:
        model = UploadImageAndPredict
        fields = '__all__'
        # read_only_fields permet d'empêcher la modification de ces champs via l'API
        read_only_fields = ['id', 'unique_id', 'img1_url', 'img2_url', 'prediction', 'date_upload', 'session_id']

    def create(self, validated_data):
        unique_id = generate_unique_id()

        # Extraire les images (elles ne vont PAS en DB)
        img1 = validated_data.pop("img1")
        img2 = validated_data.pop("img2")

        # Upload vers Supabase avec le même UUID
        img1_url = upload_image_to_supabase(img1, unique_id, 1)
        img2_url = upload_image_to_supabase(img2, unique_id, 2)

        # 4️⃣ Créer l’objet UNE SEULE FOIS
        instance = UploadImageAndPredict.objects.create(
            unique_id=unique_id,
            img1_url=img1_url,
            img2_url=img2_url,
            **validated_data
        )

        # 5️⃣ Lancer la prédiction
        instance.make_prediction()
        instance.save()

        return instance
