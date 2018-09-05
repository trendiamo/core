import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from 'app'
import config from './config'
import ReactGA from 'react-ga'
import { h, render } from 'preact'

ReactGA.initialize(config.gaId, { testMode: process.env.NODE_ENV !== 'production', titleCase: false })
ReactGA.ga('send', 'pageview', location.pathname)

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

const client = new ApolloClient({ uri: config.graphQlUrl })

const RootComponent = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(<RootComponent />, trendiamoContainer)
