import AppBase from 'app/base'
import blacklistTags from './blacklist-tags'
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data, { tagSizeGuides } from './data'
import getFrekklsConfig from 'frekkls-config'
import googleAnalytics from 'ext/google-analytics'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withChatActions from 'ext/recompose/with-chat-actions'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { fetchProducts } from 'special/assessment/utils'
import { getScrollbarWidth, isSmall } from 'utils'
import { h } from 'preact'
import { SimpleChat, timeout } from 'plugin-base'

const Plugin = ({
  clickActions,
  disappear,
  isUnmounting,
  modalsProps,
  module,
  onToggleContent,
  pluginState,
  setPluginState,
  showingContent,
  showingLauncher,
  showingBubbles,
  setIsGAReady,
}) => (
  <div>
    <ChatModals flowType={module.flowType} {...modalsProps} />
    <AppBase
      Component={
        <SimpleChat
          backButtonLabel={getFrekklsConfig().i18n.backButton}
          ChatBase={ChatBase}
          chatBaseProps={{ assessment: true }}
          clickActions={clickActions}
          data={module}
          setPluginState={setPluginState}
        />
      }
      data={module}
      disappear={disappear}
      isUnmounting={isUnmounting}
      Launcher={showingLauncher && Launcher}
      onToggleContent={onToggleContent}
      persona={module.launcher.persona}
      pluginState={pluginState}
      setIsGAReady={setIsGAReady}
      showingBubbles={showingBubbles}
      showingContent={showingContent}
      showingLauncher={showingLauncher}
    />
  </div>
)

export default compose(
  withState('pluginState', 'setPluginState', 'default'),
  withState('product', 'setProduct', null),
  withState('productType', 'setProductType', null),
  withProps(({ productType }) => ({
    module: productType && data(productType),
  })),
  lifecycle({
    componentDidMount() {
      const { setProduct, setProductType } = this.props
      fetchProducts(results => {
        const pathArray = location.pathname.split('/')
        const id = pathArray[pathArray.length - 1]
        const products = results.find(item => item.hostname === 'www.pierre-cardin.de').products
        const product = products.find(item => item.id === id && !blacklistTags.includes(item.tag))
        setProduct(product)
        if (!product) return
        const foundKey = Object.keys(tagSizeGuides).find(item => product.tag.includes(item))
        if (!foundKey) return
        setProductType(tagSizeGuides[foundKey])
      })
    },
  }),
  branch(({ module }) => !module, renderNothing),
  withProps(({ module, pluginState }) => {
    module.launcher = pluginState === 'closed' ? module.closedLauncher : module.launcher
  }),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', ({ showingContent }) => showingContent),
  withState('showingLauncher', 'setShowingLauncher', () =>
    googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true
  ),
  withState('showingBubbles', 'setShowingBubbles', () =>
    googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true
  ),
  withState('disappear', 'setDisappear', false),
  lifecycle({
    componentDidMount() {
      const { module } = this.props
      mixpanel.track('Loaded Plugin', {
        flowType: module.flowType,
        hash: location.hash,
        hostname: location.hostname,
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
  branch(({ product, productType }) => !product || !productType, renderNothing),
  withHandlers({
    onToggleContent: ({
      module,
      pluginState,
      setDisappear,
      setIsUnmounting,
      setPluginState,
      setShowingContent,
      showingContent,
    }) => () => {
      if (module.flowType === 'outro' || pluginState === 'closed') return
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')

      if (showingContent) {
        setPluginState('closed')
        timeout.set('hideLauncher', () => setDisappear(true), 22000)
      }

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

      setShowingContent(!showingContent)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  }),
  withChatActions()
)(Plugin)
