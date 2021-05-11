import cron from 'node-cron'
import { request } from 'graphql-request'
import { dirname } from 'path';

const datasetPath =  new URL(dirname(import.meta.url) + '/../dataset/').pathname;
const hostname = /(?<=-)[\w]+$/.exec(process.env.HOSTNAME)
const uri = `https://${hostname}-4000.sse.codesandbox.io/`

cron.schedule('*/1 * * * *', () => {
  washNeo4j()
});

async function washNeo4j () {
  const cleanFiction = /*GraphQL*/`
    mutation CleanFiction {
      CleanFiction
    }
  `
  
  const res = await request(uri, cleanFiction, {})
    .then(result => result.CleanFiction)
    .catch((e) => console.log('ERROR:', e ))
  
  console.log("Successfully cleaned ", res, " entries")

}
