from flask import Blueprint
from flask.json import jsonify
from flask import request

from backend.app.models import CardSchema, Card, SetSchema, Set

routes_blueprint = Blueprint('routes', __name__,)


@routes_blueprint.route('/api/cards/')
def all_cards():
    cards = Card.query.all()[0:50]
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(cards)
    return jsonify(res.data)


@routes_blueprint.route('/api/sets/')
def all_sets():
    print(request.args)
    cards = Set.query.all()
    sets_schema = SetSchema(many=True)
    res = sets_schema.dump(cards)
    return jsonify(res.data)


@routes_blueprint.route('/api/cards/<id>')
def one_card(id):
    card = Card.query.filter_by(id=id).first_or_404()
    cards_schema = CardSchema()
    return jsonify(cards_schema.dump(card).data)


@routes_blueprint.route('/api/sets/<id>')
def one_set(id):
    mset = Set.query.filter_by(id=id).first_or_404()
    sets_schema = SetSchema()
    return jsonify(sets_schema.dump(mset).data)