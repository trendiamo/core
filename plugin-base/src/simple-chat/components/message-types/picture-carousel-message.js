import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Carousel, CarouselElement } from './carousel'
import { imgixUrl, stringifyRect } from 'tools'

const StyledCarouselElement = styled(CarouselElement)`
  img {
    cursor: zoom-in;
  }
`

const PictureCarouselElement = ({ carouselType, picture, index, onClick, urlsArray }) => {
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
        src={imgixUrl(picture.url, {
          rect: stringifyRect(picture.picRect),
          fit: 'crop',
          w: 260,
          h: 260,
        })}
      />
    </StyledCarouselElement>
  )
}

const PictureCarouselMessage = ({ carouselType, imageCarousel, onClick }) => {
  const pictures = useMemo(
    () =>
      imageCarousel.map(pictureData => {
        return { url: pictureData.picUrl || pictureData.picture.url, picRect: pictureData.picRect, id: pictureData.id }
      }),
    [imageCarousel]
  )

  return (
    <div>
      <Carousel carouselType={carouselType}>
        {pictures.map((picture, index) => (
          <PictureCarouselElement
            carouselType={carouselType}
            index={index}
            key={picture.id || `new-${index}`}
            onClick={onClick}
            picture={picture}
            urlsArray={pictures.map(picture => picture.url)}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default PictureCarouselMessage
