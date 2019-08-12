import ImageModal from 'shared/image-modal'
import ImagesModal from 'shared/images-modal'
import mixpanel from 'ext/mixpanel'
import VideoModal from 'shared/video-modal'
import { h } from 'preact'
import { markGoFwd } from 'app/setup/flow-history'
import { clickAssessmentProduct as originalClickAssessmentProduct } from 'special/assessment/utils'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const useChatActions = ({ flowType, mergeAssessmentForm, setModalProps }) => {
  const [ModalComponent, setModalComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  useEffect(() => {
    setModalProps &&
      setModalProps({
        closeModal,
        isModalOpen,
        ModalComponent,
        setIsModalOpen,
        setModalComponent,
      })
  }, [closeModal, isModalOpen, setModalProps, ModalComponent])

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
      setModalComponent(<VideoModal closeModal={closeModal} flowType={flowType} url={item && item.youtubeEmbedUrl} />)
      setIsModalOpen(true)
    },
    [closeModal, flowType]
  )

  const clickHeaderVideo = useCallback(
    ({ item }) => {
      mixpanel.track('Open Header Video', {
        flowType,
        hostname: location.hostname,
        url: item.youtubeUrl,
      })
      setModalComponent(<VideoModal closeModal={closeModal} flowType={flowType} url={item && item.youtubeUrl} />)
      setIsModalOpen(true)
    },
    [closeModal, flowType]
  )

  const clickImageCarouselItem = useCallback(
    ({ item }) => {
      mixpanel.track('Opened Carousel Gallery', {
        flowType,
        hostname: location.hostname,
        imageUrl: item.urlsArray[item.index],
      })
      setModalComponent(<ImagesModal closeModal={closeModal} flowType={flowType} imageItem={item} isTouch={isTouch} />)
      setIsModalOpen(true)
    },
    [closeModal, flowType, isTouch]
  )

  const touchImageCarousel = useCallback(() => {
    mixpanel.track('Touched Carousel', {
      flowType,
      hostname: location.hostname,
    })
    setIsTouch(true)
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
      setModalComponent(<ImageModal closeModal={closeModal} flowType={flowType} imageItem={item} />)
      setIsModalOpen(true)
    },
    [closeModal, flowType]
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
