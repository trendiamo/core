import { Consumer } from 'ext/graphql-context'
import { h } from 'preact'
import { compose, lifecycle, withState } from 'recompose'

export const gql = strings => strings.join('')

const queryComp = (BaseComponent, query, variables) =>
  compose(
    withState('data', 'setData', { loading: true }),
    lifecycle({
      componentDidMount() {
        const { client, setData } = this.props
        client
          .request(query, variables)
          .then(data => setData(data))
          .catch(error => setData({ error }))
      },
    })
  )(BaseComponent)

export const graphql = (query, variables) => BaseComponent => {
  const QueryComp = queryComp(BaseComponent, query, variables)
  const Graphql = props => <Consumer>{client => <QueryComp {...props} client={client} />}</Consumer>
  return Graphql
}
