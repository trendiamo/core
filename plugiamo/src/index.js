import App from 'app'
import ErrorBoundaries from 'ext/error-boundaries'
import getFrekklsConfig from 'frekkls-config'
import googleAnalytics, { loadGoogle } from 'ext/google-analytics'
import mixpanel from 'ext/mixpanel'
import setupDataGathering from 'data-gathering'
import { detect } from 'detect-browser'
import { h, render } from 'preact'
import { loadRollbar } from 'ext/rollbar'
import { location, mixpanelToken } from './config'
import './styles.css'

const renderTrendiamoContainer = () => {
  const trendiamoContainer = document.createElement('div')
  trendiamoContainer.classList.add('trendiamo-container')
  document.body.appendChild(trendiamoContainer)
  return trendiamoContainer
}

const addFrekklsLoadingFrame = trendiamoContainer => {
  const iframe = document.createElement('iframe')
  iframe.title = 'frekkls-loading-frame'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.display = 'none'
  iframe.style.position = 'absolute'
  trendiamoContainer.appendChild(iframe)
  const script = document.createElement('script')
  iframe.contentDocument.body.appendChild(script)
  return iframe
}

const RootComponent = () => (
  <ErrorBoundaries>
    <App />
  </ErrorBoundaries>
)

const initApp = (trendiamoContainer, googleAnalytics) => {
  setupDataGathering(googleAnalytics)

  mixpanel.init(mixpanelToken)
  mixpanel.track('Visited Page', { hostname: location.hostname })

  const browser = detect()
  const supportedBrowsers = ['chrome', 'firefox', 'safari', 'edge', 'opera', 'ios', 'ios-webview', 'crios', 'fxios']
  if (!browser || !supportedBrowsers.includes(browser.name)) return

  const onInitResult = getFrekklsConfig().onInit()
  if (onInitResult === false) return

  render(<RootComponent />, trendiamoContainer)
}

const main = () => {
  const trendiamoContainer = renderTrendiamoContainer()
  const frekklsLoadingFrame = addFrekklsLoadingFrame(trendiamoContainer)
  loadRollbar(frekklsLoadingFrame)

  const experimentClients = ['www.shopinfo.com.br', 'www.pierre-cardin.de']
  if (experimentClients.includes(location.hostname)) {
    const { promises, iframe } = loadGoogle(frekklsLoadingFrame)
    Promise.all(promises).then(() => {
      googleAnalytics.init(iframe)
      initApp(trendiamoContainer, googleAnalytics)
    })
  } else {
    initApp(trendiamoContainer)
  }
}

if (!window.FREKKLS) {
  window.FREKKLS = true
  main()
}
