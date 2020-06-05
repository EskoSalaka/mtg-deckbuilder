from mtg_api import app
import os


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3001))
    app.run(debug=True, port=port, host='localhost')
