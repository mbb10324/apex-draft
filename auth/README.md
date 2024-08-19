# Duro API

## Getting Started

### To create a docker container, spin up postgres, and create our database:

1. Ensure docker desktop is installed and running
2. run: `chmod +x start.sh`
3. run: `./start.sh`

### To migrate tables into our newly created database:

1. run: `npx knex migrate:latest`

### To seed our database:

1. run: `npx knex seed:run`

### To start the api:

1. run: `npm start`

### Notes:

-   If you have ran all of the above operations without error, everything "should" be g2g.
-   To change the default settings for the container generation and database creation open up the db_setup.sh and at the top of the file you will see the variables that you can change. For example you can change your postgres password by changing POSTGRES_PASSWORD='docker' to POSTGRES_PASSWORD='password'.

## Schema

<https://drawsql.app/teams/miles-team/diagrams/duro>

## Documentation

This api is created using express and knex, it utilizes a docker container to run a postgres database locally, It utilizes knex to migrate and seed the database, and It utilizes nodemon to run the server locally.

### root

-   `migrations`: contains all of the migrations for the database tables

-   `seeds`: contains all of the seed data for the database tables

-   `knexfile.js`: contains the knex configuration for the database

-   `routers`: contains all of the routing logic for the api

-   `index.js`: contains the server root logic for the api

-   `public`: contains the files that get served at "/"

-   `auth.js`: contains the middleware for authentication

-   `logging.js`: contains the logic for custom logging

-   `db_setup.sh`: contains the shell script to create the docker container, spin up postgres, and create our database

# Go through security group permissions thoroughly

# http://34.207.210.73:3000/community/check-username?username=MilesB

# figure out ssl

# changed .env's and knexfile.js
