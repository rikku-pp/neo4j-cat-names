import fs from 'fs'
import parse from 'csv-parse/lib/sync.js'
import { request } from 'graphql-request'
import { dirname } from 'path';
import { namedDefs } from '../graphql-schema.mjs'

const datasetPath =  new URL(dirname(import.meta.url) + '/../dataset/').pathname;

const hostname = /(?<=-)[\w]+$/.exec(process.env.HOSTNAME)
const uri = `https://${hostname}-4000.sse.codesandbox.io/`

async function main() {

  const fileContent = fs.readFileSync(datasetPath + "catnames.csv", 'utf8')
  const csvData = parse(fileContent, {
    columns: line => line.map(field => field.replace(/\s/g , "_") ), 
    skip_empty_lines: true
  })
  
  const res = await request(uri, namedDefs.ImportCatNames, {
    "listOfCatNames": csvData
  }).catch((e) => console.log('ERROR:', e.response.errors ))
  
  console.log("Successfully imported:", res)

}

main()
