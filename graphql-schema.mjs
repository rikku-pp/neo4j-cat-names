import fs from 'fs'
import { getAllFiles } from './utils/index.mjs'

/*
 * Check for .graphql files to join
 */
let srcMapper = []
let schemas = getAllFiles('./', '.graphql')
  .map((path) => {
    const str = fs.readFileSync(path).toString('utf-8')
    srcMapper.push(path)
    return str
  })
  .join("\r\n\r\n")

/*
 * Split into list of schema definitions
 */
const splitDefs = schemas.split(/[\r\n]{4,}/g)

/*
 * Parse each
 */
const namedSchemas = splitDefs
  .reduce((coll, query, index) => {
    let name
    try {
      name = query.match(/(type\s|extend\stype\s|input\s|enum\s|interface\s|query\s|mutation\s)([^\s]+)/)[2]
    } catch(e) {
      console.log("Loaded declaration not parsable: ", query || "<empty>", " in ", srcMapper[index])
    }
    coll[name] = splitDefs[index]
    return coll
  }, {})
  
console.log(`Using ${Object.keys(namedSchemas).length} schema defs (type, query, mutation, etc.) \n parsed from ${srcMapper.length} files (.graphql)`)

export const typeDefs = schemas
export const namedDefs = namedSchemas