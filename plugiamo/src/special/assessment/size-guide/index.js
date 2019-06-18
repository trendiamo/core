import AppBase from 'app/base'
import blacklistTags from './blacklist-tags'
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data from 'special/assessment/data/pierre-cardin'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import useChatActions from 'ext/hooks/use-chat-actions'
import { fetchProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const Plugin = ({ setShowingContent, showingBubbles, showingContent, showingLauncher }) => {
  const [pluginState, setPluginState] = useState('default')
  const [product, setProduct] = useState(null)
  const [productType, setProductType] = useState(null)
  const [isUnmounting, setIsUnmounting] = useState(false)
  const [disappear, setDisappear] = useState(false)

  const module = useMemo(
    () => ({
      ...data.sizeGuide,
      launcher: pluginState === 'closed' ? data.sizeGuide.closedLauncher : data.sizeGuide.launcher,
      simpleChat: { simpleChatSteps: data.sizeGuide.steps[productType] },
    }),
    [pluginState, productType]
  )

  const { clickActions, modalsProps } = useChatActions('asmt-size-guide')

  useEffect(() => {
    fetchProducts().then(results => {
      const pathArray = location.pathname.split('/')
      const id = pathArray[pathArray.length - 1]
      const products = results.find(item => item.hostname === 'www.pierre-cardin.de').products
      const product = products.find(item => item.id === id && !blacklistTags.includes(item.tag))
      setProduct(product)
      if (!product) return
      const foundKey = Object.keys(data.sizeGuide.tagSizeGuides).find(item => product.tag.includes(item))
      if (!foundKey) return
      setProductType(data.sizeGuide.tagSizeGuides[foundKey])
      mixpanel.track('Loaded Plugin', {
        flowType: 'asmt-size-guide',
        hash: location.hash,
        hostname: location.hostname,
      })
    })
  }, [])

  const onToggleContent = useCallback(() => {
    if (pluginState === 'closed') return
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
  }, [pluginState, setShowingContent, showingContent])

  if (!product || !productType || !data.sizeGuide.steps[productType]) return null

  return (
    <div>
      <ChatModals flowType="asmt-size-guide" {...modalsProps} />
      <AppBase
        Component={
          <SimpleChat
            backButtonLabel={getFrekklsConfig().i18n.backButton}
            ChatBase={ChatBase}
            chatBaseProps={{ assessment: true }}
            clickActions={clickActions}
            data={module}
          />
        }
        data={module}
        disappear={disappear}
        isUnmounting={isUnmounting}
        onToggleContent={onToggleContent}
        persona={module.launcher.persona}
        pluginState={pluginState}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    </div>
  )
}

export default Plugin
