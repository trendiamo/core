import ActionsBar from 'collection/actions-bar'
import React from 'react'
import ReactSwipe from 'react-swipe'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 130%;
  background-image: url(${({ url }) => url});
  background-color: gray;
  background-size: cover;
  background-position: bottom center;
  &::after {
    content: ' ';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    box-shadow: inset 0 -160px 160px -160px #000000;
  }
`

const Thumbnails = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 80px;
    height: 80px;
    margin-left: 8px;
    margin-right: 8px;
    text-align: center;
  }
`

const ThumbnailImg = styled.img`
  border: 2px solid ${({ isSelected }) => (isSelected ? '#555' : 'transparent')};
  height: 100%;
  object-fit: cover;
`

const ThumbnailImage = compose(
  withProps(({ image, selectedImage }) => ({
    isSelected: image === selectedImage,
  })),
  withHandlers({
    onSlideTo: ({ index, onSlideTo }) => () => onSlideTo(index),
  })
)(({ isSelected, image, onSlideTo }) => (
  <div>
    <ThumbnailImg alt="thumbnail" isSelected={isSelected} onClick={onSlideTo} src={image} />
  </div>
))

const StyledDiv = styled.div`
  position: relative;
`

const Pictures = ({ handleSwipe, images, onSlideTo, onToggleLike, product, selectedImage, setReactSwipeRef }) => (
  <React.Fragment>
    <StyledDiv>
      <ReactSwipe ref={setReactSwipeRef} swipeOptions={{ callback: handleSwipe, continuous: false }}>
        {images.map(image => (
          <div key={image}>
            <ImageContainer url={image} />
          </div>
        ))}
      </ReactSwipe>
      <ActionsBar onToggleLike={onToggleLike} product={product} showAddToCart={false} viewType="list" />
    </StyledDiv>
    <Thumbnails>
      {images.map((image, index) => (
        <ThumbnailImage image={image} index={index} key={image} onSlideTo={onSlideTo} selectedImage={selectedImage} />
      ))}
    </Thumbnails>
  </React.Fragment>
)

export default compose(
  withState('selectedImage', 'setSelectedImage', ({ product }) => product.featured_image),
  withProps(({ product }) => ({
    images: product.images,
  })),
  withHandlers({
    handleSwipe: ({ images, setSelectedImage }) => index => setSelectedImage(images[index]),
  }),
  withHandlers(() => {
    let reactSwipeRef
    return {
      onSlideTo: () => index => {
        reactSwipeRef.slide(index)
      },
      setReactSwipeRef: () => ref => {
        reactSwipeRef = ref
      },
    }
  })
)(Pictures)
