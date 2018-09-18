import App from 'app'
import config from './config'
import { GraphQLClient } from 'graphql-request'
import MixpanelProvider from 'react-mixpanel'
import { Provider } from 'ext/graphql-context'
import trndMixpanel from 'ext/mixpanel'
import { h, render } from 'preact'

trndMixpanel.init(config.mixpanelToken)
trndMixpanel.track('Loaded Plugin', {
  host: window.location.hostname,
})
trndMixpanel.time_event('Opened')

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

const client = new GraphQLClient(config.graphQlUrl)

const RootComponent = () => (
  <Provider value={client}>
    <MixpanelProvider mixpanel={trndMixpanel}>
      <App />
    </MixpanelProvider>
  </Provider>
)

render(<RootComponent />, trendiamoContainer)
