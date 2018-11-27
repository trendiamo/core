import App from 'app'
import initRollbar from 'ext/rollbar'
import mixpanel from 'ext/mixpanel'
import { detect } from 'detect-browser'
import { GraphQLClient } from 'graphql-request'
import { graphQlUrl, location, mixpanelToken, production } from './config'
import { h, render } from 'preact'
import { Provider } from 'ext/graphql-context'
import './styles.css'

const browser = detect()
const supportedBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'opera', 'ios', 'ios-webview', 'crios', 'fxios']
if (browser && supportedBrowsers.includes(browser.name)) {
  initRollbar()
  mixpanel.init(mixpanelToken)

  const client = new GraphQLClient(
    graphQlUrl,
    production ? undefined : { headers: { 'Override-Hostname': location.hostname } }
  )

  const RootComponent = () => (
    <Provider value={client}>
      <App />
    </Provider>
  )

  const trendiamoContainer = document.createElement('div')
  trendiamoContainer.classList.add('trendiamo-container')
  document.body.appendChild(trendiamoContainer)
  render(<RootComponent />, trendiamoContainer)
}
