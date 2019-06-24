import React, { useCallback, useMemo } from 'react'
import { Carousel, CarouselElement } from './carousel'
import { imgixUrl, stringifyRect } from 'tools'

const ImgCarouselElement = ({ carouselType, picture, index, onClick, urlsArray }) => {
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
    <CarouselElement carouselType={carouselType} onClick={newOnClick} onTouchEnd={onTouchEnd}>
      <img
        alt=""
        src={imgixUrl(picture.url, {
          rect: stringifyRect(picture.picRect),
          fit: 'crop',
          w: 260,
          h: 260,
        })}
      />
    </CarouselElement>
  )
}

const ImgCarouselMessage = ({ carouselType, imageCarousel, onClick }) => {
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
          <ImgCarouselElement
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

export default ImgCarouselMessage
