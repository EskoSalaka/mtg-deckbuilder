from random import randint, sample

from flask import jsonify

from mtg_api.models import Set


def make_booster(set_code, commons_num, uncommons_num, rares_num, basic_land):
    try:
        mset = Set.query.filter_by(code=set_code).first_or_404()
        cards = mset.cards
        commons = [
            card
            for card in cards
            if card.rarity == "common" and "Basic Land" not in card.type_line
        ]

        uncommons = [card for card in cards if card.rarity == "uncommon"]
        rares = [card for card in cards if card.rarity == "rare"]
        mythics = [card for card in cards if card.rarity == "mythic"]
        basic_lands = [card for card in cards if "Basic Land" in card.type_line]
        mythics_num = (sum([1 for _ in range(rares_num) if randint(0, 8) == 0]) if len(mythics) else 0)
        rares_num -= mythics_num

        if (
                len(commons) < commons_num
                or len(uncommons) < uncommons_num
                or len(rares) < rares_num
                or len(mythics) < mythics_num
        ):
            return (
                jsonify(
                    error=405,
                    message="Could not generate a sample with the given arguments or "
                            "the set is not suitable for generating booster-like samples",
                ),
                405,
            )

        booster_pack = []

        if basic_land == "true" and len(basic_land) > 0:
            commons_num -= 1
            booster_pack.extend(sample(basic_lands, 1))

        booster_pack.extend(sample(commons, commons_num))
        booster_pack.extend(sample(uncommons, uncommons_num))
        booster_pack.extend(sample(rares, rares_num))
        booster_pack.extend(sample(mythics, mythics_num))

        return booster_pack

    except Exception as e:
        return (
            jsonify(
                error=500, status="Fail", message="Internal server error." + str(e)
            ),
            500,
        )
