# How to run

You need to set up a database to run this app. See Setup section.

You also need to import some data from csv to make the app useful. See Data Import section.

## Setup

It's possible to use a full cloud setup, or fully local setup or a combination of both. A cloud setup is quicker and require less configuration, but a local setup is preferred if you want to do your own development. Neo4j sandbox has a limit of 3 days until you need to start over with a new instance.

### Cloud: CodeSandbox + Neo4j Sandbox

1. Start an empty Neo4j sandbox (https://sandbox.neo4j.com/) and fork the Codesandbox (https://codesandbox.io/s/neo4j-cat-names-6hn8k)
2. Find the Neo4j sandbox **Connection details**, copy _Bolt URL_
3. Replace `BOLT_URL` in _Server Control Panel_ > _Secret Keys_
4. Replace `NEO4J_PWD` in _Server Control Panel_ > _Secret Keys_
5. Make sure codesandbox server is running. It may be needed to refresh browser.

At this point, you should have your own instance running.

### Local Neo4j instance

To avoid the Neo4j sandbox 3 day limit, a database on your own machine is possible to connect.

1. Download Neo4j https://neo4j.com/download/
   - Recommended version: Community Server 4.2.X
   - Download and install APOC plugin: https://neo4j.com/labs/apoc/4.0/installation/
2. Install and start the service. Follow instructions on neo4j website. Also create the database.
   - This app assumes that you use default database name `neo4j` and username `neo4j`.
3. Update secret keys the password for database.
4. (Codesandbox only) Get [ngrok](https://ngrok.com) and run `ngrok tcp 7687`.
   - Grab the full forwarding address.
   - Replace `BOLT_URL` in _Server Control Panel_ > _Secret Keys_ with the ngrok address, but use `bolt://` instead of `tcp://`

### Local NodeJs development

The frontend development can also be done locally and deployed to a server.

1. Setup your Yarn ≥1.2, and Node ≥14.15.
2. Create file `.env` from `.env.example` and add your database password.

Start the dev server

```BASH
   yarn dev
```

- App location: `http://localhost:4001`
- GraphQL playground: `http://localhost:4000`
- Neo4j browser: `http://localhost:7474`

## Data import

Import some cat names to database using the node script `yarn data-import`. You need yarn >1.2 installed to correctly resolve the dependencies.

Alternatively use the cypher provided in import folder after copying `catnames.csv` into Neo4j import folder. (Not possible in Neo4j Sandbox)
