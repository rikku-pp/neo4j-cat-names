# How to run

You need to set up a database to run this app.

Set up database via Neo4j Sandbox, or by downloading Neo4J community edition.

## Cloud neo4j instance

1. Start an empty Neo4j sandbox (https://sandbox.neo4j.com/)
2. Find the sandbox **Connection details**, copy _Bolt URL_
3. Replace `BOLT_URL` in _Server Control Panel_ > _Secret Keys_
4. Replace `NEO4J_PWD` in _Server Control Panel_ > _Secret Keys_
5. Make sure server is running. It may be needed to refresh browser.

## Local neo4j instance

1. Download and install Neo4j https://neo4j.com/download/
   -Recommended version: Community Server 4.2.X
   -Download and install APOC plugin: https://neo4j.com/labs/apoc/4.0/installation/
2. Run `neo4j install-service` then `neo4j start` from console
3. Update codesandbox secret keys with address and password for database.
   - get [ngrok](https://ngrok.com) and run `ngrok tcp 7687`.
   - Grab the full forwarding address.
   - Replace `BOLT_URL` in _Server Control Panel_ > _Secret Keys_ with the ngrok address, but use `bolt://` instead of `tcp://`

## Useful tools Neo4J

Browse

```SCSS
    http://localhost:7474
```

Visualize the schema

```SQL
    CALL db.schema.visualization
```
