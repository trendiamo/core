// run with: node --experimental-modules index.mjs
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const requestOptions = {
  headers: {
    Authorization: `Plain ${process.env.BACKEND_AUTH_TOKEN}`,
    'cache-control': 'no-cache',
    'Content-Type': 'application/json',
  },
}

const replaceSlashes = tag => {
  let result = tag.replace(/\//g, '>')
  result = result.replace(/Kino > Theater/g, 'Kino / Theater')
  result = result.replace(/Dimout>Blackout/g, 'Dimout/Blackout')
  return result
}

fetch(`${process.env.BACKEND_API_URL}/tagged_products_api/clients`, requestOptions)
  .then(res => res.json())
  .then(clients => {
    clients.forEach(client => {
      const newClient = {
        ...client,
        payload: {
          products: client.payload.products.map(product => {
            const newProduct = { ...product }
            if (product.tags) {
              newProduct.tags = product.tags.map(replaceSlashes)
            } else if (product.tag) {
              newProduct.tag = replaceSlashes(product.tag)
            }
            return newProduct
          }),
        },
      }

      fetch(`${process.env.BACKEND_API_URL}/tagged_products_api/clients/${client.id}`, {
        ...requestOptions,
        method: 'PUT',
        body: JSON.stringify({ client: newClient }),
      })
        .then(res => res.json())
        .then(console.log)
    })
  })
