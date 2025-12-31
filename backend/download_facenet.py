from facenet_pytorch import InceptionResnetV1
import sys
import os
from pathlib import Path
 
# print("📥 Téléchargement de FaceNet...")
# InceptionResnetV1(pretrained='vggface2')
# print("✅ FaceNet prêt")



# Forcer unbuffered output
os.environ['PYTHONUNBUFFERED'] = '1'

def download_facenet():
    """Télécharge les poids FaceNet une seule fois"""
    print("="*60, flush=True)
    print("🚀 TÉLÉCHARGEMENT DES MODÈLES FACENET", flush=True)
    print("="*60, flush=True)
    
    try:
        from facenet_pytorch import InceptionResnetV1, MTCNN
        
        # Télécharger InceptionResnetV1
        print("📥 Téléchargement InceptionResnetV1 (vggface2)...", flush=True)
        model = InceptionResnetV1(pretrained='vggface2')
        print("✅ InceptionResnetV1 téléchargé", flush=True)
        
        # Télécharger MTCNN
        print("📥 Téléchargement MTCNN...", flush=True)
        mtcnn = MTCNN()
        print("✅ MTCNN téléchargé", flush=True)
        
        print("="*60, flush=True)
        print("✅ TOUS LES MODÈLES SONT PRÊTS", flush=True)
        print("="*60, flush=True)
        
        return True
        
    except Exception as e:
        print(f"❌ ERREUR: {e}", file=sys.stderr, flush=True)
        return False

if __name__ == "__main__":
    success = download_facenet()
    sys.exit(0 if success else 1)
