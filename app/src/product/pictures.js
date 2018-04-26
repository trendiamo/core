import ActionsBar from 'feed/actions-bar'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withProps, withState } from 'recompose'

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 130%;
  background-image: url(${({ url }) => url});
  background-color: gray;
  background-size: cover;
  background-position: bottom center;
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
    setImage: ({ image, setImage }) => () => setImage(image),
  })
)(({ isSelected, image, setImage }) => (
  <div>
    <ThumbnailImg alt="thumbnail" isSelected={isSelected} onClick={setImage} src={image} />
  </div>
))

const Pictures = ({ images, onToggleLike, product, selectedImage, setSelectedImage }) => (
  <div>
    <div className="product-single__photos">
      <ImageContainer className="product-single__photo-wrapper" url={selectedImage} />
      <div className="actions-bar">
        <ActionsBar onToggleLike={onToggleLike} product={product} viewType="list" />
      </div>
    </div>
    <Thumbnails>
      {images.map(image => (
        <ThumbnailImage image={image} key={image} selectedImage={selectedImage} setImage={setSelectedImage} />
      ))}
    </Thumbnails>
  </div>
)

export default compose(
  withState('selectedImage', 'setSelectedImage', ({ product }) => product.featured_image),
  withProps(({ product }) => ({
    images: product.images,
  }))
)(Pictures)
