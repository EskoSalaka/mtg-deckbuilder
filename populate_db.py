from mtg_api.models import Card, Set, SCRYFALL_SET_FIELDS, SCRYFALL_CARD_FIELDS
from mtg_api import db

from mtgtools.MtgDB import MtgDB

mtg_db = MtgDB('mydata.fs')

# mtg_db.full_update_from_scryfall(verbose=True)
sets = mtg_db.root.scryfall_sets
cards = mtg_db.root.scryfall_cards
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
    print(mset)
    if not db.session.query(Set).filter_by(id=mset.id).first():
        sargs = dict([(attr, getattr(mset, attr)) for attr in SCRYFALL_SET_FIELDS])
        sd = Set(**sargs)
        db.session.add(sd)

        set_cards = []
        for card in mset.cards:
            cargs = dict([(attr, getattr(card, attr)) for attr in SCRYFALL_CARD_FIELDS])

            # pprint(cargs)
            cd = Card(**dict(cargs, set_ref=sd))

            sd.cards.append(cd)
            set_cards.append(cd)

        db.session.add_all(set_cards)

        print(k, mset.code)
        k += 1
    else:
        print(mset)
db.session.commit()



