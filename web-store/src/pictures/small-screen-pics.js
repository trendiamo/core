import React from 'react'
import ReactSwipe from 'react-swipe'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'

const SmallScreenPicsContainer = styled.div`
  margin-right: -2rem;
  margin-left: -2rem;
  @media (min-width: 1000px) {
    display: none;
  }
`

const ImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
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
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  overflow-x: scroll;

  div {
    height: 80px;
    text-align: center;
  }
`

const ThumbnailImg = styled.img`
  border: ${({ isSelected }) => (isSelected ? '2px solid #555' : 0)};
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
    <ThumbnailImg alt="thumbnail" className="lazyload" isSelected={isSelected} onClick={onSlideTo} src={image} />
  </div>
))

const StyledDiv = styled.div`
  position: relative;
  max-width: 400px;
  margin: 0 auto;
`

const SmallScreenPics = ({ handleSwipe, images, onSlideTo, selectedImage, setReactSwipeRef }) => (
  <SmallScreenPicsContainer>
    <StyledDiv>
      <ReactSwipe ref={setReactSwipeRef} swipeOptions={{ callback: handleSwipe, continuous: false }}>
        {images.map(image => (
          <div key={image}>
            <ImageContainer url={image} />
          </div>
        ))}
      </ReactSwipe>
    </StyledDiv>
    <Thumbnails>
      {images.map((image, index) => (
        <ThumbnailImage image={image} index={index} key={image} onSlideTo={onSlideTo} selectedImage={selectedImage} />
      ))}
    </Thumbnails>
  </SmallScreenPicsContainer>
)

export default compose(
  withState('selectedImage', 'setSelectedImage', ({ images }) => images[0]),
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
)(SmallScreenPics)
