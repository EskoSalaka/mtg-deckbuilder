from flask import Blueprint
from flask import request
from flask.json import jsonify

from ..models import Set
from ..schemas import (CardSchema, SetSchema, CardPlaySchema)
from ..util import make_booster

sets_blueprint = Blueprint("sets", __name__)


@sets_blueprint.route("/api/sets/")
def sets():
    all_sets = Set.query.all()
    sets_schema = SetSchema(many=True)
    res = sets_schema.dump(all_sets)
    return jsonify(total_items=len(res), sets=res)


@sets_blueprint.route("/api/sets/<code>/")
def set(code):
    mset = Set.query.filter_by(code=code).first_or_404()
    sets_schema = SetSchema()
    return jsonify(sets_schema.dump(mset))


@sets_blueprint.route("/api/sets/<code>/cards/")
def set_cards(code):
    mset = Set.query.filter_by(code=code).first_or_404()
    cards = mset.cards
    cards_schema = CardPlaySchema(many=True)
    res = cards_schema.dump(cards)
    return jsonify(total_items=len(cards), cards=res)


@sets_blueprint.route("/api/sets/<code>/booster")
def set_booster(code):
    try:
        args = request.args

        commons_num = int(args.get("commons", 11))
        uncommons_num = int(args.get("uncommons", 3))
        rares_num = int(args.get("rares", 1))
        basic_land = args.get("basic_land", "false")

        booster = make_booster(code, commons_num, uncommons_num, rares_num, basic_land)

        cards_schema = CardSchema(many=True)
        res = cards_schema.dump(booster)

        return jsonify(total_items=len(booster), data=res)

    except Exception as e:
        print(e)
        return (
            jsonify(
                error=500, status="Fail", message="Internal server error." + str(e)
            ),
            500,
        )
