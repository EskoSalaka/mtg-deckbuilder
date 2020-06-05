from marshmallow import fields, pre_dump, post_dump
from . import ma
from .models import SCRYFALL_SET_FIELDS, SCRYFALL_CARD_FIELDS, SCRYFALL_CARD_PLAY_FIELDS


class SetSchema(ma.Schema):
    class Meta:
        fields = SCRYFALL_SET_FIELDS


class CardSchema(ma.Schema):
    class Meta:
        fields = SCRYFALL_CARD_FIELDS


class CardPlaySchema(ma.Schema):
    class Meta:
        fields = SCRYFALL_CARD_PLAY_FIELDS


class DeckAssociationSchema(ma.Schema):
    count = fields.Integer()
    card = fields.Nested(CardSchema)

    @post_dump
    def postt(self, item,  **kwargs):
        nested_card = item['card']
        nested_card['count'] = item['count']
        return nested_card


class DeckAssociationPlaySchema(ma.Schema):
    count = fields.Integer()
    card = fields.Nested(CardPlaySchema)

    @post_dump
    def postt(self, item,  **kwargs):
        nested_card = item['card']
        nested_card['count'] = item['count']
        return nested_card
