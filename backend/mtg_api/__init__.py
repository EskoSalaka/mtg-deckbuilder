from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS


app = Flask(
    __name__, static_folder="mtg_api/build/static", template_folder="mtg_api/build"
)
db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)


from . import config, routes

app.config.from_object(config.Config)
app.register_blueprint(routes.routes_blueprint)
cors = CORS(app)
