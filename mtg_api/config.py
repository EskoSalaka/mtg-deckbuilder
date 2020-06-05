import os


class Config(object):
    PORT = int(os.environ.get("PORT", 3000))
    SECRET_KEY = os.environ.get("SECRET_KEY") or "test"
    WTF_CSRF_CHECK_DEFAULT = False
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = "postgres://akdyiqmwebhrjd:353fe3eec2e5f7d19863ce3522909cb3bc3259f435e0e61ba4b2a991a93e1964@ec2-54-247-78-30.eu-west-1.compute.amazonaws.com:5432/d9fnuokor8ie77"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
