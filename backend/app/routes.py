from flask import Blueprint, url_for
from flask.json import jsonify
from flask import request
from sqlalchemy import or_
from random import sample, randint

from backend.app.models import CardSchema, Card, SetSchema, Set, Color, ColorSchema

routes_blueprint = Blueprint('routes', __name__,)


@routes_blueprint.route('/api/cards/')
def cards():
    page = request.args.get('page', 1, type=int)
    paginator = Card.query.paginate(page, 300, False)

    next_page = url_for('routes.cards', page=paginator.next().page, _external=True) if paginator.has_next else ''

    all_cards = paginator.items
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(all_cards)
    return jsonify(total_pages=paginator.pages,
                   total_items=paginator.total,
                   has_next=paginator.has_next,
                   next_page=next_page,
                   page=paginator.page,
                   data=res.data)


@routes_blueprint.route('/api/cards/query')
def cards_query():
    print(request.args)
    print(request.query_string)
    filters = []
    q = Card.query
    for key, val in request.args.items():
        print(key, val)

        if key == 'name':
            filters.append(getattr(Card, key).like(val))
        else:
            pass
    print(q.filter(or_(*filters)).all()[0].colors)
    print(type(q.filter(or_(*filters)).all()[0].colors))

    # builder = Card.query
    # for key in request.args:
    #     if hasattr(Card, key):
    #         vals = request.args.getlist(key)  # one or many
    #         print(vals)
    #         builder = builder.filter(getattr(Card, key).in_(vals))
    # resources = builder.all()
    # print(resources)

    cards = Card.query.filter(or_(*filters)).all()

    if cards:
        cards_schema = CardSchema(many=True)
        return jsonify(cards_schema.dump(cards).data)
    else:
        return jsonify(error=404,
                       args=dict(request.args),
                       text="The given arguments did't match any cards in the database"), 404


@routes_blueprint.route('/api/sets/')
def sets():
    all_sets = Set.query.all()
    sets_schema = SetSchema(many=True)
    res = sets_schema.dump(all_sets)
    return jsonify(total_items=len(res.data),
                   data=res.data)


@routes_blueprint.route('/api/colors/')
def colors():
    all_colors = Color.query.all()
    color_chema = ColorSchema(many=True)
    res = color_chema.dump(all_colors)
    return jsonify(res.data)


@routes_blueprint.route('/api/cards/<id>')
def card(id):
    card = Card.query.filter_by(id=id).first_or_404()
    cards_schema = CardSchema()
    return jsonify(cards_schema.dump(card).data)


@routes_blueprint.route('/api/sets/<id>/')
def set(id):
    mset = Set.query.filter_by(id=id).first_or_404()
    sets_schema = SetSchema()
    return jsonify(sets_schema.dump(mset).data)


@routes_blueprint.route('/api/sets/<id>/booster/')
def booster(id):
    mset = Set.query.filter_by(id=id).first_or_404()
    cards = mset.cards
    args = request.args

    commons_num = int(args.get('commons', 11))
    uncommons_num = int(args.get('uncommons', 3))
    rares_num = int(args.get('rares', 1))
    basic_land = args.get('basic_land', 'false')

    commons = [card for card in cards if card.rarity == 'common' and 'Basic Land' not in card.type_line]
    uncommons = [card for card in cards if card.rarity == 'uncommon']
    rares = [card for card in cards if card.rarity == 'rare']
    mythics = [card for card in cards if card.rarity == 'mythic']
    basic_lands = [card for card in cards if 'Basic Land' in card.type_line]

    mythics_num = [1 for _ in range(rares_num) if randint(0, 8) == 0] if len(mythics) else 0
    mythics_num = sum(mythics_num)
    rares_num -= mythics_num

    if len(commons) < commons_num or \
       len(uncommons) < uncommons_num or \
       len(rares) < rares_num or \
       len(mythics) < mythics_num:
        return jsonify(error=405,
                       text="Could not generate a sample with the given arguments or "
                            "the set is not suitable for generating booster-like samples"), 405

    booster_pack = []

    if basic_land == 'true' and len(basic_land) > 0:
        commons_num -= 1
        booster_pack.extend(sample(basic_lands, 1))

    booster_pack.extend(sample(commons, commons_num))
    booster_pack.extend(sample(uncommons, uncommons_num))
    booster_pack.extend(sample(rares, rares_num))
    booster_pack.extend(sample(mythics, mythics_num))

    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(booster_pack)

    return jsonify(total_items=len(booster_pack),
                   data=res.data)

