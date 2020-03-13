from flask import Flask
import os
print(os.getenv("DATABASE_URL"))

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World11111!'


if __name__ == "__main__":
    print(app.config)
    print(app)
    port = int(os.environ.get("PORT", 3000))
    print(port)
    app.run(host='0.0.0.0', port=port)
