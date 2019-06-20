from app import db, ma

SCRYFALL_FIELDS = ('id', 'name', 'layout', 'uri', 'scryfall_uri', 'cmc', 'type_line',
                   'oracle_text', 'mana_cost', 'power', 'toughness', 'loyalty', 'life_modifier',
                   'hand_modifier', 'colors', 'color_indicator', 'color_identity', 'all_parts',
                   'card_faces', 'legalities', 'reserved', 'foil', 'nonfoil', 'oversized',
                   'edhrec_rank', 'multiverse_ids', 'prices', 'set', 'set_name', 'collector_number',
                   'set_search_uri', 'scryfall_set_uri', 'image_uris', 'purchase_uris', 'highres_image',
                   'printed_name', 'printed_type_line', 'printed_text', 'reprint', 'digital', 'rarity',
                   'flavor_text', 'artist', 'illustration_id', 'frame', 'full_art', 'watermark',
                   'border_color', 'story_spotlight_number', 'story_spotlight_uri', 'timeshifted',
                   'colorshifted', 'futureshifted', 'lang')


class Card(db.Model):
    api_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    id = db.Column(db.String(300), unique=True)
    name = db.Column(db.String(300), unique=False)
    layout = db.Column(db.String(300), unique=False)
    scryfall_uri = db.Column(db.String(300), unique=False)
    cmc = db.Column(db.Float(), unique=False)
    type_line = db.Column(db.String(300), unique=False)
    oracle_text = db.Column(db.String(300), unique=False, nullable=True)
    mana_cost = db.Column(db.String(300), unique=False, nullable=True)
    multiverse_ids = db.Column(db.PickleType(), unique=False, nullable=True)

    power = db.Column(db.String(300), unique=False, nullable=True)
    toughness = db.Column(db.String(300), unique=False, nullable=True)
    loyalty = db.Column(db.String(300), unique=False, nullable=True)
    life_modifier = db.Column(db.String(300), unique=False, nullable=True)
    hand_modifier = db.Column(db.String(300), unique=False, nullable=True)

    colors = db.Column(db.PickleType(), unique=False, nullable=True)
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

    set = db.Column(db.String(300), unique=False)
    set_name = db.Column(db.String(300), unique=False)
    collector_number = db.Column(db.String(300), unique=False)

    highres_image = db.Column(db.Boolean(), unique=False)
    purchase_uris = db.Column(db.PickleType(), unique=False, nullable=True)

    printed_name = db.Column(db.String(300), unique=False, nullable=True)
    printed_type_line = db.Column(db.String(300), unique=False, nullable=True)
    printed_text = db.Column(db.String(300), unique=False, nullable=True)

    reprint = db.Column(db.Boolean(), unique=False)
    digital = db.Column(db.Boolean(), unique=False)

    rarity = db.Column(db.String(300), unique=False)
    flavor_text = db.Column(db.String(300), unique=False, nullable=True)
    artist = db.Column(db.String(300), unique=False, nullable=True)
    illustration_id = db.Column(db.String(300), unique=False, nullable=True)
    frame = db.Column(db.String(300), unique=False)

    full_art = db.Column(db.Boolean(), unique=False)

    watermark = db.Column(db.String(300), unique=False, nullable=True)
    border_color = db.Column(db.String(300), unique=False)

    story_spotlight_number = db.Column(db.Float(), unique=False, nullable=True)
    story_spotlight_uri = db.Column(db.String(300), unique=False, nullable=True)

    timeshifted = db.Column(db.Boolean(), unique=False)
    colorshifted = db.Column(db.Boolean(), unique=False)
    futureshifted = db.Column(db.Boolean(), unique=False)

    lang = db.Column(db.String(300), unique=False)
    set_search_uri = db.Column(db.String(300), unique=False)
    scryfall_set_uri = db.Column(db.String(300), unique=False)

    image_uris = db.Column(db.PickleType(), unique=False, nullable=True)

    uri = db.Column(db.String(300), unique=False)
    spotlight_uri = db.Column(db.String(300), unique=False)
    prices = db.Column(db.PickleType(), unique=False)


class CardSchema(ma.Schema):
    class Meta:
        fields = SCRYFALL_FIELDS






