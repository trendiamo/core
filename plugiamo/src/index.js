import App from 'app'
import ErrorBoundaries from 'ext/recompose/error-boundaries'
import getFrekklsConfig from 'frekkls-config'
import googleAnalytics, { loadGoogle } from 'ext/google-analytics'
import mixpanel from 'ext/mixpanel'
import setupDataGathering from 'data-gathering'
import { detect } from 'detect-browser'
import { GraphQLClient } from 'graphql-request'
import { graphQlUrl, location, mixpanelToken, overrideAccount } from './config'
import { h, render } from 'preact'
import { loadRollbar } from 'ext/rollbar'
import { Provider } from 'ext/graphql-context'
import './styles.css'

const addFrekklsLoadingFrame = () => {
  const iframe = document.createElement('iframe')
  iframe.title = 'frekkls-loading-frame'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.display = 'none'
  iframe.style.position = 'absolute'
  document.body.appendChild(iframe)
  const script = document.createElement('script')
  iframe.contentDocument.body.appendChild(script)
  return iframe
}

const initRootComponent = () => {
  const client = new GraphQLClient(
    graphQlUrl,
    overrideAccount ? { headers: { 'Override-Account': overrideAccount } } : undefined
  )

  const RootComponent = () => (
    <Provider value={client}>
      <ErrorBoundaries>
        <App />
      </ErrorBoundaries>
    </Provider>
  )

  return RootComponent
}

const initApp = googleAnalytics => {
  setupDataGathering(googleAnalytics)

  mixpanel.init(mixpanelToken)
  mixpanel.track('Visited Page', { hostname: location.hostname })

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

const main = () => {
  const frekklsLoadingFrame = addFrekklsLoadingFrame()
  loadRollbar(frekklsLoadingFrame)

  const experimentClients = ['www.shopinfo.com.br', 'www.pierre-cardin.de']
  if (experimentClients.includes(location.hostname)) {
    const { promises, iframe } = loadGoogle(frekklsLoadingFrame)
    Promise.all(promises).then(() => {
      googleAnalytics.init(iframe)
      initApp(googleAnalytics)
    })
  } else {
    initApp()
  }
}

if (!window.FREKKLS) {
  window.FREKKLS = true
  main()
}
