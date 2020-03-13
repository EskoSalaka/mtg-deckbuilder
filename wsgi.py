from mtg_api import app
import os
print(os.environ.get("DATABASE_URL"))


@app.route('/')
def hello_world():
    return 'Hello, World!'

print(app.config)
print(app)
app.run()
