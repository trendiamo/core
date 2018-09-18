import App from 'app'
import config from './config'
import { GraphQLClient } from 'graphql-request'
import mixpanel from 'ext/mixpanel'
import MixpanelProvider from 'react-mixpanel'
import { Provider } from 'ext/graphql-context'
import { h, render } from 'preact'

mixpanel.init(config.mixpanelToken)
mixpanel.track('Loaded Plugin', {
  host: window.location.hostname,
})
mixpanel.time_event('Opened')

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

const client = new GraphQLClient(config.graphQlUrl)

const RootComponent = () => (
  <Provider value={client}>
    <MixpanelProvider mixpanel={mixpanel}>
      <App />
    </MixpanelProvider>
  </Provider>
)

render(<RootComponent />, trendiamoContainer)
