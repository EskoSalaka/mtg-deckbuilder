from mtg_api import app
import os
print(os.environ.get("DATABASE_URL"))


print(app.config)
app.run()
