import CarouselModalArrows from './carousel-modal-arrows'
import mixpanel from 'ext/mixpanel'
import Modal from 'shared/modal'
import { Carousel, CarouselElement } from './carousel'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { parse, stringify } from 'query-string'

let touchstartX = 0
let touchstartY = 0
let touchendX = 0
let touchendY = 0

const handleGesure = (touchstartX, touchstartY, touchendX, touchendY) => {
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

const imgixUrl = imgUrl => {
  const urlArray = imgUrl.split('?')
  const paramsToAdd = {
    fit: 'crop',
    'max-w': 260,
    'max-h': 260,
  }
  if (urlArray.length < 2) return `${urlArray[0]}?${stringify(paramsToAdd)}`
  return `${urlArray[0]}?${stringify({ ...parse(urlArray[1]), ...paramsToAdd })}`
}

const ImgCarouselMessage = compose(
  withState('selectedImage', 'setSelectedImage', false),
  withState('isOpen', 'setIsOpen', false),
  withState('isTouch', 'setIsTouch', false),
  withState('isTwoFingerScroll', 'setIsTwoFingerScroll', false),
  withState('originalWindowWidth', 'setOriginalWindowWidth', window.innerWidth),
  withProps(({ imageCarousel }) => ({
    urlsArray: imageCarousel.map(image => image.picUrl),
  })),
  withProps(({ selectedImage, urlsArray }) => ({
    selectedImageIndex: urlsArray.indexOf(selectedImage),
  })),
  withHandlers({
    closeModal: ({ setIsOpen, selectedImage }) => () => {
      mixpanel.track('Closed Carousel Gallery', { hostname: location.hostname, imageUrl: selectedImage })
      setIsOpen(false)
    },
    openModal: ({ setOriginalWindowWidth, setIsOpen, setSelectedImage, urlsArray }) => index => () => {
      mixpanel.track('Opened Carousel Gallery', { hostname: location.hostname, imageUrl: urlsArray[index] })
      setOriginalWindowWidth(window.innerWidth)
      setSelectedImage(urlsArray[index])
      setIsOpen(true)
    },
    onLeftArrowClick: ({ selectedImageIndex, urlsArray, setSelectedImage, selectedImage }) => () => {
      if (selectedImageIndex === 0) return
      setSelectedImage(urlsArray[selectedImageIndex - 1])
      mixpanel.track('Carousel Image Switch', {
        hostname: location.hostname,
        urlFrom: selectedImage,
        urlTo: urlsArray[selectedImageIndex - 1],
      })
    },
    onRightArrowClick: ({ selectedImageIndex, urlsArray, setSelectedImage, selectedImage }) => () => {
      if (selectedImageIndex >= urlsArray.length - 1) return
      setSelectedImage(urlsArray[selectedImageIndex + 1])
      mixpanel.track('Carousel Image Switch', {
        hostname: location.hostname,
        urlFrom: selectedImage,
        urlTo: urlsArray[selectedImageIndex + 1],
      })
    },
    handleIsTouch: ({ setIsTouch }) => () => {
      mixpanel.track('Touched Carousel', { hostname: location.hostname })
      setIsTouch(true)
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
      setSelectedImage,
      selectedImage,
    }) => event => {
      if (isTwoFingerScroll || originalWindowWidth > window.innerWidth) return
      touchendX = event.changedTouches[0].screenX
      touchendY = event.changedTouches[0].screenY
      switch (handleGesure(touchstartX, touchstartY, touchendX, touchendY)) {
        case 'right':
          {
            if (selectedImageIndex < urlsArray.length - 1) {
              setSelectedImage(urlsArray[selectedImageIndex + 1])
              mixpanel.track('Touch Carousel Image Switch', {
                hostname: location.hostname,
                urlFrom: selectedImage,
                urlTo: urlsArray[selectedImageIndex + 1],
              })
            }
          }
          break
        case 'left': {
          if (0 < selectedImageIndex) {
            setSelectedImage(urlsArray[selectedImageIndex - 1])
            mixpanel.track('Touch Carousel Image Switch', {
              hostname: location.hostname,
              urlFrom: selectedImage,
              urlTo: urlsArray[selectedImageIndex - 1],
            })
          }
        }
      }
    },
  })
)(
  ({
    selectedImageIndex,
    urlsArray,
    onRightArrowClick,
    onLeftArrowClick,
    handleIsTouch,
    isTouch,
    onTouchStart,
    openModal,
    isOpen,
    closeModal,
    selectedImage,
    carouselType,
    onTouchEnd,
  }) => (
    <div>
      <Modal allowBackgroundClose={false} closeModal={closeModal} isOpen={isOpen}>
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
            src={selectedImage}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </Modal>
      <Carousel carouselType={carouselType}>
        {urlsArray.map((imgUrl, index) => (
          <CarouselElement
            carouselType={carouselType}
            key={imgUrl}
            onClick={openModal(index)}
            onTouchEnd={handleIsTouch}
          >
            <img alt="" src={imgixUrl(imgUrl)} />
          </CarouselElement>
        ))}
      </Carousel>
    </div>
  )
)

export default ImgCarouselMessage
