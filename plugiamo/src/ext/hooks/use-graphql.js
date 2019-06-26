import { GraphQLClient } from 'graphql-request'
import { graphQlUrl, overrideAccount } from 'config'
import { useEffect, useState } from 'preact/hooks'

export const gql = strings => strings.join('')

export const client = new GraphQLClient(
  graphQlUrl,
  overrideAccount ? { headers: { 'Override-Account': overrideAccount } } : undefined
)

export const useGraphql = (query, variables) => {
  const [data, setData] = useState({ loading: true })

  useEffect(() => {
    client
      .request(query, variables)
      .then(data => setData(data))
      .catch(error => setData({ error }))
  }, [query, variables])

  return data
}
