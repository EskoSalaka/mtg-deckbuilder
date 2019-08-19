import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.urandom(32)
    WTF_CSRF_CHECK_DEFAULT=False
    WTF_CSRF_ENABLED=False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FLASK_APP='mtg-deckbuilder-api.py'
    SERVER_NAME='localhost:5000'