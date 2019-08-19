from flask import Flask
from flask_login import LoginManager
from flask_marshmallow import Marshmallow

from backend.app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
login_manager = LoginManager(app)



from . import routes, models