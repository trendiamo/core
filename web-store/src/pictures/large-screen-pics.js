import React from 'react'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { PictureContainer, PicturesContainer, StyledPicture } from './common'
import withHotkeys, { escapeKey } from '../recompose/with-hotkeys'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  text-align: center;
`

const StyledMainPicture = styled.img`
  height: 100%;
  transition: opacity 0.25s ease;
  opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
`

const MainPicture = compose(
  withState('isMounted', 'setIsMounted', false),
  lifecycle({
    componentDidMount() {
      setTimeout(() => this.props.setIsMounted(true), 1)
    },
    componentWillUnmount() {
      this.props.setIsMounted(false)
    },
  })
)(({ alt, isMounted, src }) => <StyledMainPicture alt={alt} isMounted={isMounted} src={src} />)

const Picture = compose(
  withProps(({ product, image }) => ({
    isMainImage: product.featuredImage === image,
  })),
  withHandlers({
    handleClick: ({ image, setSelectedImage }) => () => setSelectedImage(image),
  })
)(({ image, isMainImage, handleClick }) => (
  <StyledPicture
    alt=""
    className="lazyload"
    data-src={image}
    itemProp={isMainImage ? 'image' : undefined}
    onClick={handleClick}
  />
))

const LargeScreenPics = ({ clearSelectedImage, product, isImageSelected, selectedImage, setSelectedImage }) => (
  <PicturesContainer>
    {product.images.map(image => (
      <PictureContainer key={image}>
        <Picture image={image} product={product} setSelectedImage={setSelectedImage} />
      </PictureContainer>
    ))}
    {isImageSelected && (
      <Overlay onClick={clearSelectedImage}>
        <MainPicture alt="" src={selectedImage} />
      </Overlay>
    )}
  </PicturesContainer>
)

export default compose(
  withState('selectedImage', 'setSelectedImage', null),
  withHandlers({
    clearSelectedImage: ({ setSelectedImage }) => () => setSelectedImage(null),
  }),
  withHotkeys({
    [escapeKey]: ({ clearSelectedImage }) => () => clearSelectedImage(),
  }),
  withProps(({ selectedImage }) => ({
    isImageSelected: !!selectedImage,
  }))
)(LargeScreenPics)
