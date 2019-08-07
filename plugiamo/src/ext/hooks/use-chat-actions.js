import mixpanel from 'ext/mixpanel'
import { markGoFwd } from 'app/setup/flow-history'
import { clickAssessmentProduct as originalClickAssessmentProduct } from 'special/assessment/utils'
import { useCallback, useMemo, useState } from 'preact/hooks'

const useChatActions = ({ flowType, mergeAssessmentForm }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [videoItem, setVideoItem] = useState(null)
  const [imagesModalOpen, setImagesModalOpen] = useState(false)
  const [imagesModalIndex, setImagesModalIndex] = useState(null)
  const [imagesModalUrls, setImagesModalUrls] = useState([])
  const [imagesModalTouch, setImagesModalTouch] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [imageItem, setImageItem] = useState(null)

  const closeVideoModal = useCallback(() => {
    mixpanel.track('Closed Video', {
      flowType,
      hostname: location.hostname,
      url: videoItem.youtubeUrl,
    })
    setVideoModalOpen(false)
    const frekklsContent = document.querySelector('iframe[title="Frekkls Content"]')
    frekklsContent && setTimeout(() => frekklsContent.focus(), 0)
  }, [flowType, videoItem])

  const closeImageModal = useCallback(() => {
    mixpanel.track('Closed Picture', {
      flowType,
      hostname: location.hostname,
      url: imageItem.url,
    })
    setImageModalOpen(false)
    const frekklsContent = document.querySelector('iframe[title="Frekkls Content"]')
    frekklsContent && setTimeout(() => frekklsContent.focus(), 0)
  }, [flowType, imageItem])

  const modalsProps = useMemo(
    () => ({
      videoModalOpen,
      closeVideoModal,
      videoItem,
      imagesModalOpen,
      imagesModalIndex,
      setImagesModalIndex,
      setImagesModalOpen,
      imagesModalUrls,
      setImagesModalUrls,
      imagesModalTouch,
      setImagesModalTouch,
      imageModalOpen,
      closeImageModal,
      imageItem,
    }),
    [
      videoModalOpen,
      closeVideoModal,
      videoItem,
      imagesModalOpen,
      imagesModalIndex,
      imagesModalUrls,
      imagesModalTouch,
      imageModalOpen,
      closeImageModal,
      imageItem,
    ]
  )

  const clickAssessmentProduct = useCallback(({ item }) => {
    originalClickAssessmentProduct(item)
  }, [])

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
      mixpanel.track('Open Video', {
        flowType,
        hostname: location.hostname,
        url: item.youtubeUrl,
      })
      setVideoItem(item)
      setVideoModalOpen(true)
    },
    [flowType]
  )

  const clickHeaderVideo = useCallback(
    ({ item }) => {
      mixpanel.track('Open Header Video', {
        flowType,
        hostname: location.hostname,
        url: item.youtubeUrl,
      })
      setVideoItem(item)
      setVideoModalOpen(true)
    },
    [flowType]
  )

  const clickImageCarouselItem = useCallback(
    ({ item }) => {
      mixpanel.track('Opened Carousel Gallery', {
        flowType,
        hostname: location.hostname,
        imageUrl: item.urlsArray[item.index],
      })
      setImagesModalIndex(item.index)
      setImagesModalUrls(item.urlsArray)
      setImagesModalOpen(true)
      setImageItem(item.img)
    },
    [flowType]
  )

  const touchImageCarousel = useCallback(() => {
    mixpanel.track('Touched Carousel', {
      flowType,
      hostname: location.hostname,
    })
    setImagesModalTouch(true)
  }, [flowType])

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
      setImageItem(item)
      setImageModalOpen(true)
    },
    [flowType]
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

  return { clickActions, modalsProps }
}

export default useChatActions
