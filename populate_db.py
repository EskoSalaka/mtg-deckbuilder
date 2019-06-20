from app.models import Card
from app import db

c = Card(id=1, name='kaka')

db.session.add(c)
db.session.commit()
