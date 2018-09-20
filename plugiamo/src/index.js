import App from 'app'
import config from './config'
import { GraphQLClient } from 'graphql-request'
import mixpanel from 'ext/mixpanel'
import { Provider } from 'ext/graphql-context'
import { h, render } from 'preact'

mixpanel.init(config.mixpanelToken)

const client = new GraphQLClient(config.graphQlUrl)

const RootComponent = () => (
  <Provider value={client}>
    <App />
  </Provider>
)

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)
render(<RootComponent />, trendiamoContainer)
