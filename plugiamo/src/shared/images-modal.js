import CarouselModalArrows from './carousel-modal-arrows'
import mixpanel from 'ext/mixpanel'
import Modal from 'shared/modal'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

let touchstartX = 0
let touchstartY = 0
let touchendX = 0
let touchendY = 0

const handleGesture = (touchstartX, touchstartY, touchendX, touchendY) => {
  if (touchendX < touchstartX) {
    return 'right'
  }
  if (touchendX > touchstartX) {
    return 'left'
  }
  if (touchendY === touchstartY) {
    return 'Tap'
  }
}

const ImagesModalTemplate = ({
  selectedImageIndex,
  urlsArray,
  onRightArrowClick,
  onLeftArrowClick,
  onTouchStart,
  isOpen,
  closeModal,
  selectedImage,
  onTouchEnd,
  isTouch,
  isPictureLoaded,
  onPictureLoad,
}) => (
  <div>
    <Modal allowBackgroundClose={false} closeModal={closeModal} isOpen={isOpen} isResourceLoaded={isPictureLoaded}>
      {!isTouch && (
        <CarouselModalArrows
          onLeftArrowClick={onLeftArrowClick}
          onRightArrowClick={onRightArrowClick}
          selectedImageIndex={selectedImageIndex}
          urlsArray={urlsArray}
        />
      )}
      <div
        onTouchEnd={onTouchEnd}
        onTouchStart={onTouchStart}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 50,
          left: 0,
        }}
      >
        <img
          alt=""
          onLoad={onPictureLoad}
          src={selectedImage}
          style={{
            opacity: isPictureLoaded ? 1 : 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </Modal>
  </div>
)

const ImagesModal = compose(
  withState('isTwoFingerScroll', 'setIsTwoFingerScroll', false),
  withState('selectedImage', 'setSelectedImage', null),
  withState('selectedImageIndex', 'setSelectedImageIndex', 0),
  withState('originalWindowWidth', 'setOriginalWindowWidth', window.innerWidth),
  withState('isPictureLoaded', 'setIsPictureLoaded', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { setSelectedImageIndex, index, isOpen } = this.props
      if (prevProps.index !== index) {
        setSelectedImageIndex(index)
      }
      if (prevProps.isOpen !== isOpen) {
        setSelectedImageIndex(index)
      }
    },
  }),
  withProps(({ selectedImageIndex, urlsArray }) => ({
    selectedImage: urlsArray[selectedImageIndex],
  })),
  withHandlers({
    closeModal: ({ setIsOpen, selectedImage, flowType }) => () => {
      mixpanel.track('Closed Carousel Gallery', {
        flowType: flowType || 'simpleChat',
        hostname: location.hostname,
        imageUrl: selectedImage,
      })
      setIsOpen(false)
    },
    onPictureLoad: ({ setIsPictureLoaded }) => () => {
      setIsPictureLoaded(true)
    },
    onLeftArrowClick: ({
      selectedImageIndex,
      urlsArray,
      setSelectedImageIndex,
      selectedImage,
      flowType,
      setIsPictureLoaded,
    }) => () => {
      if (selectedImageIndex === 0) return
      setIsPictureLoaded(false)
      setSelectedImageIndex(selectedImageIndex - 1)
      mixpanel.track('Carousel Image Switch', {
        flowType: flowType || 'simpleChat',
        hostname: location.hostname,
        urlFrom: selectedImage,
        urlTo: urlsArray[selectedImageIndex - 1],
      })
    },
    onRightArrowClick: ({
      selectedImageIndex,
      urlsArray,
      setSelectedImageIndex,
      selectedImage,
      flowType,
      setIsPictureLoaded,
    }) => () => {
      if (selectedImageIndex >= urlsArray.length - 1) return
      setIsPictureLoaded(false)
      setSelectedImageIndex(selectedImageIndex + 1)
      mixpanel.track('Carousel Image Switch', {
        flowType: flowType || 'simpleChat',
        hostname: location.hostname,
        urlFrom: selectedImage,
        urlTo: urlsArray[selectedImageIndex + 1],
      })
    },
    onTouchStart: ({ setIsTwoFingerScroll }) => event => {
      setIsTwoFingerScroll(1 < event.touches.length)
      touchstartX = event.changedTouches[0].screenX
      touchstartY = event.changedTouches[0].screenY
    },
    onTouchEnd: ({
      originalWindowWidth,
      isTwoFingerScroll,
      selectedImageIndex,
      urlsArray,
      setSelectedImageIndex,
      selectedImage,
      flowType,
      setIsPictureLoaded,
    }) => event => {
      if (isTwoFingerScroll || originalWindowWidth > window.innerWidth) return
      touchendX = event.changedTouches[0].screenX
      touchendY = event.changedTouches[0].screenY
      switch (handleGesture(touchstartX, touchstartY, touchendX, touchendY)) {
        case 'right':
          {
            if (selectedImageIndex < urlsArray.length - 1) {
              setSelectedImageIndex(selectedImageIndex + 1)
              mixpanel.track('Touch Carousel Image Switch', {
                flowType: flowType || 'simpleChat',
                hostname: location.hostname,
                urlFrom: selectedImage,
                urlTo: urlsArray[selectedImageIndex + 1],
              })
            }
          }
          break
        case 'left': {
          if (0 < selectedImageIndex) {
            setSelectedImageIndex(selectedImageIndex - 1)
            mixpanel.track('Touch Carousel Image Switch', {
              flowType: flowType || 'simpleChat',
              hostname: location.hostname,
              urlFrom: selectedImage,
              urlTo: urlsArray[selectedImageIndex - 1],
            })
          }
        }
      }
      setIsPictureLoaded(false)
    },
  })
)(ImagesModalTemplate)

export default ImagesModal
