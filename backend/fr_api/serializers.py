from rest_framework import serializers
from .models import UploadImageAndPredict

class UploadImageAndPredictSerializer(serializers.ModelSerializer):
    # accepter une session_id fournie ou en générer une côté serveur
    session_id = serializers.UUIDField(required=False, allow_null=True)

    class Meta:
        model = UploadImageAndPredict
        fields = '__all__'
        # read_only_fields permet d'empêcher la modification de ces champs via l'API
        read_only_fields = ['id', 'unique_id', 'prediction', 'date_upload', 'session_id']

    def create(self, validated_data):
        # Créer l'instance avec les données validées
        instance = UploadImageAndPredict.objects.create(**validated_data)
        # Effectuer la prédiction après la création
        instance.make_prediction()
        return instance