// run with: node migrate-from-rest-db.js

const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()

const restDbApiKey = process.env.REST_DB_API_KEY

const optionsCopyClients = {
  method: 'GET',
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': restDbApiKey,
    'Content-Type': 'application/json',
  },
}

const backendApiUrl = process.env.BACKEND_API_URL
const backendAuthToken = process.env.BACKEND_AUTH_TOKEN

fetch('https://inprov-3db5.restdb.io/rest/clients', optionsCopyClients).then(res => res.json()).then(clients => {

  clients.forEach(client => {
    const bodyRaw = { hostname: client.hostname, payload: { products: client.products } }
    const body = JSON.stringify({ client: bodyRaw })

    const optionsPasteClients = {
      method: 'POST',
      headers: {
        Authorization: `Plain ${backendAuthToken}`,
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
      },
      body,
    }

    fetch(`${backendApiUrl}/tagged_products_api/clients`, optionsPasteClients).then(res => res.json()).then(client => {
      console.log(client.hostname, client.payload.products.length + ' products', 'OK')
    })
  })
})
