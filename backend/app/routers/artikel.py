# app/routers/artikel.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.firestore import get_artikels, create_artikel

router = APIRouter(prefix="/artikel", tags=["artikel"])

class ArtikelCreate(BaseModel):
    judul: str
    isi: str
    author: str
    kategori: str = "umum"

@router.get("/")
def list_artikel():
    try:
        return get_artikels()
    except Exception as e:
        raise HTTPException(500, f"Error: {str(e)}")

@router.post("/")
def tambah_artikel(artikel: ArtikelCreate):
    try:
        result = create_artikel(artikel.dict())
        return {"message": "Artikel berhasil disimpan!", "data": result}
    except Exception as e:
        raise HTTPException(500, f"Error: {str(e)}")