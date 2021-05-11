# Various Troubleshooting

**GraphQL Playground**

- _Unknown argument [id] on field XXX of type Mutation_
  Solution: Revisit typeDefs and make sure to 1. save file, 2. update the preview-browser-window.

- _Error: The type of Mutation.UpdateABC(xyz:) must be Input Type but got: XyZ!._
  Solution: Make sure there's at least one prop that has a basic data type (alternatively create a new Input Type?) AND that it is ordered directly after ID prop.

- _Error: Interface field InterfaceABC.\_id expects type ID! but Implemented.\_id is type String._
  Solution: Use a different, more specific prop name rather than just "id" or "\_id".

- _Error: Typedef... not found_
  Solution: Double check the exports are complete and correct in each level of /schema

- _Why are relationships, create/add/update/delete auto-generated but not input types?_
  Solution: In fact they are, but they will strictly require the unique id instead of other fields (potential duplicates)! So, make sure to define them when you know its use scenarios. Ie: will react components identify its content using non-unique names only? Will they be able to handle multiple responses adequately.

- _How to add relationships of generic types?_
  Use composition, not inheritance. It's the JS way.

- _How to script all my playground commands?_
  Use **graphql-request**, **lokka** or similar from a separate nodejs script. Don't bother graphql-cli-load or neo4j-graphql-cli unless preferring complete hand-written gql defs and schemas or locally running server.

- _Error: Must provide query string._
  Solution: Check if the query as exported properly from schema.

- _Error: Unknown scheme: null_
  Solution: Make sure the BOLT_URL env var has the "bolt://" protocol

- _Neo4jError: String("{value}") (of class org.neo4j.values.storable.UTF8StringValue)_
  Solution: Let your cypher statement do a `RETURN { node: n.node }` instead of `RETURN n.node AS node`
