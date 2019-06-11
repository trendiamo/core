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
    withState('pictureModalOpen', 'setPictureModalOpen', false),
    withState('pictureItem', 'setPictureItem', null),
    withHandlers({
      closeVideoModal: ({ videoItem, setVideoModalOpen, module }) => () => {
        mixpanel.track('Closed Video', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
          url: videoItem.youtubeUrl,
        })
        setVideoModalOpen(false)
      },
      closePictureModal: ({ module, pictureItem, setPictureModalOpen }) => () => {
        mixpanel.track('Closed Picture', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
          url: pictureItem.url,
        })
        setPictureModalOpen(false)
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
        pictureModalOpen,
        closePictureModal,
        pictureItem,
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
          pictureModalOpen,
          closePictureModal,
          pictureItem,
        },
      })
    ),
    withHandlers({
      clickAssessmentProduct: () => ({ item }) => {
        originalClickAssessmentProduct(item)
      },
      clickProduct: ({ module }) => ({ item }) => {
        mixpanel.track(
          'Clicked Product',
          { flowType: (module && module.flowType) || 'simpleChat', hostname: location.hostname, url: item.url },
          () => {
            if (item.newTab) return
            markGoFwd()
            window.location.href = item.url
          }
        )
      },
      clickVideoMessage: ({ setVideoModalOpen, setVideoItem, module }) => ({ item }) => {
        mixpanel.track('Open Video', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
          url: item.youtubeUrl,
        })
        setVideoItem(item)
        setVideoModalOpen(true)
      },
      clickHeaderVideo: ({ setVideoModalOpen, setVideoItem, module }) => ({ item }) => {
        mixpanel.track('Open Header Video', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
          url: item.youtubeUrl,
        })
        setVideoItem(item)
        setVideoModalOpen(true)
      },
      clickImageCarouselItem: ({
        setImageModalOpen,
        setImagesModalIndex,
        setImagesModalUrls,
        module,
        setPictureItem,
      }) => ({ item }) => {
        mixpanel.track('Opened Carousel Gallery', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
          imageUrl: item.urlsArray[item.index],
        })
        setImagesModalIndex(item.index)
        setImagesModalUrls(item.urlsArray)
        setImageModalOpen(true)
        setPictureItem(item.picture)
      },
      touchImageCarousel: ({ setImagesModalTouch, module }) => () => {
        mixpanel.track('Touched Carousel', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
        })
        setImagesModalTouch(true)
      },
      clickChatOption: ({ module }) => ({ item, persona }) => {
        mixpanel.track('Clicked Chat Option', {
          flowType: (module && module.flowType) || 'simpleChat',
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
      clickPictureMessage: ({ module, setPictureItem, setPictureModalOpen }) => ({ item }) => {
        mixpanel.track('Clicked Picture', {
          flowType: (module && module.flowType) || 'simpleChat',
          hostname: location.hostname,
          url: item.url,
        })
        setPictureItem(item)
        setPictureModalOpen(true)
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
        clickPictureMessage,
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
            clickPictureMessage,
          },
        }
      }
    )
  )(BaseComponent)

export default withChatActions
