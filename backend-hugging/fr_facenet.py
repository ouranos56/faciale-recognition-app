class EndpointHandler:
    def __init__(self, model_dir: str):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print("\tDevice:", self.device)

        self.mtcnn = MTCNN(
            image_size=160,
            margin=20,
            min_face_size=30,
            thresholds=[0.5, 0.6, 0.6],
            device=self.device
        )

        self.resnet = InceptionResnetV1(pretrained='vggface2').eval().to(self.device)


    def get_embedding(self, img_path):
        try:
            if not os.path.exists(img_path):
                return None

            img = Image.open(img_path).convert('RGB')
            face_tensor = self.mtcnn(img)

            if face_tensor is None:
                return None

            face_tensor = face_tensor.unsqueeze(0).to(self.device)

            with torch.no_grad():
                emb = self.resnet(face_tensor).cpu().numpy()[0]

            return emb / np.linalg.norm(emb)

        except:
            return None


    def __call__(self, request):

        # Hugging Face standard
        inputs = request.get("inputs", {})

        imga_path = inputs.get("img1_path")
        imgb_path = inputs.get("img2_path")
        model_path = inputs.get("model_path")

        # Charger modèle
        model_data = joblib.load(model_path)
        clf = model_data["classifier"]
        scaler = model_data["scaler"]

        emb_a = self.get_embedding(imga_path)
        emb_b = self.get_embedding(imgb_path)

        if emb_a is None and emb_b is None: 
          return "Impossible de calculer la représentation vectorielle du visage dans ces images." 
        elif emb_b is None: 
          return "Impossible de calculer la représentation vectorielle du visage dans l' image2." 
        elif emb_a is None: 
          return "Impossible de calculer la représentation vectorielle du visage dans l' image1."

        feat = np.concatenate([emb_a, emb_b, np.abs(emb_a - emb_b)]).reshape(1, -1)
        feat = feat / np.linalg.norm(feat)
        feat_s = scaler.transform(feat)

        pred = clf.predict(feat_s)

        if hasattr(clf, "predict_proba"): 
          proba = clf.predict_proba(feat_s)[0, 1] 
          print(f"\nPrédiction: {pred[0]}, Probabilité/Taux de concordance : {proba*100:.2f}%") 
        else: 
          proba = None 
          print(f"\nPrédiction: {pred[0]}, Probabilité/Taux de concordance : {proba}")

        print("\n\t\t✅Identiques✅\n\n" if pred[0] == 1 else "\n\t\t❌❌Différents❌❌\n\n")
        
        return f"{int(pred[0])}_{float(round(proba, 4))}"

        
            
            
