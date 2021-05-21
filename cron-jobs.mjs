import cron from 'node-cron'
import { request } from 'graphql-request'
import dotenv from 'dotenv'
dotenv.config()

const hostname = /(?<=-)[\w]+$/.exec(process.env.HOSTNAME)
const uri = process.env.IS_SANDBOX
  ? `https://${hostname}-4000.sse.codesandbox.io/`
  : 'http://localhost:4000'

cron.schedule('*/1 * * * *', () => {
  washNeo4j()
})

async function washNeo4j() {
  const cleanFiction = /*GraphQL*/ `
    mutation CleanFiction {
      CleanFiction
    }
  `

  const res = await request(uri, cleanFiction, {})
    .then((result) => result.CleanFiction)
    .catch((e) => console.log('ERROR:', e))

  console.log('Successfully cleaned ', res, ' entries')
}
