from mtg_api import app
import os
print(os.environ.get("DATABASE_URL"))

if __name__ == "__main__":
    print(app.config)
    app.run()
