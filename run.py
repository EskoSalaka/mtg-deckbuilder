from mtg_api import app


if __name__ == "__main__":
    print(app.config)
    app.run(debug=True)
