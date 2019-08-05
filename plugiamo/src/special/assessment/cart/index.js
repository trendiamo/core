import AppBase from 'app/base'
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data from 'special/assessment/data/pierre-cardin'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import useChatActions from 'ext/hooks/use-chat-actions'
import { fetchProducts, recommendedProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout } from 'plugin-base'
import { useCallback, useEffect, useState } from 'preact/hooks'

const module = data.cart

const Plugin = ({ setShowingContent, showingBubbles, showingContent, showingLauncher }) => {
  const [products, setProducts] = useState([])
  const [isUnmounting, setIsUnmounting] = useState(false)

  const { clickActions, modalsProps } = useChatActions({ flowType: module.flowType })

  useEffect(() => {
    fetchProducts().then(results => {
      const products = recommendedProducts(results)
      if (products.assessmentProducts.length === 0) return
      setProducts(products)
      mixpanel.track('Loaded Plugin', {
        autoOpen: false,
        flowType: module.flowType,
        hash: location.hash,
        hostname: location.hostname,
      })
    })
  }, [])

  const onToggleContent = useCallback(() => {
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
  }, [setShowingContent, showingContent])

  if (products.length === 0) return null

  return (
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
            lazyLoadingCount={6}
            products={products}
          />
        }
        data={module}
        isUnmounting={isUnmounting}
        onToggleContent={onToggleContent}
        seller={module.launcher.seller}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    </div>
  )
}

export default Plugin
