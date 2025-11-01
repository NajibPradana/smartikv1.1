# app/main.py (UPDATE BARIS TERAKHIR)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="My Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend FastAPI + Firebase BERHASIL JALAN!"}

# Include routers
from .routers import test, artikel
app.include_router(test.router)
app.include_router(artikel.router)  # ← BARU!