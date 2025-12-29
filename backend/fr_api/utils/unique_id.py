from datetime import datetime
import os, random, string

def generate_unique_id(length=5):
    """Génère un ID unique de la longueur spécifiée"""
    # Utiliser des chiffres et des lettres pour plus d'unicité
    chars = string.digits + string.ascii_lowercase
    # Ajouter un timestamp court pour garantir l'unicité
    timestamp = datetime.now().strftime('%M%S')
    # Génère la partie aléatoire
    random_part = ''.join(random.choices(chars, k=length))
    
    return f"{timestamp}{random_part}"