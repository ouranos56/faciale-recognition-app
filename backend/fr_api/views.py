import uuid
from django import forms
from django.http import HttpResponse
from django.shortcuts import redirect, render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.conf import settings
from .models import UploadImageAndPredict
from .serializers import UploadImageAndPredictSerializer
from django.core.mail import send_mail
from django.core.mail import EmailMessage

# for instance in MyModel.objects.all():
        # print(f"{instance.name}: {instance.image1.url}, {instance.image2.url}")

def home(request):
    return HttpResponse("It work...")

class UploadedImagesPredictionView(generics.ListCreateAPIView):
    """
    Gère l'upload des images et return une prediction.
    """
    # queryset = UploadImageAndPredict.objects.all()
    
    serializer_class = UploadImageAndPredictSerializer

    def get_queryset(self):
        # si session_id en query param -> filtrer dessus
        session = self.request.query_params.get("session_id")

        if not session:
            # Ne pas exposer toutes les prédictions publiquement : retourner rien si pas de session_id
            return UploadImageAndPredict.objects.none()  

        qs = UploadImageAndPredict.objects.all()
        try:
            uid = uuid.UUID(session)
            qs = qs.filter(session_id=uid)
        except (ValueError, TypeError):
            return UploadImageAndPredict.objects.none()
        return qs

        
    
    def perform_create(self, serializer):
        # Si client n'a pas fourni session_id, en créer une côté serveur
        data_sid = serializer.validated_data.get("session_id")
        sid = None
        if data_sid:
            try:
                sid = uuid.UUID(str(data_sid))
            except (ValueError, TypeError):
                sid = uuid.uuid4()
        else:
            sid = uuid.uuid4()

        instance = serializer.save(session_id=sid)

        return instance
    
    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     instance = self.perform_create(serializer)

    #     # Renvoyer les données de prédiction directement ici
    #     output = self.get_serializer(instance)
    #     return Response(output.data, status=status.HTTP_201_CREATED)

    

class RetrieveUpdateWrongPredictionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UploadImageAndPredict.objects.all()
    serializer_class = UploadImageAndPredictSerializer
    lookup_field = "id"




class SendEmailView(APIView):
    def post(self, request):

        # if request.method == "POST":
        #     form= ContactUsForm(request.POST)

        first_name = request.data.get("firstname")
        name = request.data.get("name")
        email = request.data.get("email")
        message = request.data.get("message")
        consented = request.data.get("consented", False)

        subject = f"Nouveau message de {name}"

        if (not name) or (not email) or (not message):
            return Response({"error": "Champs manquants"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            print("Envoi du mail...")
            # Créer un objet EmailMessage pour plus de contrôle
            
            
            email_message = EmailMessage(
                subject=subject,
                body=f"Message de: {first_name} {name if name else ""} <{email}>\n\nMessage:\n\n\t{message if message else ""}\n\n\n{'Consented to be contacted.' if consented and consented != False else 'Did not consent to be contacted.'}",
                from_email=settings.EMAIL_HOST_USER,  # L'email authentifié doit être utilisé comme expéditeur
                to=[settings.EMAIL_HOST_USER],
                headers={'Reply-To': email}  # L'email de l'utilisateur sera utilisé pour la réponse
            )
            
            email_message.send(fail_silently=False)
            print("Mail envoyé avec succès !")
                
            return Response({"success": "Mail envoyé avec succès !"}, status=status.HTTP_200_OK)
                
        except Exception as e:
                print("Erreur d'envoi :", e)
                return Response({"error": "Erreur d'envoi du mail"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)