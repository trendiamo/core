import AppBase from 'app/base'
import ChatBase from 'app/content/simple-chat/chat-base'
import data from 'special/assessment/data'
import getFrekklsConfig from 'frekkls-config'
import googleAnalytics from 'ext/google-analytics'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withChatActions from 'ext/recompose/with-chat-actions'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { fetchProducts, recommendedProducts } from 'special/assessment/utils'
import { getScrollbarWidth, isSmall } from 'utils'
import { h } from 'preact'
import { SimpleChat, timeout } from 'plugin-base'

const Plugin = ({
  showingLauncher,
  isUnmounting,
  module,
  onToggleContent,
  showingContent,
  products,
  clickActions,
  showingBubbles,
  setIsGAReady,
}) => (
  <AppBase
    Component={
      <SimpleChat
        backButtonLabel={getFrekklsConfig().i18n.backButton}
        ChatBase={ChatBase}
        chatBaseProps={{ assessment: true }}
        clickActions={clickActions}
        ctaButton={module.ctaButton}
        data={module}
        lazyLoadingCount={6}
        products={products}
      />
    }
    data={module}
    isUnmounting={isUnmounting}
    Launcher={showingLauncher && Launcher}
    launcherPulsating
    onToggleContent={onToggleContent}
    persona={module.launcher.persona}
    setIsGAReady={setIsGAReady}
    showingBubbles={showingBubbles}
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
  withState('showingLauncher', 'setShowingLauncher', () =>
    googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true
  ),
  withState('showingBubbles', 'setShowingBubbles', () =>
    googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true
  ),
  withChatActions(),
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
