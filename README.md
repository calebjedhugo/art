# Rackner Digital Art Project

## Intro
As a software engineer, you've been tasked to create a CRUD API for managing digital art

## Tech Stack
- React
- ExpressJS
- NodeJS
- PostgreSQL

## Prep
If you haven't already, install Docker and `docker-compose` locally. This will allow you to 
create the nodejs app, database, and front end in one line, `docker-compose up`. (The provided 
docker-compose.yaml file already has many things done for you already - networking, db credentials, 
live code reload for the express and react apps, etc).

We need the node_modules folders locally, so after downloading this repo, first run
```
cd server && npm install && cd ..
cd frontend && yarn && cd ..
```

To run & develop the applications, run:
```
docker-compose up —-build
```
The Express & React app will live reload on each file save.

To stop the app & erase the database, run:
```
docker-compose down
```

_The Express app is running at localhost:3100_

_The React SPA is running at localhost:3000_

## DB Migrations
While docker-compose up is running, in a new terminal run `docker-compose run app bash` to start a bash shell inside the app container. From there, you can run the following migration commands:
- npm run migrate up will run the migrations.
- npm run migrate down will roll back the migrations.
- npm run migrate:create <migration-name> will create a new migration file in src/migrations folder.

## Challenge
1. Create a CRUD RESTful API for the Art, using Express and PostgreSQL
Define an Art table for Postgres. An `Art` model should contain: name of the art, artist, description, width, height, and date created

Define HTTP endpoints for art, to allow:
- Create: create a new piece of art
  input: name, artist, description, width, height, and date create
  output: the newly created art object
- Read: read a piece of art
  input: id
  output: art object
- Update: update a piece of art's name or description
  input: id, name, description
  output: updated art object
- Delete: delete a piece of art
  input: id

2. Create a React front end to consume the API

(Style/Design does not matter at all, feel free to use minimal or no CSS)

This front end should consume each API event you created
- Create: create a button which sends random data for each required field, or use a form for user inputed data, 
  whichever is easier/quicker for you
- Read: display a list of all current pieces of art (anyway you want)
- Update: allow the user to update an item in the list's title or description
- Delete: allow the user to delete an item in the list

_Note: While the Express app and React app are already bootstrapped for you, and exposed via port 3000 and 3100, remember you still need to connect the React app to the Express app. Feel free to use "proxy", 

3. Write tests using a Javascript test framework of your choice to validate the API events
Write tests for each CRUD event you've written, that show they work as expected.

## Additional Questions
1. Each digital art file is a PNG, how would you save and serve this file from the API
to the client? How could you use AWS to do this? How would you modify the API/Data Model
you've created? (Answer in <500 words)

2. Write a description of a system design you would use for this app. How would you deploy this app to
production? Feel free to dig into anything you have experience with. (Answer in <500 words)

