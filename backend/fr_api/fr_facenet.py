import os, joblib, numpy as np, torch
import requests
from PIL import Image
from io import BytesIO
from facenet_pytorch import MTCNN, InceptionResnetV1

from .utils.image_loader import load_image_from_url


device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print("\tDevice:", device)

# modèles (MTCNN pour detection + InceptionResnetV1 pour embeddings)
mtcnn = MTCNN(
    image_size=160, 
    margin=20,  # la marge
    min_face_size=30,  # la taille minimale
    thresholds=[0.5, 0.6, 0.6],  # les seuils
    device=device
)

# Chargement global (1 fois)
resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)

# base_dir = os.path.dirname(__file__)
# facenet_path = os.path.join(base_dir,"ml_models","20180402-114759-vggface2.pt")
# resnet = InceptionResnetV1(pretrained=False).to(device) 
# resnet.load_state_dict(torch.load(facenet_path, map_location=device) )
# resnet.eval()

def get_embedding(img_path):
    try:
        # Vérifier si le fichier existe
        try:
            # Charger l'image depuis l'URL
            # img = load_image_from_url(img_path)
            img = Image.open(BytesIO(requests.get(img_path).content)).convert("RGB")
            print(f"get_embedding: successfully loaded image from {img_path}")
        except Exception as e:
            print(f"Erreur lors du chargement de l'image : {e}")
            return None
                
        # Ouvrir l'image et la convertir en RGB
        # img = load_image_from_url(img_path)
        # img = Image.open(img_path).convert('RGB')

        # Détecter le visage dans l'image et obtenir un tensor
        face_tensor = mtcnn(img)  # None si si aucun visage detecté

        if face_tensor is None:
            # Si aucun visage n'est détecté, afficher un message et retourner None
            print(f"Visage non détecté dans : {img_path}")
            return None

        # Ajouter une dimension de batch au tensor du visage et le déplacer vers le device (GPU ou CPU)
        face_tensor = face_tensor.unsqueeze(0).to(device)  # batch dimension
            
        # Désactiver le calcul des gradients pour l'inférence
        with torch.no_grad():
            # Obtenir l'embedding du visage en utilisant le modèle resnet
            emb = resnet(face_tensor).cpu().numpy()[0]

        # L2-normaliser l'embedding pour s'assurer que sa norme est de 1
        emb = emb / np.linalg.norm(emb)
        # Retourner l'embedding calculé
        return emb

    except Exception as e:
        # En cas d'erreur pendant le traitement de l'image, afficher un message d'erreur et retourner None
        print(f"Erreur lors du traitement de {img_path} : {str(e)}")
        return None
        
def fr_predict(imga_path, imgb_path, model_path):
    # Charger le modèle + scaler
    print(f"Chargement du modèle depuis : {model_path}")
    model_data = joblib.load(model_path)
    clf = model_data['classifier']
    scaler = model_data['scaler']

    emb_a = get_embedding(imga_path)
    emb_b = get_embedding(imgb_path)

    if emb_a is None and emb_b is None:
        return "Impossible de calculer la représentation vectorielle du visage dans ces images."
    elif emb_b is None:
        return "Impossible de calculer la représentation vectorielle du visage dans l' image2."
    elif emb_a is None:
        return "Impossible de calculer la représentation vectorielle du visage dans l' image1."

    # Calculer la feature (absdiff)
    feat = np.concatenate([emb_a, emb_b, np.abs(emb_a - emb_b)]).reshape(1, -1)
    feat = feat / np.linalg.norm(feat) 

    # Standardisation des features pour les mettre (les feats) à la même échelle (moyenne=0, écart-type=1)
    feat_s = scaler.transform(feat)

    # Prédire avec le classifieur
    pred = clf.predict(feat_s)
    if hasattr(clf, "predict_proba"):
        proba = clf.predict_proba(feat_s)[0, 1]
        print(f"\nPrédiction: {pred[0]}, Probabilité/Taux de concordance : {proba*100:.2f}%")
    else:
        proba = None
        print(f"\nPrédiction: {pred[0]}, Probabilité/Taux de concordance : {proba}")

    print(f"Pred: {pred}")
    print("\n\t\t✅Identiques✅\n\n" if pred[0] == 1 else "\n\t\t❌❌Différents❌❌\n\n")

    return f"{int(pred[0])}_{float(round(proba, 4))}"
