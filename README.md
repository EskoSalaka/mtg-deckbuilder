# mtg-deckbuilder

mtg-deckbuilder is a little online tool for deckbuilding similar to for example
https://deckstats.net/deckbuilder/ or https://manastack.com/home. It is made purely for fun & practice
purposes, but it will also have a few useful features!

# The project

## Backend

The backend API of the project is built with Flask and SQLAlchemy. It uses a PostgreSQL database supplied by Heroku and The Magic: the Gathering Card and Set data is essentially the same as the publicly available data from Scryfall. I populate the database with the mtg data by using another project of mine (take a look at the populate_database.py script).

Along with serving a bunch of routes related to the mtg data (such as the sets and cards), the backend also handles authentication for Users with simple JWT access tokens.

The backend API is deployed in Heroku at https://mtg-deckbuilder-api.herokuapp.com. You can for example access the set data with https://mtg-deckbuilder-api.herokuapp.com/api/sets/.

In short, it contains the following features:

- A connection to a PostgreSQL database containing the mtg data from Scryfall and various other tables/relationships
  like Users and their Decks
- Various routes related to retrieving certain mtg data in a similar format than in Scryfall
- Authentication for Users with JWT

## Frontend

The frontend, which is decoupled from the backend, is implemented with React and simple javascript (typescript would be handy here). It uses axios to consume the backend api. The authentication is handled in a simple way by saving the access token granted by backend to local storage. This is not the safest of ways, but good enough for now.

The app is deployed also in Heroku at https://mtg-deckbuilder-app.herokuapp.com

In short, it contains the following features:

- View for all the mtg sets, for cards of a certain set and for a single card (similar to Scryfall)
- Login/logout flow and protected routes
- View for a deck
- View to create a sealed deck for a logged-in user
- View to see the own decks for a logged-in user
- View to edit a deck in a deckbuilding mode for a logged-in user

Behind the scenes, there are also many utilities that handle the mtg data in various ways (sorting, grouping, manacosts, icons, stats plots, etc.)

## Some images from the views

All the sets
![Sets](/images/Sets.png)
