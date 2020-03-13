from mtg_api import app
import os
print(os.environ.get("DATABASE_URL"))

if __name__ == "__main__":
    print(app.config)
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
