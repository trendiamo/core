import Base from './base'
import data from 'special/assessment/data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { AppBase } from 'app'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { fetchProducts, recommendedProducts } from 'special/assessment/utils'
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
  tags,
  showingCtaButton,
  products,
  productsData,
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
        tags={tags}
      />
    }
    data={module}
    isUnmounting={isUnmounting}
    Launcher={showingLauncher && Launcher}
    launcherPulsating
    onToggleContent={onToggleContent}
    persona={module.launcher.persona}
    showingContent={showingContent}
    showingLauncher={showingLauncher}
  />
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withState('productsData', 'setProductsData', []),
  withState('products', 'setProducts', []),
  withProps({ module: data.cart }),
  branch(({ module }) => !module, renderNothing),
  branch(({ module }) => module.flowType === 'ht-nothing', renderNothing),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', ({ showingContent }) => showingContent),
  withState('showingLauncher', 'setShowingLauncher', true),
  lifecycle({
    componentDidMount() {
      const { module, setShowingContent, setProductsData, setProducts } = this.props

      fetchProducts(results => {
        const products = recommendedProducts(results)
        if (products.assessmentProducts.length === 0) return
        setProductsData(results)
        setProducts(products)
        mixpanel.track('Loaded Plugin', {
          autoOpen,
          flowType: module.flowType,
          hash: location.hash,
          hostname: location.hostname,
        })
      })

      const autoOpen = isSmall() ? false : module.flowType === 'ht-chat'
      if (autoOpen) setShowingContent(true)
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
  withHandlers({
    onToggleContent: ({ module, setIsUnmounting, setShowingContent, showingContent }) => () => {
      if (module.flowType === 'outro') return
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
  branch(({ products }) => products.length === 0, renderNothing),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)
