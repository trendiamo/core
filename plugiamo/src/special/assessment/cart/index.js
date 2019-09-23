import AppBase from 'app/base'
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import useChatActions from 'ext/hooks/use-chat-actions'
import { fetchProducts, recommendedProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout } from 'plugin-base'
import { useCallback, useEffect, useState } from 'preact/hooks'

const Plugin = ({
  cart,
  modalProps,
  setModalProps,
  setShowingContent,
  showingBubbles,
  showingContent,
  showingLauncher,
  suggestions,
}) => {
  const [products, setProducts] = useState([])
  const [isUnmounting, setIsUnmounting] = useState(false)

  const { clickActions } = useChatActions({ flowType: cart.flowType, modalProps, setModalProps })

  useEffect(() => {
    fetchProducts().then(results => {
      const products = recommendedProducts({ results, suggestions })
      if (products.assessmentProducts.length === 0) return
      setProducts(products)
      mixpanel.track('Loaded Plugin', {
        autoOpen: false,
        flowType: cart.flowType,
        hash: location.hash,
        hostname: location.hostname,
      })
    })
  }, [cart.flowType, suggestions])

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
      <ChatModals {...modalProps} />
      <AppBase
        Component={
          <SimpleChat
            backButtonLabel={getFrekklsConfig().i18n.backButton}
            ChatBase={ChatBase}
            chatBaseProps={{ assessment: true }}
            clickActions={clickActions}
            data={cart}
            lazyLoadingCount={6}
            products={products}
          />
        }
        data={cart}
        isUnmounting={isUnmounting}
        onToggleContent={onToggleContent}
        seller={cart.launcher.seller}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    </div>
  )
}

export default Plugin
