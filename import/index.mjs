import fs from 'fs'
import parse from 'csv-parse/lib/sync.js'
import dotenv from 'dotenv'
import { request } from 'graphql-request'
import { dirname } from 'path'
import { namedDefs } from '../graphql-schema.mjs'
dotenv.config()

const datasetPath = new URL(dirname(import.meta.url) + '/../dataset/').pathname

let uri = process.env.IS_SANDBOX ? process.env.API_URL : 'http://localhost:4000'

async function main() {
  const fileContent = fs.readFileSync(datasetPath + 'catnames.csv', 'utf8')
  const csvData = parse(fileContent, {
    columns: (line) => line.map((field) => field.replace(/\s/g, '_')),
    skip_empty_lines: true
  })

  const res = await request(uri, namedDefs.ImportCatNames, {
    listOfCatNames: csvData
  }).catch((e) => console.log('ERROR:', e.response))

  console.log('Imported:', res)
}

main()
