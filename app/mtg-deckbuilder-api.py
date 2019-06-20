from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from app import app
from app.models import Card, CardSchema


@app.route('/')
def hello():
    cards = Card.query.all()
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(cards)
    return jsonify(res.data)


if __name__ == '__main__':
    app.run()