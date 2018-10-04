import App from 'app'
import { GraphQLClient } from 'graphql-request'
import mixpanel from 'ext/mixpanel'
import { Provider } from 'ext/graphql-context'
import { graphQlUrl, mixpanelToken } from './config'
import { h, render } from 'preact'

mixpanel.init(mixpanelToken)

const client = new GraphQLClient(graphQlUrl)

const RootComponent = () => (
  <Provider value={client}>
    <App />
  </Provider>
)

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)
render(<RootComponent />, trendiamoContainer)
