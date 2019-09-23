import CarouselModalArrows from './carousel-modal-arrows'
import mixpanel from 'ext/mixpanel'
import Modal from 'shared/modal'
import styled from 'styled-components'
import { h } from 'preact'
import { imgixUrl, stringifyRect } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

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

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 50;
  left: 0;
`

const Img = styled.img`
  opacity: ${({ isImageLoaded }) => (isImageLoaded ? 1 : 0)};
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ImagesModal = ({ closeModal, flowType, isTouch, imageItem }) => {
  const [isTwoFingerScroll, setIsTwoFingerScroll] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    setSelectedImageIndex(imageItem.index)
  }, [imageItem.index])

  const originalWindowWidth = useMemo(() => window.innerWidth, [])

  const selectedImage = useMemo(
    () => ({
      url: imageItem.urlsArray[selectedImageIndex],
      imgRect: imageItem.img && imageItem.img.imgRect,
    }),
    [imageItem.img, imageItem.urlsArray, selectedImageIndex]
  )

  const newCloseModal = useCallback(() => {
    mixpanel.track('Closed Carousel Gallery', {
      flowType: flowType || 'simpleChat',
      hostname: location.hostname,
      imageUrl: selectedImage && selectedImage.url,
    })
    closeModal()
  }, [closeModal, flowType, selectedImage])

  const onImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  const onLeftArrowClick = useCallback(() => {
    if (selectedImageIndex === 0) return
    if (selectedImage.url !== imageItem.urlsArray[selectedImageIndex - 1]) setIsImageLoaded(false)
    setSelectedImageIndex(selectedImageIndex - 1)
    mixpanel.track('Carousel Image Switch', {
      flowType: flowType || 'simpleChat',
      hostname: location.hostname,
      urlFrom: selectedImage && selectedImage.url,
      urlTo: imageItem.urlsArray[selectedImageIndex - 1],
    })
  }, [flowType, imageItem.urlsArray, selectedImage, selectedImageIndex])

  const onRightArrowClick = useCallback(() => {
    if (selectedImageIndex >= imageItem.urlsArray.length - 1) return
    if (selectedImage.url !== imageItem.urlsArray[selectedImageIndex + 1]) setIsImageLoaded(false)
    setSelectedImageIndex(selectedImageIndex + 1)
    mixpanel.track('Carousel Image Switch', {
      flowType: flowType || 'simpleChat',
      hostname: location.hostname,
      urlFrom: selectedImage && selectedImage.url,
      urlTo: imageItem.urlsArray[selectedImageIndex + 1],
    })
  }, [flowType, imageItem.urlsArray, selectedImage, selectedImageIndex])

  const onTouchStart = useCallback(event => {
    setIsTwoFingerScroll(1 < event.touches.length)
    touchstartX = event.changedTouches[0].screenX
    touchstartY = event.changedTouches[0].screenY
  }, [])

  const onTouchEnd = useCallback(
    event => {
      if (isTwoFingerScroll || originalWindowWidth > window.innerWidth) return
      touchendX = event.changedTouches[0].screenX
      touchendY = event.changedTouches[0].screenY
      switch (handleGesture(touchstartX, touchstartY, touchendX, touchendY)) {
        case 'right':
          {
            if (selectedImageIndex < imageItem.urlsArray.length - 1) {
              setSelectedImageIndex(selectedImageIndex + 1)
              mixpanel.track('Touch Carousel Image Switch', {
                flowType: flowType || 'simpleChat',
                hostname: location.hostname,
                urlFrom: selectedImage && selectedImage.url,
                urlTo: imageItem.urlsArray[selectedImageIndex + 1],
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
              urlFrom: selectedImage && selectedImage.url,
              urlTo: imageItem.urlsArray[selectedImageIndex - 1],
            })
          }
        }
      }
      setIsImageLoaded(false)
    },
    [isTwoFingerScroll, originalWindowWidth, selectedImageIndex, imageItem.urlsArray, flowType, selectedImage]
  )

  const src = useMemo(
    () =>
      selectedImage &&
      selectedImage.url &&
      imgixUrl(selectedImage.url, {
        rect: stringifyRect(selectedImage.imgRect),
      }),
    [selectedImage]
  )

  return (
    <Modal allowBackgroundClose={false} closeModal={newCloseModal} isResourceLoaded={isImageLoaded}>
      {!isTouch && (
        <CarouselModalArrows
          onLeftArrowClick={onLeftArrowClick}
          onRightArrowClick={onRightArrowClick}
          selectedImageIndex={selectedImageIndex}
          urlsArray={imageItem.urlsArray}
        />
      )}
      <ImgContainer onTouchEnd={onTouchEnd} onTouchStart={onTouchStart}>
        <Img alt="" isImageLoaded={isImageLoaded} onLoad={onImageLoad} src={src} />
      </ImgContainer>
    </Modal>
  )
}

export default ImagesModal
