import App from 'app'
import Bridge from 'special/bridge'
import bridgeData from 'special/bridge/data'
import getFrekklsConfig from 'frekkls-config'
import { matchUrl } from 'plugin-base'
// import initRollbar from 'ext/rollbar'
import googleAnalytics from 'ext/google-analytics'
import mixpanel from 'ext/mixpanel'
import setupDataGathering from 'data-gathering'
import SpotAHome from 'special/spotahome'
import { detect } from 'detect-browser'
import { GraphQLClient } from 'graphql-request'
import { graphQlUrl, location, mixpanelToken, overrideAccount } from './config'
import { h, render } from 'preact'
import { optionsFromHash } from 'app/setup'
import { Provider } from 'ext/graphql-context'
import './styles.css'

const detectAndMarkBridge = () => {
  if (!Object.keys(bridgeData).includes(process.env.BRIDGE || location.hostname)) return false
  if ((optionsFromHash().hckt || '').match(/1|true/)) localStorage.setItem('trnd-bridge', 1)
  if (!localStorage.getItem('trnd-bridge')) return false
  const trigger = bridgeData[process.env.BRIDGE || location.hostname].triggers.find(trigger =>
    trigger.urlMatchers.some(urlMatcher => matchUrl(location.pathname, urlMatcher))
  )
  return !!trigger
}

const initRootComponent = () => {
  if (detectAndMarkBridge()) return Bridge
  // here we haven't requested info yet, so we do need to base this off of location.hostname
  if (location.hostname === 'www.spotahome.com') return SpotAHome

  const client = new GraphQLClient(
    graphQlUrl,
    overrideAccount ? { headers: { 'Override-Account': overrideAccount } } : undefined
  )

  const RootComponent = () => (
    <Provider value={client}>
      <App googleAnalytics={googleAnalytics} />
    </Provider>
  )

  return RootComponent
}

const main = () => {
  // initRollbar()

  const experimentClients = ['www.shopinfo.com.br', 'www.pierre-cardin.de']
  experimentClients.includes(location.hostname) && googleAnalytics.initGA()

  mixpanel.init(mixpanelToken)
  mixpanel.track('Visited Page', { hostname: location.hostname })
  setupDataGathering(googleAnalytics)

  const browser = detect()
  const supportedBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'opera', 'ios', 'ios-webview', 'crios', 'fxios']
  if (!browser || !supportedBrowsers.includes(browser.name)) return

  const onInitResult = getFrekklsConfig().onInit()
  if (onInitResult === false) return

  const Component = initRootComponent()
  const trendiamoContainer = document.createElement('div')
  trendiamoContainer.classList.add('trendiamo-container')
  document.body.appendChild(trendiamoContainer)
  render(<Component />, trendiamoContainer)
}

if (!window.FREKKLS) {
  window.FREKKLS = true
  main()
}
