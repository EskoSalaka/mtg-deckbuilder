from pprint import pprint

from backend.app.models import Set
from backend.app.models import Card, Set, Color, SCRYFALL_SET_FIELDS, SCRYFALL_CARD_FIELDS
from backend.app import db

from mtgtools.MtgDB import MtgDB

mtg_db = MtgDB('mydata.fs')

# mtg_db.full_update_from_scryfall(verbose=True)
sets = mtg_db.root.scryfall_sets
cards = mtg_db.root.scryfall_cards

print(cards)
print(sets)
#
# set1 = Set.query.all()[10]
# print(set1.name)
# print(set1.cards)
k = 0


def get_or_create(session, model, **kwargs):
    instance = session.query(model).filter_by(**kwargs).first()

    if instance:
        return instance
    else:
        instance = model(**kwargs)
        session.add(instance)
        return instance


for mset in sets:
    sargs = dict([(attr, getattr(mset, attr)) for attr in SCRYFALL_SET_FIELDS])
    # print(sargs)
    sd = Set(**sargs)
    db.session.add(sd)

    for card in mset.cards:
        cargs = dict([(attr, getattr(card, attr)) for attr in SCRYFALL_CARD_FIELDS])

        # pprint(cargs)
        colors_arg = cargs['colors']
        del cargs['colors']
        # print(card, colors_arg)

        cd = Card(**dict(cargs, set_ref=sd))

        if colors_arg:
            for color in colors_arg:
                cd.colors.append(get_or_create(db.session, Color, value=color))

        db.session.add(cd)
    print(k)
    k += 1

db.session.commit()


