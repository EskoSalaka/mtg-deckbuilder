import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY")
    WTF_CSRF_CHECK_DEFAULT = False
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FLASK_APP = "mtg_api"
    SERVER_NAME = "localhost:3000"

