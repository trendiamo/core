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
import { homepageModules as mymuesliUrls } from 'frekkls-config/mymuesli'
import { optionsFromHash } from 'app/setup'
import { moduleMatchers as pamplingUrls } from 'frekkls-config/pampling'
import './styles.css'

const addFrekklsLoadingFrame = frekklsContainer => {
  const iframe = document.createElement('iframe')
  iframe.className = 'frekkls-loading-frame'
  iframe.title = 'Frekkls Loading Frame'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  iframe.style.display = 'none'
  iframe.style.position = 'absolute'
  frekklsContainer.appendChild(iframe)
  const script = document.createElement('script')
  iframe.contentDocument.body.appendChild(script)
  return iframe
}

const addFrekklsReactRoot = frekklsContainer => {
  const reactRoot = document.createElement('div')
  reactRoot.classList.add('frekkls-react-root')
  frekklsContainer.appendChild(reactRoot)
  return reactRoot
}

const addFrekklsElements = () => {
  const frekklsContainer = document.createElement('div')
  frekklsContainer.classList.add('frekkls-container', 'notranslate')
  document.body.appendChild(frekklsContainer)
  const frekklsLoadingFrame = addFrekklsLoadingFrame(frekklsContainer)
  const frekklsReactRoot = addFrekklsReactRoot(frekklsContainer)

  return { frekklsLoadingFrame, frekklsReactRoot }
}

const RootComponent = () => (
  <ErrorBoundaries>
    <App />
  </ErrorBoundaries>
)

const processPreviewOpt = () => {
  const { preview, ...others } = optionsFromHash()
  if (preview === null || preview === undefined) return

  const anchor = Object.keys(others).reduce((acc, k) => {
    const newOpt = `${k}:${others[k]}`
    return acc ? `${acc},${newOpt}` : newOpt
  }, '')
  const newUrl = window.location.href.split('#')[0] + (anchor ? `#trnd:${anchor}` : '')

  if (preview.match(/1|true/)) {
    localStorage.setItem('trnd-plugin-enable-preview', 1)
  } else {
    localStorage.removeItem('trnd-plugin-enable-preview')
  }
  window.location.href = newUrl
}

const maybeTrackVisitedPage = () => {
  if (location.hostname === 'villadonatello.com' || location.hostname === 'grafik-werkstatt.de') {
    return
  } else if (location.hostname === 'www.mymuesli.com') {
    if (Object.keys(mymuesliUrls).indexOf(location.pathname) === -1) {
      localStorage.setItem('trnd-ignore-data-gathering', true)
      return
    } else {
      localStorage.removeItem('trnd-ignore-data-gathering')
    }
  } else if (location.hostname === 'www.pampling.com' || location.hostname === 'pampling.com') {
    if (
      pamplingUrls.map(e => e.homepagePath).indexOf(location.pathname) === -1 ||
      pamplingUrls.map(e => e.productsPath).indexOf(location.pathname) === -1
    ) {
      localStorage.setItem('trnd-ignore-data-gathering', true)
      return
    } else {
      localStorage.removeItem('trnd-ignore-data-gathering')
    }
  }
  mixpanel.track('Visited Page', { hostname: location.hostname })
}

const initApp = (frekklsReactRoot, googleAnalytics) => {
  mixpanel.init(mixpanelToken)
  maybeTrackVisitedPage()
  setupDataGathering(googleAnalytics)

  const browser = detect()

  const supportedBrowsers = [
    'chrome',
    'firefox',
    'safari',
    'edge',
    'opera',
    'ios',
    'ios-webview',
    'crios',
    'fxios',
    'instagram',
  ]

  const isBrowserVersionSupported = () =>
    browser.name !== 'safari' || (browser.version && browser.version.substring(0, 2) > 10)

  if (!browser || !supportedBrowsers.includes(browser.name) || !isBrowserVersionSupported()) return

  const onInitResult = getFrekklsConfig().onInit()
  if (onInitResult === false) return

  processPreviewOpt()

  render(<RootComponent />, frekklsReactRoot)
}

const main = () => {
  const { frekklsLoadingFrame, frekklsReactRoot } = addFrekklsElements()
  loadRollbar(frekklsLoadingFrame)

  const experimentClients = ['www.shopinfo.com.br', 'www.pierre-cardin.de']
  if (experimentClients.includes(location.hostname)) {
    const { promises, iframe } = loadGoogle(frekklsLoadingFrame)
    Promise.all(promises).then(() => {
      googleAnalytics.init(iframe)
      initApp(frekklsReactRoot, googleAnalytics)
    })
  } else {
    initApp(frekklsReactRoot)
  }
}

if (!window.FREKKLS) {
  window.FREKKLS = true
  main()
}
