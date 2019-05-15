import mixpanel from 'ext/mixpanel'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { markGoFwd } from 'app/setup/flow-history'
import { clickAssessmentProduct as originalClickAssessmentProduct } from 'special/assessment/utils'

const withChatActions = () => BaseComponent =>
  compose(
    withState('videoModalOpen', 'setVideoModalOpen', false),
    withState('videoItem', 'setVideoItem', null),
    withState('imageModalOpen', 'setImageModalOpen', false),
    withState('imagesModalIndex', 'setImagesModalIndex', null),
    withState('imagesModalUrls', 'setImagesModalUrls', []),
    withState('imagesModalTouch', 'setImagesModalTouch', false),
    withHandlers({
      closeVideoModal: ({ videoItem, setVideoModalOpen }) => () => {
        mixpanel.track('Closed Video', { hostname: location.hostname, url: videoItem.youtubeUrl })
        setVideoModalOpen(false)
      },
    }),
    withProps(
      ({
        videoModalOpen,
        closeVideoModal,
        videoItem,
        imageModalOpen,
        imagesModalIndex,
        setImagesModalIndex,
        setImageModalOpen,
        imagesModalUrls,
        setImagesModalUrls,
        imagesModalTouch,
        setImagesModalTouch,
      }) => ({
        modalsProps: {
          videoModalOpen,
          closeVideoModal,
          videoItem,
          imageModalOpen,
          imagesModalIndex,
          setImagesModalIndex,
          setImageModalOpen,
          imagesModalUrls,
          setImagesModalUrls,
          imagesModalTouch,
          setImagesModalTouch,
        },
      })
    ),
    withHandlers({
      clickAssessmentProduct: () => ({ item }) => {
        originalClickAssessmentProduct(item)
      },
      clickProduct: () => ({ item }) => {
        mixpanel.track('Clicked Product', { hostname: location.hostname, url: item.url }, () => {
          if (item.newTab) return
          markGoFwd()
          window.location.href = item.url
        })
      },
      clickVideoMessage: ({ setVideoModalOpen, setVideoItem }) => ({ item }) => {
        mixpanel.track('Open Video', { hostname: location.hostname, url: item.youtubeUrl })
        setVideoItem(item)
        setVideoModalOpen(true)
      },
      clickHeaderVideo: ({ setVideoModalOpen, setVideoItem }) => ({ item }) => {
        mixpanel.track('Open Header Video', { hostname: location.hostname, url: item.youtubeUrl })
        setVideoItem(item)
        setVideoModalOpen(true)
      },
      clickImageCarouselItem: ({ setImageModalOpen, setImagesModalIndex, setImagesModalUrls }) => ({ item }) => {
        mixpanel.track('Opened Carousel Gallery', { hostname: location.hostname, imageUrl: item.urlsArray[item.index] })
        setImagesModalIndex(item.index)
        setImagesModalUrls(item.urlsArray)
        setImageModalOpen(true)
      },
      touchImageCarousel: ({ setImagesModalTouch }) => () => {
        mixpanel.track('Touched Carousel', { hostname: location.hostname })
        setImagesModalTouch(true)
      },
      clickChatOption: () => ({ item, persona, flowType }) => {
        mixpanel.track('Clicked Chat Option', {
          flowType: flowType || 'simpleChat',
          hostname: location.hostname,
          personaName: persona.name,
          personaRef: persona.id,
          chatOptionText: item.text,
        })
      },
      clickLink: () => ({ item }) => {
        if (item.newTab) return
        markGoFwd()
        window.location.href = item.url
      },
    }),
    withProps(
      ({
        clickAssessmentProduct,
        clickProduct,
        clickVideoMessage,
        clickHeaderVideo,
        clickImageCarouselItem,
        touchImageCarousel,
        clickChatOption,
        clickLink,
      }) => {
        return {
          clickActions: {
            clickAssessmentProduct,
            clickProduct,
            clickVideoMessage,
            clickHeaderVideo,
            clickImageCarouselItem,
            touchImageCarousel,
            clickChatOption,
            clickLink,
          },
        }
      }
    )
  )(BaseComponent)

export default withChatActions
