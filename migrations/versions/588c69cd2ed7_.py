"""empty message

Revision ID: 588c69cd2ed7
Revises: 
Create Date: 2020-03-21 16:23:01.226377

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '588c69cd2ed7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('blacklist_token',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('token', sa.String(length=500), nullable=False),
    sa.Column('blacklisted_on', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.create_table('set',
    sa.Column('api_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('id', sa.String(length=37), nullable=False),
    sa.Column('code', sa.String(length=10), nullable=False),
    sa.Column('block_code', sa.String(length=10), nullable=True),
    sa.Column('mtgo_code', sa.String(length=10), nullable=True),
    sa.Column('block', sa.String(length=50), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('parent_set_code', sa.String(length=5), nullable=True),
    sa.Column('scryfall_uri', sa.String(length=50), nullable=True),
    sa.Column('released_at', sa.String(length=20), nullable=True),
    sa.Column('set_type', sa.String(length=30), nullable=True),
    sa.Column('card_count', sa.Integer(), nullable=True),
    sa.Column('digital', sa.Boolean(), nullable=True),
    sa.Column('foil_only', sa.Boolean(), nullable=True),
    sa.Column('icon_svg_uri', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('api_id'),
    sa.UniqueConstraint('code'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('mtgo_code'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('scryfall_uri')
    )
    op.create_table('user',
    sa.Column('api_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=30), nullable=True),
    sa.Column('password', sa.String(length=300), nullable=True),
    sa.Column('email', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('api_id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('card',
    sa.Column('api_id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('set_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.String(length=37), nullable=True),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('layout', sa.String(length=50), nullable=True),
    sa.Column('scryfall_uri', sa.String(length=200), nullable=True),
    sa.Column('cmc', sa.Float(), nullable=True),
    sa.Column('type_line', sa.String(length=100), nullable=True),
    sa.Column('oracle_text', sa.String(length=1000), nullable=True),
    sa.Column('mana_cost', sa.String(length=50), nullable=True),
    sa.Column('power', sa.String(length=4), nullable=True),
    sa.Column('toughness', sa.String(length=4), nullable=True),
    sa.Column('loyalty', sa.String(length=6), nullable=True),
    sa.Column('life_modifier', sa.String(length=4), nullable=True),
    sa.Column('hand_modifier', sa.String(length=3), nullable=True),
    sa.Column('colors', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('color_indicator', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('color_identity', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('all_parts', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('card_faces', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('legalities', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('reserved', sa.Boolean(), nullable=True),
    sa.Column('foil', sa.Boolean(), nullable=True),
    sa.Column('nonfoil', sa.Boolean(), nullable=True),
    sa.Column('oversized', sa.Boolean(), nullable=True),
    sa.Column('edhrec_rank', sa.Float(), nullable=True),
    sa.Column('set', sa.String(length=8), nullable=True),
    sa.Column('set_name', sa.String(length=60), nullable=True),
    sa.Column('collector_number', sa.String(length=11), nullable=True),
    sa.Column('highres_image', sa.Boolean(), nullable=True),
    sa.Column('purchase_uris', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('printed_name', sa.String(length=50), nullable=True),
    sa.Column('printed_type_line', sa.String(length=50), nullable=True),
    sa.Column('printed_text', sa.String(length=500), nullable=True),
    sa.Column('reprint', sa.Boolean(), nullable=True),
    sa.Column('digital', sa.Boolean(), nullable=True),
    sa.Column('rarity', sa.String(length=10), nullable=True),
    sa.Column('flavor_text', sa.String(length=500), nullable=True),
    sa.Column('artist', sa.String(length=60), nullable=True),
    sa.Column('illustration_id', sa.String(length=37), nullable=True),
    sa.Column('frame', sa.String(length=10), nullable=True),
    sa.Column('full_art', sa.Boolean(), nullable=True),
    sa.Column('watermark', sa.String(length=30), nullable=True),
    sa.Column('border_color', sa.String(length=12), nullable=True),
    sa.Column('story_spotlight_number', sa.Float(), nullable=True),
    sa.Column('timeshifted', sa.Boolean(), nullable=True),
    sa.Column('colorshifted', sa.Boolean(), nullable=True),
    sa.Column('futureshifted', sa.Boolean(), nullable=True),
    sa.Column('scryfall_set_uri', sa.String(length=60), nullable=True),
    sa.Column('image_uris', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('prices', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.ForeignKeyConstraint(['set_id'], ['set.api_id'], ),
    sa.PrimaryKeyConstraint('api_id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('deck',
    sa.Column('api_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.api_id'], ),
    sa.PrimaryKeyConstraint('api_id')
    )
    op.create_table('deck_card_association',
    sa.Column('deck_api_id', sa.Integer(), nullable=False),
    sa.Column('card_api_id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['card_api_id'], ['card.api_id'], ),
    sa.ForeignKeyConstraint(['deck_api_id'], ['deck.api_id'], ),
    sa.PrimaryKeyConstraint('deck_api_id', 'card_api_id')
    )
    op.create_table('sideboard_card_association',
    sa.Column('deck_api_id', sa.Integer(), nullable=False),
    sa.Column('card_api_id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['card_api_id'], ['card.api_id'], ),
    sa.ForeignKeyConstraint(['deck_api_id'], ['deck.api_id'], ),
    sa.PrimaryKeyConstraint('deck_api_id', 'card_api_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sideboard_card_association')
    op.drop_table('deck_card_association')
    op.drop_table('deck')
    op.drop_table('card')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('set')
    op.drop_table('blacklist_token')
    # ### end Alembic commands ###
