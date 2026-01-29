import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://postgres:136%40visha@localhost:5432/QR_code_ordering_system'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
