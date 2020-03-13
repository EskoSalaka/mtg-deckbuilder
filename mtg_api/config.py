import os

class Config(object):
    PORT = int(os.environ.get("PORT", 3000))
    SECRET_KEY = os.environ.get("SECRET_KEY")
    WTF_CSRF_CHECK_DEFAULT = False
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = "postgres://pujlddrtzpxvlr:d78b2bb82b72242d64e5f4468c51debee98f967ca1416bcdd6371cec54ef5c85@ec2-52-86-33-50.compute-1.amazonaws.com:5432/d87arnel0uvejf"

    SQLALCHEMY_TRACK_MODIFICATIONS = False

