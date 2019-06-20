from flask import Blueprint
from flask.json import jsonify

from app.models import CardSchema, Card

routes_blueprint = Blueprint('routes', __name__,)


@routes_blueprint.route('/api/cards/')
def all_cards():
    cards = Card.query.all()[0:500]
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(cards)
    return jsonify(res.data)


@routes_blueprint.route('/api/cards/<id>')
def one_card(id):
    card = Card.query.filter_by(id=id).first_or_404()
    cards_schema = CardSchema()
    return jsonify(cards_schema.dump(card).data)