from facenet_pytorch import InceptionResnetV1

print("📥 Téléchargement de FaceNet...")
InceptionResnetV1(pretrained='vggface2')
print("✅ FaceNet prêt")
