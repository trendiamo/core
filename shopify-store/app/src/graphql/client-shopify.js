import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const gqlApiUrl = `https://${process.env.SHOPIFY_STORE}/admin/api/graphql.json`

const authLink = setContext(() => ({
  headers: { 'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD },
}))

const clientShopify = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      fetchOptions: {
        mode: 'cors',
      },
      uri: gqlApiUrl,
    })
  ),
})

export default clientShopify
