import App from 'app'
import initRollbar from 'ext/rollbar'
import mixpanel from 'ext/mixpanel'
import SpotAHome from 'special/spotahome'
import { detect } from 'detect-browser'
import { GraphQLClient } from 'graphql-request'
import { graphQlUrl, location, mixpanelToken, production } from './config'
import { h, render } from 'preact'
import { Provider } from 'ext/graphql-context'
import './styles.css'

const initRootComponent = () => {
  const client = new GraphQLClient(
    graphQlUrl,
    production ? undefined : { headers: { 'Override-Hostname': location.hostname } }
  )

  const RootComponent = () => (
    <Provider value={client}>
      <App />
    </Provider>
  )

  return RootComponent
}

const main = () => {
  const browser = detect()
  const supportedBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'opera', 'ios', 'ios-webview', 'crios', 'fxios']

  if (!browser || !supportedBrowsers.includes(browser.name)) return

  initRollbar()
  mixpanel.init(mixpanelToken)

  mixpanel.track('Visited Page', { hostname: location.hostname })

  const Component = location.hostname === 'www.spotahome.com' ? SpotAHome : initRootComponent()

  const trendiamoContainer = document.createElement('div')
  trendiamoContainer.classList.add('trendiamo-container')
  document.body.appendChild(trendiamoContainer)
  render(<Component />, trendiamoContainer)
}

main()
