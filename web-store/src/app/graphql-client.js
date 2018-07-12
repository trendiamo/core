import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const gqlApiUrl = `${process.env.REACT_APP_BACKEND_URL}/graphql`

// export const authHeaders = () => ({
//   'X-USER-EMAIL': localStorage.getItem('authEmail'),
//   'X-USER-TOKEN': localStorage.getItem('authToken'),
// })

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    // ...authHeaders(),
  },
}))

const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(new HttpLink({ uri: gqlApiUrl })),
})

export default graphqlClient
