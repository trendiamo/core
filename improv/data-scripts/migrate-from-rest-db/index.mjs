// run with: node --experimental-modules index.mjs
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const optionsCopyClients = {
  method: 'GET',
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': process.env.REST_DB_API_KEY,
    'Content-Type': 'application/json',
  },
}

fetch('https://inprov-3db5.restdb.io/rest/clients', optionsCopyClients)
  .then(res => res.json())
  .then(clients => {
    clients.forEach(client => {
      const newClient = { hostname: client.hostname, payload: { products: client.products } }

      const optionsPasteClients = {
        method: 'POST',
        headers: {
          Authorization: `Plain ${process.env.BACKEND_AUTH_TOKEN}`,
          'cache-control': 'no-cache',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client: newClient }),
      }

      fetch(`${process.env.BACKEND_API_URL}/tagged_products_api/clients`, optionsPasteClients)
        .then(res => res.json())
        .then(console.info)
    })
  })
