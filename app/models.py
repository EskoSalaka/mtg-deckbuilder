from flask import jsonify

from app import db, ma


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300), index=True, unique=False)


class CardSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "name")

    # Smart hyperlinking
    _links = ma.Hyperlinks(
        {"self": ma.URLFor("user_detail", id="<id>"), "collection": ma.URLFor("users")}
    )




