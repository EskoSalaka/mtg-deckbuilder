from backend.app.models import Set

from mtgtools.MtgDB import MtgDB

mtg_db = MtgDB('mydata.fs')

# mtg_db.full_update_from_scryfall(verbose=True)
sets = mtg_db.root.scryfall_sets
cards = mtg_db.root.scryfall_cards

print(cards)
print(sets)

set1 = Set.query.all()[10]
print(set1.name)
print(set1.cards)

# for mset in sets:
#     sargs = dict(mset.__dict__)
#     del sargs['_cards']
#     del sargs['_sideboard']
#     del sargs['creation_date']
#     sd = Set(**sargs)
#     db.session.add(sd)
#
#     for card in mset.cards:
#         cargs = card.__dict__
#         del cargs['power_num']
#         del cargs['toughness_num']
#         del cargs['loyalty_num']
#
#         cd = Card(**dict(cargs, set_ref=sd))
#         db.session.add(cd)
#     print(k)
#     k += 1
#
# db.session.commit()


