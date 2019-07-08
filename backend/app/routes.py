from flask import Blueprint, url_for
from flask.json import jsonify
from flask import request

from backend.app.models import CardSchema, Card, SetSchema, Set

routes_blueprint = Blueprint('routes', __name__,)


@routes_blueprint.route('/api/cards/')
def all_cards():
    page = request.args.get('page', 1, type=int)
    paginator = Card.query.paginate(page, 300, False)

    next_page = url_for('routes.all_cards', page=paginator.next().page, _external=True) if paginator.has_next else ''

    cards = paginator.items
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(cards)
    return jsonify(total_pages=paginator.pages,
                   total_cards=paginator.total,
                   has_next=paginator.has_next,
                   next_page=next_page,
                   page=paginator.page,
                   data=res.data)


@routes_blueprint.route('/api/sets/')
def all_sets():
    sets = Set.query.all()
    sets_schema = SetSchema(many=True)
    res = sets_schema.dump(sets)
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