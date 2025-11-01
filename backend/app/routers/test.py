from fastapi import APIRouter

router = APIRouter(prefix="/test", tags=["test"])

@router.get("/")
def coba():
    return {"status": "OK", "pesan": "Backend sudah connect!"}