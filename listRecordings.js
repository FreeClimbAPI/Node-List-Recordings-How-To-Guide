require('dotenv').config()
const freeclimbSDK = require('@freeclimb/sdk')

const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY
const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

getRecordings().then(recordings => {
  console.log('got recordings', recordings)
}).catch(err => {
  console.log(err)
})

async function getRecordings() {
  const recordings = []

  let response = await freeclimb.listRecordings()
  recordings.push(...response.recordings)

  while (response.nextPageUri) {
    response = await freeclimb.getNextPage(response)
    recordings.push(...response.recordings)
  }
  return recordings
}