from flask import Blueprint, url_for
from flask import request
from flask.json import jsonify
from sqlalchemy import asc

from .. import db
from ..decorators import authorize
from ..models import (
    Card)
from ..models import (
    Deck,
    DeckCardAssociation,
    SideboardCardAssociation,
)
from ..schemas import (DeckAssociationSchema, DeckAssociationPlaySchema)
from ..util import make_booster

decks_blueprint = Blueprint("decks", __name__)


@decks_blueprint.route("/api/decks/<api_id>", methods=["GET"])
def deck(api_id):
    deck = Deck.query.filter_by(api_id=api_id).first_or_404()
    deck_association_schema = DeckAssociationPlaySchema(many=True)

    return jsonify(
        api_id=deck.api_id,
        name=deck.name,
        user=deck.user.username,
        created_at=deck.created_at.strftime("%Y-%m-%d %H:%M"),
        mainboard=deck_association_schema.dump(deck.cards),
        sideboard=deck_association_schema.dump(deck.sideboard),
    )


@decks_blueprint.route("/api/user/decks", methods=["GET"])
@authorize
def user_decks(user):
    try:
        page = request.args.get("page", 1, type=int)
        paginator = Deck.query.filter(Deck.user == user). \
            order_by(asc('created_at')).paginate(page, 10, False)

        next_page = (
            url_for("decks.user_decks", page=paginator.next().page, _external=True)
            if paginator.has_next
            else ""
        )

        return jsonify(
            total_pages=paginator.pages,
            total_items=paginator.total,
            has_next=paginator.has_next,
            next_page=next_page,
            page=paginator.page,
            decks=[{
                "api_id": deck.api_id,
                "name": deck.name,
                "user": deck.user.username,
                "created_at": deck.created_at.strftime("%Y-%m-%d %H:%M"),
                "colors": deck.get_deck_colors(),
                "mainboard_card_count": deck.get_mainboard_size(),
                "sideboard_card_count": deck.get_sideboard_size()}
                for deck in paginator.items],
        ), 200

    except Exception as e:
        print("error", str(e))
        return jsonify(error=500, status="Fail", message="Internal server error"), 500


@decks_blueprint.route("/api/user/decks/<api_id>", methods=["GET"])
@authorize
def user_deck(user, api_id):
    deck = Deck.query.filter_by(api_id=api_id).first_or_404()

    if deck.user.api_id != user.api_id:
        return jsonify(error=403, status="Fail", message="Forbidden"), 403

    deck_association_schema = DeckAssociationSchema(many=True)

    return jsonify(
        api_id=deck.api_id,
        name=deck.name,
        user=deck.user.username,
        created_at=deck.created_at.strftime("%Y-%m-%d %H:%M"),
        mainboard=deck_association_schema.dump(deck.cards),
        sideboard=deck_association_schema.dump(deck.sideboard),
    )


@decks_blueprint.route("/api/decks/<api_id>", methods=["PUT"])
@authorize
def edit_deck(user, api_id):
    deck = Deck.query.filter_by(api_id=api_id).first_or_404()

    if deck.user.api_id != user.api_id:
        return jsonify(error=403, status="Fail", message="Forbidden"), 403

    try:
        json_data = request.json
        mainboard = json_data["mainboard"]
        sideboard = json_data["sideboard"]
        deck.name = json_data["name"]

        deck.cards = []
        deck.sideboard = []

        for card in mainboard:
            deck_assoc = DeckCardAssociation(count=card["count"])
            deck_assoc.card = Card.query.filter_by(id=card["id"]).first()
            deck_assoc.deck = deck
            deck.cards.append(deck_assoc)

        for card in sideboard:
            sb_assoc = SideboardCardAssociation(count=card["count"])
            sb_assoc.card = Card.query.filter_by(id=card["id"]).first()
            sb_assoc.sideboard = deck
            deck.sideboard.append(sb_assoc)

        db.session.commit()
        return jsonify(status="Success", message="Deck successfully edited"), 200

    except KeyError as e:
        print(e)
        print("error", str(e))
        return (
            jsonify(
                error=422,
                status="Fail",
                message=f"The data is missing parameter: {str(e)}",
            ),
            422,
        )
    except Exception as e:
        print("error", str(e))
        return jsonify(error=500, status="Fail", message="Internal server error"), 500


@decks_blueprint.route("/api/decks/<api_id>", methods=["DELETE"])
@authorize
def delete_deck(user, api_id):
    deck = Deck.query.filter_by(api_id=api_id).first_or_404()

    if deck.user.api_id != user.api_id:
        return jsonify(error=403, status="Fail", message="Forbidden"), 403

    try:
        db.session.delete(deck)
        db.session.commit()

        return jsonify(status="Success", message="Deck successfully deleted"), 200

    except KeyError as e:
        print("error", str(e))
        return (
            jsonify(
                error=422,
                status="Fail",
                message=f"The data is missing parameter: {str(e)}",
            ),
            422,
        )
    except Exception as e:
        print("error", str(e))
        return jsonify(error=500, status="Fail", message="Internal server error"), 500


@decks_blueprint.route("/api/decks/create", methods=["POST"])
@authorize
def create_deck(user):
    try:
        boosters = request.json

        if not boosters:
            return jsonify(status="Fail", message="No boosters specified"), 400
        cards = []

        for booster in boosters:
            booster_cards = make_booster(booster["set"],
                                         booster["commons"],
                                         booster["uncommons"],
                                         booster["rares"],
                                         booster["basicLands"])
            cards.extend(booster_cards)

        new_deck = Deck()

        for card in cards:
            sb_assoc = db.session.query(SideboardCardAssociation).filter_by(deck_api_id=new_deck.api_id,
                                                                            card_api_id=card.api_id).first()

            if sb_assoc:
                sb_assoc.count = sb_assoc.count + 1
            else:
                sb_assoc = SideboardCardAssociation(count=1)
                db.session.add(sb_assoc)
                sb_assoc.card = card
                sb_assoc.sideboard = new_deck

        user.decks.append(new_deck)

        db.session.add(new_deck)
        db.session.commit()

        return jsonify(status="Success", message="New deck successfully created"), 200

    except KeyError as e:
        print("error", str(e))
        return (
            jsonify(
                error=422,
                status="Fail",
                message=f"The data is missing parameter: {str(e)}",
            ),
            422,
        )
    except Exception as e:
        print("error", str(e))
        return jsonify(error=500, status="Fail", message="Internal server error"), 500
