import LeftArrowIcon from 'icons/left-arrow.svg'
import Modal from 'shared/modal'
import RightArrowIcon from 'icons/right-arrow.svg'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const Carousel = styled.div`
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  margin-left: -13px;
  margin-right: -13px;
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

const ImgCarouselMessage = compose(
  withState('selectedImage', 'setSelectedImage', false),
  withState('isOpen', 'setIsOpen', false),
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
    openModal: ({ setIsOpen, setSelectedImage }) => event => {
      setSelectedImage(event.target.src)
      setIsOpen(true)
    },
    onLeftArrowClick: ({ selectedImageIndex, urlsArray, setSelectedImage }) => () => {
      0 < selectedImageIndex && setSelectedImage(urlsArray[selectedImageIndex - 1])
    },
    onRightArrowClick: ({ selectedImageIndex, urlsArray, setSelectedImage }) => () => {
      selectedImageIndex < urlsArray.length - 1 && setSelectedImage(urlsArray[selectedImageIndex + 1])
    },
  })
)(
  ({
    selectedImageIndex,
    urlsArray,
    onRightArrowClick,
    onLeftArrowClick,
    openModal,
    isOpen,
    closeModal,
    selectedImage,
  }) => (
    <div>
      <Modal allowBackgroundClose={false} closeModal={closeModal} isOpen={isOpen}>
        <button
          onClick={onLeftArrowClick}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '50%',
            zIndex: '1234000000',
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            outline: 0,
            cursor: 0 < selectedImageIndex ? 'pointer' : 'default',
          }}
          type="button"
        >
          <LeftArrowIcon
            onClick={onLeftArrowClick}
            style={{
              display: 0 < selectedImageIndex ? 'block' : 'none',
              fill: '#fff',
              width: '42px',
              height: '42px',
              position: 'absolute',
              left: '40px',
              top: '50vh',
              zIndex: '12340000004',
              cursor: 'pointer',
            }}
          />
        </button>
        <button
          onClick={onRightArrowClick}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100vh',
            width: '50%',
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            outline: 0,
            zIndex: '1234000000',
            cursor: 0 < selectedImageIndex < urlsArray.length - 1 ? 'pointer' : 'default',
          }}
          type="button"
        >
          <RightArrowIcon
            onClick={onRightArrowClick}
            style={{
              display: 0 < selectedImageIndex < urlsArray.length - 1 ? 'block' : 'none',
              fill: '#fff',
              width: '42px',
              height: '42px',
              position: 'absolute',
              right: '40px',
              top: '50vh',
              zIndex: '12340000004',
              cursor: 'pointer',
            }}
          />
        </button>
        <div
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
          <CarouselPic key={imgUrl} onClick={openModal}>
            <img alt="" src={imgUrl} />
          </CarouselPic>
        ))}
      </Carousel>
    </div>
  )
)

export default ImgCarouselMessage
