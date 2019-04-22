import Base from './base'
import blacklistTags from './blacklist-tags'
import data from 'special/assessment/data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { AppBase } from 'app'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { fetchProducts } from 'special/assessment/utils'
import { getScrollbarWidth, isSmall } from 'utils'
import { h } from 'preact'
import { timeout } from 'plugin-base'

const Plugin = ({
  showingLauncher,
  isUnmounting,
  step,
  steps,
  goToNextStep,
  module,
  onToggleContent,
  setShowingLauncher,
  setPluginState,
  setShowingContent,
  showingContent,
  stepIndex,
  depth,
  showingCtaButton,
  pluginState,
  products,
  productsData,
  launcherDisappear,
}) => (
  <AppBase
    Component={
      <Base
        depth={depth}
        goToNextStep={goToNextStep}
        module={module}
        products={products}
        productsData={productsData}
        setPluginState={setPluginState}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        showingCtaButton={showingCtaButton}
        step={step}
        stepIndex={stepIndex}
        steps={steps}
      />
    }
    data={module}
    isUnmounting={isUnmounting}
    Launcher={showingLauncher && Launcher}
    launcherDisappear={launcherDisappear}
    launcherPulsating={pluginState !== 'closed'}
    onToggleContent={onToggleContent}
    persona={module.launcher.persona}
    showingContent={showingContent}
    showingLauncher={showingLauncher}
  />
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withProps({ module: data.sizeGuide }),
  branch(({ module }) => !module, renderNothing),
  withProps(({ module, pluginState }) => {
    module.launcher = pluginState === 'closed' ? module.closedLauncher : module.launcher
  }),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', ({ showingContent }) => showingContent),
  withState('showingLauncher', 'setShowingLauncher', true),
  withState('product', 'setProduct', null),
  withState('launcherDisappear', 'setLauncherDisappear', false),
  lifecycle({
    componentDidMount() {
      const { setProduct } = this.props
      fetchProducts(results => {
        const pathArray = window.location.pathname.split('/')
        const id = pathArray[pathArray.length - 1]
        const products = results.find(item => item.hostname === 'www.pierre-cardin.de').products
        const product = products.find(item => item.id === id && !blacklistTags.includes(item.tag))
        setProduct(product)
        mixpanel.track('Loaded Plugin', {
          flowType: module.flowType,
          hash: location.hash,
          hostname: location.hostname,
        })
      })
    },
    componentDidUpdate(prevProps) {
      const { showingContent } = this.props
      if (showingContent === prevProps.showingContent) return

      if (getScrollbarWidth() > 0) {
        if (showingContent) {
          document.documentElement.classList.add('trnd-open')
        } else {
          document.documentElement.classList.remove('trnd-open')
        }
      }
    },
  }),
  branch(({ product }) => !product, renderNothing),
  withHandlers({
    onToggleContent: ({
      module,
      setPluginState,
      pluginState,
      setIsUnmounting,
      setShowingContent,
      showingContent,
      launcherDisappear,
      setLauncherDisappear,
    }) => () => {
      if (module.flowType === 'outro') return
      if (pluginState === 'closed') {
        !launcherDisappear && setTimeout(() => setLauncherDisappear(true), 22000)
        if (!showingContent) return
      }
      if (pluginState !== 'closed') {
        setPluginState('closed')
      }
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')

      if (showingContent && isSmall()) {
        setIsUnmounting(true)
        return timeout.set(
          'exitOnMobile',
          () => {
            setIsUnmounting(false)
            setShowingContent(false)
          },
          400
        )
      }
      return setShowingContent(!showingContent)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)
