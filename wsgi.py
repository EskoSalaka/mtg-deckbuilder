import os

from mtg_api import app

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3001))
    app.run(debug=False, port=port, host='localhost')
