import os


class Config(object):
    PORT = int(os.environ.get("PORT", 3001))
    SECRET_KEY = os.environ.get("SECRET_KEY") or "test"
    WTF_CSRF_CHECK_DEFAULT = False
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
