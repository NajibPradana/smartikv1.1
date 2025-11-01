# backend/app/services/firestore.py
from firebase_admin import firestore, credentials, initialize_app
import firebase_admin
import os

# HARDCODE PATH (PASTI JALAN!)
CREDENTIALS_PATH = r"C:\CAPSTONE\smartikv1\firebase\serviceAccountKey.json"

print(f"Loading Firebase credentials from: {CREDENTIALS_PATH}")

# Cek file ada
if not os.path.exists(CREDENTIALS_PATH):
    raise FileNotFoundError(f"File tidak ditemukan: {CREDENTIALS_PATH}")

# Inisialisasi Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate(CREDENTIALS_PATH)
    initialize_app(cred)

db = firestore.client()

def get_artikels():
    docs = db.collection("artikel").stream()
    return [{"id": doc.id, **doc.to_dict()} for doc in docs]

def create_artikel(data: dict):
    doc_ref = db.collection("artikel").document()
    doc_ref.set(data)
    return {"id": doc_ref.id, **data}