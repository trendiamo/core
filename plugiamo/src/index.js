import App from 'app'
import Hackathon from 'special/hckt'
// import initRollbar from 'ext/rollbar'
import getFrekklsConfig from 'frekkls-config'
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

const detectAndMarkHackathon = () => {
  if (location.hostname !== 'www.buttwrap.com' && !process.env.HACKATHON) return false
  if ((optionsFromHash().hckt || '').match(/1|true/)) localStorage.setItem('trnd-hackathon', 1)
  return !!localStorage.getItem('trnd-hackathon')
}

const initRootComponent = () => {
  if (detectAndMarkHackathon()) return Hackathon
  // here we haven't requested info yet, so we do need to base this off of location.hostname
  if (location.hostname === 'www.spotahome.com') return SpotAHome

  const client = new GraphQLClient(
    graphQlUrl,
    overrideAccount ? { headers: { 'Override-Account': overrideAccount } } : undefined
  )

  const RootComponent = () => (
    <Provider value={client}>
      <App />
    </Provider>
  )

  return RootComponent
}

const main = () => {
  // initRollbar()
  mixpanel.init(mixpanelToken)
  mixpanel.track('Visited Page', { hostname: location.hostname })
  setupDataGathering()

  const browser = detect()
  const supportedBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'opera', 'ios', 'ios-webview', 'crios', 'fxios']
  if (!browser || !supportedBrowsers.includes(browser.name)) return

  getFrekklsConfig().onInit()

  const Component = initRootComponent()
  const trendiamoContainer = document.createElement('div')
  trendiamoContainer.classList.add('trendiamo-container')
  document.body.appendChild(trendiamoContainer)
  render(<Component />, trendiamoContainer)
}

main()
