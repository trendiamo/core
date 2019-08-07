import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Carousel, CarouselElement } from './carousel'
import { imgixUrl, stringifyRect } from 'tools'

const StyledCarouselElement = styled(CarouselElement)`
  img {
    cursor: zoom-in;
  }
`

const ImageCarouselElement = ({ carouselType, image, index, onClick, urlsArray }) => {
  const newOnClick = useCallback(
    () => {
      onClick({ type: 'clickImageCarouselItem', item: { index, urlsArray } })
    },
    [index, onClick, urlsArray]
  )

  const onTouchEnd = useCallback(
    () => {
      onClick({ type: 'touchImageCarousel', item: { index, urlsArray } })
    },
    [index, onClick, urlsArray]
  )

  return (
    <StyledCarouselElement carouselType={carouselType} onClick={newOnClick} onTouchEnd={onTouchEnd}>
      <img
        alt=""
        src={imgixUrl(image.url, {
          rect: stringifyRect(image.imgRect),
          fit: 'crop',
          w: 260,
          h: 260,
        })}
      />
    </StyledCarouselElement>
  )
}

const ImageCarouselMessage = ({ carouselType, imageCarousel, onClick }) => {
  const images = useMemo(
    () =>
      imageCarousel.map(imageData => {
        return { url: imageData.imgUrl || imageData.img.url, imgRect: imageData.imgRect, id: imageData.id }
      }),
    [imageCarousel]
  )

  return (
    <div>
      <Carousel carouselType={carouselType}>
        {images.map((image, index) => (
          <ImageCarouselElement
            carouselType={carouselType}
            image={image}
            index={index}
            key={image.id || `new-${index}`}
            onClick={onClick}
            urlsArray={images.map(image => image.url)}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default ImageCarouselMessage
