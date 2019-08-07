import CarouselModalArrows from './carousel-modal-arrows'
import mixpanel from 'ext/mixpanel'
import Modal from 'shared/modal'
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

const ImagesModal = ({ flowType, index, isOpen, isTouch, imageItem, setIsOpen, urlsArray }) => {
  const [isTwoFingerScroll, setIsTwoFingerScroll] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    setSelectedImageIndex(index)
  }, [index, isOpen])

  const originalWindowWidth = useMemo(() => window.innerWidth, [])

  const selectedImage = useMemo(
    () => ({
      url: urlsArray[selectedImageIndex],
      imgRect: imageItem && imageItem.imgRect,
    }),
    [imageItem, selectedImageIndex, urlsArray]
  )

  const closeModal = useCallback(() => {
    mixpanel.track('Closed Carousel Gallery', {
      flowType: flowType || 'simpleChat',
      hostname: location.hostname,
      imageUrl: selectedImage && selectedImage.url,
    })
    setIsOpen(false)
    const frekklsContent = document.querySelector('iframe[title="Frekkls Content"]')
    frekklsContent && setTimeout(() => frekklsContent.focus(), 0)
  }, [flowType, selectedImage, setIsOpen])

  const onImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  const onLeftArrowClick = useCallback(() => {
    if (selectedImageIndex === 0) return
    if (selectedImage.url !== urlsArray[selectedImageIndex - 1]) setIsImageLoaded(false)
    setSelectedImageIndex(selectedImageIndex - 1)
    mixpanel.track('Carousel Image Switch', {
      flowType: flowType || 'simpleChat',
      hostname: location.hostname,
      urlFrom: selectedImage && selectedImage.url,
      urlTo: urlsArray[selectedImageIndex - 1],
    })
  }, [flowType, selectedImage, selectedImageIndex, urlsArray])

  const onRightArrowClick = useCallback(() => {
    if (selectedImageIndex >= urlsArray.length - 1) return
    if (selectedImage.url !== urlsArray[selectedImageIndex + 1]) setIsImageLoaded(false)
    setSelectedImageIndex(selectedImageIndex + 1)
    mixpanel.track('Carousel Image Switch', {
      flowType: flowType || 'simpleChat',
      hostname: location.hostname,
      urlFrom: selectedImage && selectedImage.url,
      urlTo: urlsArray[selectedImageIndex + 1],
    })
  }, [flowType, selectedImage, selectedImageIndex, urlsArray])

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
            if (selectedImageIndex < urlsArray.length - 1) {
              setSelectedImageIndex(selectedImageIndex + 1)
              mixpanel.track('Touch Carousel Image Switch', {
                flowType: flowType || 'simpleChat',
                hostname: location.hostname,
                urlFrom: selectedImage && selectedImage.url,
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
              urlFrom: selectedImage && selectedImage.url,
              urlTo: urlsArray[selectedImageIndex - 1],
            })
          }
        }
      }
      setIsImageLoaded(false)
    },
    [flowType, isTwoFingerScroll, selectedImage, originalWindowWidth, selectedImageIndex, urlsArray]
  )

  return (
    <div>
      <Modal allowBackgroundClose={false} closeModal={closeModal} isOpen={isOpen} isResourceLoaded={isImageLoaded}>
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
            onLoad={onImageLoad}
            src={
              selectedImage &&
              selectedImage.url &&
              imgixUrl(selectedImage.url, {
                rect: stringifyRect(selectedImage.imgRect),
              })
            }
            style={{
              opacity: isImageLoaded ? 1 : 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default ImagesModal
