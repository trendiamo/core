import App from 'app'
import config from './config'
import { GraphQLClient } from 'graphql-request'
import { Provider } from 'ext/graphql-context'
import ReactGA from 'react-ga'
import { h, render } from 'preact'

ReactGA.initialize(config.gaId, { testMode: process.env.NODE_ENV !== 'production', titleCase: false })
ReactGA.ga('send', 'pageview', location.pathname)

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

const client = new GraphQLClient(config.graphQlUrl)

const RootComponent = () => (
  <Provider value={client}>
    <App />
  </Provider>
)

render(<RootComponent />, trendiamoContainer)
