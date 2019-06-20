from pprint import pprint

from app.models import Card
from app import db

from mtgtools.MtgDB import MtgDB

mtg_db = MtgDB('mydata.fs')

# mtg_db.full_update_from_scryfall(verbose=True)
sets = mtg_db.root.scryfall_sets
cards = mtg_db.root.scryfall_cards
print(cards)
s = cards.where(id='8532d72a-b2d2-49e1-85ea-35f4c91c6c8d')[0].__dict__
pprint(s)

print(s.keys())
#
# print(cards)
# k = 0
# for card in cards:
#     args = card.__dict__
#     del args['power_num']
#     del args['toughness_num']
#     del args['loyalty_num']
#
#     cd = Card(**args)
#     db.session.add(cd)
#     print(k)
#     k += 1
#
# db.session.commit()


