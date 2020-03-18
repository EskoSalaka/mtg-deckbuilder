import datetime
import itertools
import jwt
from marshmallow import fields, pre_dump, post_dump
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash

from . import db, ma, app


SCRYFALL_CARD_FIELDS = (
    "id",
    "name",
    "layout",
    "scryfall_uri",
    "cmc",
    "type_line",
    "oracle_text",
    "mana_cost",
    "power",
    "toughness",
    "loyalty",
    "life_modifier",
    "hand_modifier",
    "colors",
    "color_indicator",
    "color_identity",
    "all_parts",
    "card_faces",
    "legalities",
    "reserved",
    "foil",
    "nonfoil",
    "oversized",
    "edhrec_rank",
    "prices",
    "set",
    "set_name",
    "collector_number",
    "scryfall_set_uri",
    "image_uris",
    "purchase_uris",
    "highres_image",
    "printed_name",
    "printed_type_line",
    "printed_text",
    "reprint",
    "digital",
    "rarity",
    "flavor_text",
    "artist",
    "illustration_id",
    "frame",
    "full_art",
    "watermark",
    "border_color",
    "timeshifted",
    "colorshifted",
    "futureshifted",
)

SCRYFALL_SET_FIELDS = (
    "id",
    "code",
    "mtgo_code",
    "name",
    "scryfall_uri",
    "block",
    "block_code",
    "released_at",
    "set_type",
    "card_count",
    "digital",
    "foil_only",
)


#################################################################################################
# Assocs
#################################################################################################


class DeckCardAssociation(db.Model):
    __tablename__ = "deck_card_association"
    deck_api_id = db.Column(db.Integer, db.ForeignKey("deck.api_id"), primary_key=True)
    card_api_id = db.Column(db.Integer, db.ForeignKey("card.api_id"), primary_key=True)

    count = db.Column(db.Integer, default=1)

    card = relationship("Card", back_populates="decks")
    deck = relationship("Deck", back_populates="cards")


card_color_association_table = db.Table(
    "card_color_association",
    db.Model.metadata,
    db.Column("card_api_id", db.Integer, db.ForeignKey("card.api_id")),
    db.Column("color_api_id", db.Integer, db.ForeignKey("color.api_id")),
)


class SideboardCardAssociation(db.Model):
    __tablename__ = "sideboard_card_association"
    deck_api_id = db.Column(db.Integer, db.ForeignKey("deck.api_id"), primary_key=True)
    card_api_id = db.Column(db.Integer, db.ForeignKey("card.api_id"), primary_key=True)

    count = db.Column(db.Integer,)

    card = relationship("Card", back_populates="sideboards")
    sideboard = relationship("Deck", back_populates="sideboard")


#################################################################################################
# Models
#################################################################################################


class Set(db.Model):
    __tablename__ = "set"

    api_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cards = db.relationship("Card", backref="set_ref", lazy=True)

    id = db.Column(db.String(37), unique=True, nullable=False)
    code = db.Column(db.String(10), unique=True, nullable=False)
    block_code = db.Column(db.String(10), unique=False)
    mtgo_code = db.Column(db.String(10), unique=True)
    block = db.Column(db.String(50), unique=False)
    name = db.Column(db.String(100), unique=True)
    # uri = db.Column(db.String(100), unique=True) useless
    parent_set_code = db.Column(db.String(5), unique=False)
    scryfall_uri = db.Column(db.String(50), unique=True)
    # search_uri = db.Column(db.String(300), unique=True) useless
    released_at = db.Column(db.String(20), unique=False)
    set_type = db.Column(db.String(30), unique=False)
    card_count = db.Column(db.Integer, unique=False)
    digital = db.Column(db.Boolean(), unique=False)
    foil_only = db.Column(db.Boolean(), unique=False)
    icon_svg_uri = db.Column(db.String(100), unique=False)


class Card(db.Model):
    __tablename__ = "card"

    api_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    set_id = db.Column(db.Integer, db.ForeignKey("set.api_id"))
    decks = relationship("DeckCardAssociation", back_populates="card")
    sideboards = relationship("SideboardCardAssociation", back_populates="card")

    id = db.Column(db.String(37), unique=True)
    name = db.Column(db.String(200), unique=False)
    layout = db.Column(db.String(50), unique=False)
    scryfall_uri = db.Column(db.String(200), unique=False)
    cmc = db.Column(db.Float(), unique=False)
    type_line = db.Column(db.String(100), unique=False)
    oracle_text = db.Column(db.String(1000), unique=False, nullable=True)
    mana_cost = db.Column(db.String(50), unique=False, nullable=True)
    # multiverse_ids = db.Column(db.PickleType(), unique=False, nullable=True) useless

    power = db.Column(db.String(4), unique=False, nullable=True)
    toughness = db.Column(db.String(4), unique=False, nullable=True)
    loyalty = db.Column(db.String(6), unique=False, nullable=True)
    life_modifier = db.Column(db.String(4), unique=False, nullable=True)
    hand_modifier = db.Column(db.String(3), unique=False, nullable=True)

    colors = relationship("Color", secondary=card_color_association_table)
    color_indicator = db.Column(db.PickleType(), unique=False, nullable=True)
    color_identity = db.Column(db.PickleType(), unique=False)
    all_parts = db.Column(db.PickleType(), unique=False, nullable=True)
    card_faces = db.Column(db.PickleType(), unique=False, nullable=True)
    legalities = db.Column(db.PickleType(), unique=False)

    reserved = db.Column(db.Boolean(), unique=False)
    foil = db.Column(db.Boolean(), unique=False)
    nonfoil = db.Column(db.Boolean(), unique=False)
    oversized = db.Column(db.Boolean(), unique=False)

    edhrec_rank = db.Column(db.Float(), unique=False, nullable=True)

    set = db.Column(db.String(8), unique=False)
    set_name = db.Column(db.String(60), unique=False)
    collector_number = db.Column(db.String(11), unique=False)

    highres_image = db.Column(db.Boolean(), unique=False)
    purchase_uris = db.Column(db.PickleType(), unique=False, nullable=True)

    printed_name = db.Column(db.String(50), unique=False, nullable=True)
    printed_type_line = db.Column(db.String(50), unique=False, nullable=True)
    printed_text = db.Column(db.String(500), unique=False, nullable=True)

    reprint = db.Column(db.Boolean(), unique=False)
    digital = db.Column(db.Boolean(), unique=False)

    rarity = db.Column(db.String(10), unique=False)
    flavor_text = db.Column(db.String(500), unique=False, nullable=True)
    artist = db.Column(db.String(60), unique=False, nullable=True)
    illustration_id = db.Column(db.String(37), unique=False, nullable=True)
    frame = db.Column(db.String(10), unique=False)

    full_art = db.Column(db.Boolean(), unique=False)

    watermark = db.Column(db.String(30), unique=False, nullable=True)
    border_color = db.Column(db.String(12), unique=False)

    story_spotlight_number = db.Column(db.Float(), unique=False, nullable=True)
    # story_spotlight_uri = db.Column(db.String(300), unique=False, nullable=True) useless

    timeshifted = db.Column(db.Boolean(), unique=False)
    colorshifted = db.Column(db.Boolean(), unique=False)
    futureshifted = db.Column(db.Boolean(), unique=False)

    # lang = db.Column(db.String(300), unique=False) useless
    # set_search_uri = db.Column(db.String(300), unique=False) useless
    scryfall_set_uri = db.Column(db.String(60), unique=False)

    image_uris = db.Column(db.PickleType(), unique=False, nullable=True)

    # uri = db.Column(db.String(300), unique=False) useless
    # spotlight_uri = db.Column(db.String(300), unique=False )useless
    prices = db.Column(db.PickleType(), unique=False)

    def __repr__(self):
        return "<Card %r [%r]>" % (self.name, self.set)


class Deck(db.Model):
    __tablename__ = "deck"

    api_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(
        db.String(200), unique=False, nullable=False, default="Unnamed deck"
    )
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())

    cards = relationship(
        "DeckCardAssociation",
        back_populates="deck",
        cascade="save-update, merge, delete, delete-orphan",
    )
    sideboard = relationship(
        "SideboardCardAssociation",
        back_populates="sideboard",
        cascade="save-update, merge, delete, delete-orphan",
    )

    user = relationship("User", back_populates="decks")
    user_id = db.Column(db.Integer, db.ForeignKey("user.api_id"))

    def get_mainboard(self):
        cards = []
        for cardassoc in self.cards:
            cards += cardassoc.count * [cardassoc.card]

        return cards

    def get_sideboard(self):
        sideboard = []

        for sbassoc in self.sideboard:
            sideboard += sbassoc.count * [sbassoc.card]

        return sideboard

    def get_deck_colors(self):
        flatten = itertools.chain.from_iterable
        flat_colors = set(flatten([card.colors for card in self.get_mainboard()]))

        return [color.value for color in flat_colors]

    def get_mainboard_size(self):
        return sum([cardassoc.count for cardassoc in self.cards])

    def get_sideboard_size(self):
        return sum([cardassoc.count for cardassoc in self.sideboard])

    def __repr__(self):
        return "<Deck %r %r %r>" % (
            self.name,
            self.created_at,
            self.api_id,
        )


class Color(db.Model):
    __tablename__ = "color"

    api_id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(500), unique=True, nullable=False)

    def __repr__(self):
        return self.value

    def __str__(self):
        return self.value


class User(db.Model):
    __tablename__ = "user"

    api_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, index=True)
    password = db.Column(db.String(300))
    email = db.Column(db.String(50), unique=True, index=True)

    decks = relationship("Deck", back_populates="user")

    def set_password(self, pw):
        self.password = generate_password_hash(pw)

    def check_password(self, pw):
        return check_password_hash(self.password, pw)

    def encode_auth_token(self):
        try:
            payload = {
                "exp": datetime.datetime.utcnow()
                + datetime.timedelta(days=1, seconds=0),
                "iat": datetime.datetime.utcnow(),
                "user_id": self.api_id,
            }

            return jwt.encode(payload, app.config.get("SECRET_KEY"), algorithm="HS256")

        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, app.config.get("SECRET_KEY"))

            if BlacklistToken.check_blacklist(auth_token):
                return "Token blacklisted. Please log in again."
            else:
                return payload["user_id"]

        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."

        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."

    @staticmethod
    def from_token(auth_token):
        resp = User.decode_auth_token(auth_token)

        if not isinstance(resp, str):
            return User.query.filter_by(api_id=resp).first()
        else:
            return None


class BlacklistToken(db.Model):
    __tablename__ = "blacklist_token"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    token = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_on = db.Column(db.DateTime, nullable=False)

    @staticmethod
    def check_blacklist(auth_token):
        if BlacklistToken.query.filter_by(token=str(auth_token)).first():
            return True
        else:
            return False

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return "<id: token: {}".format(self.token)


#################################################################################################
# Schemas
#################################################################################################
class ColorSchema(ma.Schema):
    value = fields.String()

    def load(self, items, *args):
        items = [{"key": item} if isinstance(item, str) else item for item in items]
        return super().load(items, *args)


class SetSchema(ma.Schema):
    class Meta:
        fields = SCRYFALL_SET_FIELDS


class CardSchema(ma.Schema):
    colors = fields.List(fields.String())

    class Meta:
        fields = SCRYFALL_CARD_FIELDS


class SimpleListInput(ma.Schema):
    items = fields.Nested(ColorSchema, many=True)


class DeckAssociationSchema(ma.Schema):
    count = fields.Integer()
    card = fields.Nested(CardSchema)

    @post_dump
    def postt(self, item,  **kwargs):
        nested_card = item['card']
        nested_card['count'] = item['count']
        return nested_card



