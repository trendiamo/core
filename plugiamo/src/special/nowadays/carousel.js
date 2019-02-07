import CarouselModalArrows from './carousel-modal-arrows'
import Modal from 'shared/modal'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const Carousel = styled.div`
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  margin-left: -16px;
  margin-right: -16px;
  margin-bottom: 5px;
  min-height: 260px;
`
const CarouselPic = styled.div`
  margin: 0 5px;
  max-height: 260px;
  min-width: 260px;

  &:hover {
    cursor: pointer;
  }
  &:first-child {
    padding-left: 10px;
    min-width: 270px;
  }

  &:last-child {
    padding-right: 10px;
    min-width: 270px;
  }

  img {
    border-radius: 12px;
    width: 100%;
    max-height: 260px;
    object-fit: cover;
  }
`

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
    closeModal: ({ setIsOpen }) => () => {
      setIsOpen(false)
    },
    openModal: ({ setOriginalWindowWidth, setIsOpen, setSelectedImage }) => event => {
      setOriginalWindowWidth(window.innerWidth)
      setSelectedImage(event.target.src)
      setIsOpen(true)
    },
    onLeftArrowClick: ({ selectedImageIndex, urlsArray, setSelectedImage }) => () => {
      0 < selectedImageIndex && setSelectedImage(urlsArray[selectedImageIndex - 1])
    },
    onRightArrowClick: ({ selectedImageIndex, urlsArray, setSelectedImage }) => () => {
      selectedImageIndex < urlsArray.length - 1 && setSelectedImage(urlsArray[selectedImageIndex + 1])
    },
    handleIsTouch: ({ setIsTouch }) => () => {
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
    }) => event => {
      if (isTwoFingerScroll || originalWindowWidth > window.innerWidth) return
      touchendX = event.changedTouches[0].screenX
      touchendY = event.changedTouches[0].screenY
      switch (handleGesure(touchstartX, touchstartY, touchendX, touchendY)) {
        case 'right':
          {
            selectedImageIndex < urlsArray.length - 1 && setSelectedImage(urlsArray[selectedImageIndex + 1])
          }
          break
        case 'left': {
          0 < selectedImageIndex && setSelectedImage(urlsArray[selectedImageIndex - 1])
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
            bottom: 0,
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
      <Carousel>
        {urlsArray.map(imgUrl => (
          <CarouselPic key={imgUrl} onClick={openModal} onTouchEnd={handleIsTouch}>
            <img alt="" src={imgUrl} />
          </CarouselPic>
        ))}
      </Carousel>
    </div>
  )
)

export default ImgCarouselMessage
