from flask import Blueprint, url_for
from flask import request
from flask.json import jsonify
from sqlalchemy import or_

from ..models import (
    Card)
from ..schemas import (CardSchema)

cards_blueprint = Blueprint("cards", __name__)


@cards_blueprint.route("/api/cards/")
def cards():
    page = request.args.get("page", 1, type=int)
    paginator = Card.query.paginate(page, 300, False)

    next_page = (
        url_for("routes.cards", page=paginator.next().page, _external=True)
        if paginator.has_next
        else ""
    )

    all_cards = paginator.items
    cards_schema = CardSchema(many=True)
    res = cards_schema.dump(all_cards)
    return jsonify(
        total_pages=paginator.pages,
        total_items=paginator.total,
        has_next=paginator.has_next,
        next_page=next_page,
        page=paginator.page,
        data=res,
    )


@cards_blueprint.route("/api/cards/query")
def cards_query():
    print(request.args)
    print(request.query_string)
    filters = []
    q = Card.query
    for key, val in request.args.items():
        print(key, val)

        if key == "name":
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
        return jsonify(cards_schema.dump(cards))
    else:
        return (
            jsonify(
                error=404,
                args=dict(request.args),
                text="The given arguments did't match any cards in the database",
            ),
            404,
        )


@cards_blueprint.route("/api/cards/<id>/")
def card(id):
    card = Card.query.filter_by(id=id).first_or_404()
    cards_schema = CardSchema()
    return jsonify(cards_schema.dump(card))


@cards_blueprint.route("/api/cards/<set_code>/<collector_number>/")
def card_by_set(set_code, collector_number):
    card = Card.query.filter_by(
        set=set_code, collector_number=collector_number
    ).first_or_404()
    cards_schema = CardSchema()
    res = cards_schema.dump(card)

    return jsonify(res)
