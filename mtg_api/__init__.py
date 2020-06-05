from pathlib import Path

from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder=Path.cwd() / "build")

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

from . import config
from .routes import main, sets, decks, cards, auth

app.config.from_object(config.Config)

app.register_blueprint(main.main_blueprint)
app.register_blueprint(sets.sets_blueprint)
app.register_blueprint(decks.decks_blueprint)
app.register_blueprint(cards.cards_blueprint)
app.register_blueprint(auth.auth_blueprint)

cors = CORS(app)
