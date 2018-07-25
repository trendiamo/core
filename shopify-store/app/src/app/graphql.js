import { ApolloClient } from 'apollo-client'
import authFactory from 'auth'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const gqlApiUrl = `https://${process.env.API_ENDPOINT}/graphql`

const auth = authFactory()

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    ...auth.headers(),
  },
}))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(new HttpLink({ uri: gqlApiUrl })),
})

export default client
