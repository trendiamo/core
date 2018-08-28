import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import App from 'app'
import ReactGA from 'react-ga'
import { h, render } from 'preact'

ReactGA.initialize('UA-000000-01', { testMode: process.env.NODE_ENV !== 'production', titleCase: false })
ReactGA.ga('send', 'pageview', location.pathname)

const trendiamoContainer = document.createElement('div')
trendiamoContainer.classList.add('trendiamo-container')
document.body.appendChild(trendiamoContainer)

const client = new ApolloClient({ uri: 'https://api-euwest.graphcms.com/v1/cjldl8gtb00qs01ciijssz1zr/master' })

const RootComponent = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(<RootComponent />, trendiamoContainer)
