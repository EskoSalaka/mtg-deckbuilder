from mtg_api import app
import os



@app.route('/')
def hello_world():
    return 'Hello, World!'

print(app)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 3000))
    app.run(host='0.0.0.0', port=port)
