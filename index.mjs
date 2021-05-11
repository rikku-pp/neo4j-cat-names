import { ApolloServer } from 'apollo-server'
import { makeAugmentedSchema } from 'neo4j-graphql-js'
import neo4j from 'neo4j-driver'

import { typeDefs } from './graphql-schema.mjs'
import { resolvers } from './graphql-resolvers.mjs'

// Generate executable schema with auto-generated resolvers
const schema = makeAugmentedSchema({
  typeDefs,
  resolvers
})

// Instantiate a Neo4j database driver
const driver = neo4j.driver(
  process.env.BOLT_URL, //neo4jsandbox-direct-http:bolt-port
  neo4j.auth.basic('neo4j', process.env.NEO4J_PWD)
)

// Create a new ApolloServer, injecting the database driver
// into the context
const server = new ApolloServer({
  context: { driver },
  schema
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
