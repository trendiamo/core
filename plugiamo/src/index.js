import App from 'app'
import mixpanel from 'ext/mixpanel'
import { GraphQLClient } from 'graphql-request'
import { graphQlUrl, mixpanelToken } from './config'
import { h, render } from 'preact'
import { Provider } from 'ext/graphql-context'
import './styles.css'
import 'ext/rollbar'

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
