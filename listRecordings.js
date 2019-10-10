require('dotenv').config()
const persephonySDK = require('@persephony/sdk')

const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const persephony = persephonySDK(accountId, authToken)

getRecordings().then(recordings => {
  // Use recordings
}).catch(err => {
  // Catch Errors
})

async function getRecordings() {
  // Create array to store all recordings
  const recordings = []
  // Invoke GET method to retrieve initial list of recordings information
  const first = await persephony.api.recordings.getList()
  recordings.push(...first.recordings)
  // Get Uri for next page
  let nextPageUri = first.nextPageUri
  // Retrieve entire recordings list 
  while (nextPageUri) {
    const nextPage = await persephony.api.recordings.getNextPage(nextPageUri)
    recordings.push(...nextPage.recordings)
    nextPageUri = nextPage.nextPageUri
  }
  return recordings
}