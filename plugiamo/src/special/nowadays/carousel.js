import Modal from 'shared/modal'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
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
  withHandlers({
    closeModal: ({ setIsOpen }) => () => {
      setIsOpen(false)
    },
    openModal: ({ setIsOpen, setSelectedImage }) => event => {
      setSelectedImage(event.target.src)
      setIsOpen(true)
    },
  })
)(({ openModal, isOpen, closeModal, imageCarousel, selectedImage }) => (
  <div>
    <Modal closeModal={closeModal} isOpen={isOpen}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
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
            width: '80%',
            height: '80%',
            objectFit: 'contain',
          }}
        />
      </div>
    </Modal>
    <Carousel>
      {imageCarousel.map(imgObj => (
        <CarouselPic key={imgObj.picUrl} onClick={openModal}>
          <img alt="" src={imgObj.picUrl} />
        </CarouselPic>
      ))}
    </Carousel>
  </div>
))

export default ImgCarouselMessage
