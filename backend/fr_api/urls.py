from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('predictions/', views.UploadedImagesPredictionView.as_view(), name='uploaded-images-prediction'),
    path('predictions/<uuid:id>/', views.RetrieveUpdateWrongPredictionView.as_view(), name='update-wrong-prediction'),
    path("predictions/session/<str:session_id>/feedback/", views.RetrieveUserUpdateFeedBackView.as_view(), name="new-user-feedback"),
    path('contact-us/', views.SendEmailView.as_view(), name='contact_us'),
]
