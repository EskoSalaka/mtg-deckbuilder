from pprint import pprint

from backend.app.models import Card, Set, Color, SCRYFALL_SET_FIELDS, SCRYFALL_CARD_FIELDS, Deck, User
from backend.app import db

from mtgtools.MtgDB import MtgDB

mtg_db = MtgDB('mydata.fs')

# mtg_db.full_update_from_scryfall(verbose=True)
sets = mtg_db.root.scryfall_sets
cards = mtg_db.root.scryfall_cards

# print(cards)
# print(sets)
#
# set1 = Set.query.all()[10]
# print(set1.name)
# print(set1.cards)
k = 0

d = cards.from_str("""
3 Raging Ravine
1 Wooded Foothills
4 Verdant Catacombs
1 Stomping Ground
2 Overgrown Tomb
1 Blood Crypt
4 Blackcleave Cliffs
2 Swamp
1 Forest
4 Bloodstained Mire

2 Huntmaster of the Fells
4 Dark Confidant
2 Scavenging Ooze
4 Tarmogoyf
1 Fulminator Mage

1 Chandra, Torch of Defiance
4 Liliana of the Veil

1 Kolaghan's Command
4 Lightning Bolt
3 Terminate
3 Thoughtseize
2 Abrupt Decay
3 Inquisition of Kozilek

1 Fatal Push

1 Blooming Marsh
1 Kalitas, Traitor of Ghet

//Sideboard
SB: 3 Fulminator Mage
SB: 2 Collective Brutality
SB: 1 Anger of the Gods
SB: 1 Kolaghan's Command
SB: 2 Ancient Grudge
SB: 1 Maelstrom Pulse
SB: 1 Liliana, the Last Hope
SB: 2 Surgical Extraction
SB: 1 Rakdos Charm
SB: 1 Damnation""")


def get_or_create(session, model, **kwargs):
    instance = session.query(model).filter_by(**kwargs).first()

    if instance:
        return instance
    else:
        instance = model(**kwargs)
        session.add(instance)
        return instance

#
# for mset in sets:
#     sargs = dict([(attr, getattr(mset, attr)) for attr in SCRYFALL_SET_FIELDS])
#     # print(sargs)
#     sd = Set(**sargs)
#     db.session.add(sd)
#
#     for card in mset.cards:
#         cargs = dict([(attr, getattr(card, attr)) for attr in SCRYFALL_CARD_FIELDS])
#
#         # pprint(cargs)
#         colors_arg = cargs['colors']
#         del cargs['colors']
#         # print(card, colors_arg)
#
#         cd = Card(**dict(cargs, set_ref=sd))
#
#         if colors_arg:
#             for color in colors_arg:
#                 cd.colors.append(get_or_create(db.session, Color, value=color))
#
#         db.session.add(cd)
#     print(k)
#     k += 1
#
# db.session.commit()


