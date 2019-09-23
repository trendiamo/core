import mixpanel from 'ext/mixpanel'
import { markGoFwd } from 'app/setup/flow-history'
import { clickAssessmentProduct as originalClickAssessmentProduct } from 'special/assessment/utils'
import { useCallback, useMemo } from 'preact/hooks'

const useChatActions = ({ flowType, mergeAssessmentForm, modalProps, setModalProps }) => {
  const clickAssessmentProduct = useCallback(({ item }) => {
    originalClickAssessmentProduct(item)
  }, [])

  const onCloseModal = useCallback(() => {
    setModalProps({})
  }, [setModalProps])

  const clickProduct = useCallback(
    ({ item }) => {
      mixpanel.track(
        'Clicked Product',
        { flowType, hostname: location.hostname, url: item.url, title: item.title },
        () => {
          if (item.newTab) return
          markGoFwd()
          window.location.href = item.url
        }
      )
    },
    [flowType]
  )

  const clickVideoMessage = useCallback(
    ({ item }) => {
      const videoUrl = item.youtubeUrl
      const videoEmbedUrl = item.youtubeEmbedUrl
      mixpanel.track('Open Video', {
        flowType,
        hostname: location.hostname,
        url: videoUrl,
      })
      setModalProps({ type: 'video', videoUrl, videoEmbedUrl, onCloseModal, flowType })
    },
    [flowType, onCloseModal, setModalProps]
  )

  const clickHeaderVideo = useCallback(
    ({ item }) => {
      const videoUrl = item.youtubeUrl
      const videoEmbedUrl = item.youtubeEmbedUrl
      mixpanel.track('Open Header Video', {
        flowType,
        hostname: location.hostname,
        url: videoUrl,
      })
      setModalProps({ type: 'video', videoUrl, videoEmbedUrl, onCloseModal, flowType })
    },
    [flowType, onCloseModal, setModalProps]
  )

  const clickImageCarouselItem = useCallback(
    ({ item }) => {
      mixpanel.track('Opened Carousel Gallery', {
        flowType,
        hostname: location.hostname,
        imageUrl: item.urlsArray[item.index],
      })
      setModalProps({ type: 'images', imageItem: item, onCloseModal, flowType })
    },
    [flowType, onCloseModal, setModalProps]
  )

  const touchImageCarousel = useCallback(() => {
    mixpanel.track('Touched Carousel', {
      flowType,
      hostname: location.hostname,
    })
    setModalProps({ ...modalProps, isTouch: true })
  }, [flowType, modalProps, setModalProps])

  const clickChatOption = useCallback(
    ({ item, seller }) => {
      mixpanel.track('Clicked Chat Option', {
        flowType,
        hostname: location.hostname,
        sellerName: seller.name,
        sellerRef: seller.id,
        chatOptionText: item.text,
      })
    },
    [flowType]
  )

  const clickLink = useCallback(({ item }) => {
    if (item.newTab) return
    markGoFwd()
    window.location.href = item.url
  }, [])

  const clickImageMessage = useCallback(
    ({ item }) => {
      mixpanel.track('Clicked Picture', {
        flowType,
        hostname: location.hostname,
        url: item.url,
      })
      setModalProps({ type: 'image', imageItem: item, onCloseModal, flowType })
    },
    [flowType, onCloseModal, setModalProps]
  )

  const clickActions = useMemo(
    () => ({
      clickAssessmentProduct,
      clickProduct,
      clickVideoMessage,
      clickHeaderVideo,
      clickImageCarouselItem,
      touchImageCarousel,
      clickChatOption,
      clickLink,
      clickImageMessage,
      mergeAssessmentForm,
    }),
    [
      clickAssessmentProduct,
      clickProduct,
      clickVideoMessage,
      clickHeaderVideo,
      clickImageCarouselItem,
      touchImageCarousel,
      clickChatOption,
      clickLink,
      clickImageMessage,
      mergeAssessmentForm,
    ]
  )

  return { clickActions }
}

export default useChatActions
