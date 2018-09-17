import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from 'app'
import config from './config'
import mixpanel from 'mixpanel-browser'
import MixpanelProvider from 'react-mixpanel'
import { h, render } from 'preact'

mixpanel.init(config.mpToken)
mixpanel.track('loadedPlugin', {
  host: window.location.hostname,
})
mixpanel.time_event('Opened')

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

const client = new ApolloClient({ uri: config.graphQlUrl })

const RootComponent = () => (
  <ApolloProvider client={client}>
    <MixpanelProvider mixpanel={mixpanel}>
      <App />
    </MixpanelProvider>
  </ApolloProvider>
)

render(<RootComponent />, trendiamoContainer)
