from flask import Blueprint, url_for
from flask.json import jsonify
from flask import request
from flask_cors import cross_origin

from sqlalchemy import or_
from random import sample, randint

from backend.app import db
from .forms import SignupForm, LoginForm
from .models import CardSchema, Card, SetSchema, Set, Color, ColorSchema, User, BlacklistToken

routes_blueprint = Blueprint('routes', __name__,)


@routes_blueprint.route('/api/cards/')
def cards():
    page = request.args.get('page', 1, type=int)
    paginator = Card.query.paginate(12, 300, False)

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


@routes_blueprint.route('/api/cards/<id>/')
def card(id):
    card = Card.query.filter_by(id=id).first_or_404()
    cards_schema = CardSchema()
    return jsonify(cards_schema.dump(card).data)


@routes_blueprint.route('/api/sets/<code>/')
def set(code):
    mset = Set.query.filter_by(code=code).first_or_404()
    sets_schema = SetSchema()
    return jsonify(sets_schema.dump(mset).data)


@routes_blueprint.route('/api/cards/<set_code>/<collector_number>/')
def card_by_set(set_code, collector_number):
    card = Card.query.filter_by(set=set_code, collector_number=collector_number).first_or_404()
    cards_schema = CardSchema()
    res = cards_schema.dump(card)
    return jsonify(data=res.data)


@routes_blueprint.route('/api/sets/<code>/cards/')
def set_cards(code):
    mset = Set.query.filter_by(code=code).first_or_404()
    cards = mset.cards
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(cards)
    return jsonify(total_items=len(cards),
                   data=res.data)


@routes_blueprint.route('/api/sets/<code>/booster/')
def set_booster(code):
    try:
        mset = Set.query.filter_by(code=code).first_or_404()
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
                           message="Could not generate a sample with the given arguments or "
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

    except Exception as e:
        print(e)
        return jsonify(error=500, status="Fail", message="Internal server error." + str(e)), 500


@routes_blueprint.route('/api/signup', methods=['POST'])
def signup():
    form = SignupForm(request.form)

    if form.validate():
        try:
            new_user = User(username=form.username.data, email=form.email.data)
            new_user.set_password(form.password.data)
            db.session.add(new_user)
            db.session.commit()

            return jsonify(status="Success", message="Registration successful"), 200

        except Exception as e:
            print(e)
            return jsonify(error=500, status="Fail", message="Internal server error"), 500

    else:
        return jsonify(error=400, message=list(form.errors.items())[0][1][0]), 400


@routes_blueprint.route('/api/login', methods=['POST'])
def login():
    form = LoginForm(request.form)

    if form.validate():
        try:
            user = User.query.filter_by(email=form.email.data).first()
            auth_token = user.encode_auth_token()

            return jsonify(status="Success", message="Login successful", auth_token=auth_token.decode()), 200

        except Exception as e:
            print(e)
            return jsonify(error=500, status="Fail", message="Internal server error"), 500

    else:
        return jsonify(error=400, status="Fail", message=list(form.errors.items())[0][1][0]), 400


@routes_blueprint.route('/api/logout', methods=['POST'])
def logout():
    auth_header = request.headers.get('Authorization')

    if auth_header:
        auth_token = auth_header.split(" ")[1]

        resp = User.decode_auth_token(auth_token)

        if not isinstance(resp, str):
            blacklist_token = BlacklistToken(token=auth_token)

            try:
                db.session.add(blacklist_token)
                db.session.commit()

                return jsonify(status="Success", message="Logout successful"), 200
            except Exception as e:
                print(e)
                return jsonify(status="Success", message=str(e)), 200
        else:
            return jsonify(error=401, status="Fail", message="Invalid or expired auth token"), 401

    else:
        return jsonify(error=403, status="Fail", message="Missing token"), 403


@routes_blueprint.route('/api/verify_auth', methods=['GET'])
def verify_auth():
    auth_header = request.headers.get('Authorization')

    if auth_header:
        auth_token = auth_header.split(" ")[1]

        resp = User.decode_auth_token(auth_token)

        if not isinstance(resp, str):
            return jsonify(status="Success", message="Authenticated"), 200
        else:
            return jsonify(error=401, status="Fail", message="Invalid or expired token"), 401

    else:
        return jsonify(error=401, status="Fail", message="Missing token"), 403


