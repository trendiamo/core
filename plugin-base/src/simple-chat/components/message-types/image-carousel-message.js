import React from 'react'
import { Carousel, CarouselElement } from './carousel'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { imgixUrl, stringifyRect } from 'tools'

const ImgCarouselElement = compose(
  withHandlers({
    onClick: ({ onClick, index, urlsArray, picture }) => () =>
      onClick({ type: 'clickImageCarouselItem', item: { index, urlsArray, picture } }),
    onTouchEnd: ({ onClick, index, urlsArray, picture }) => () =>
      onClick({ type: 'touchImageCarousel', item: { index, urlsArray, picture } }),
  })
)(({ carouselType, picture, onClick, onTouchEnd }) => (
  <CarouselElement carouselType={carouselType} onClick={onClick} onTouchEnd={onTouchEnd}>
    <img
      alt=""
      src={imgixUrl(picture.picUrl, {
        rect: stringifyRect(picture.picRect),
        fit: 'crop',
        w: 260,
        h: 260,
      })}
    />
  </CarouselElement>
))

const ImgCarouselMessage = compose(
  withState('isTouch', 'setIsTouch', false),
  withProps(({ imageCarousel }) => ({
    pictures: imageCarousel.map(image => {
      return { picUrl: image.picUrl, picRect: image.picRect }
    }),
  }))
)(({ pictures, carouselType, onClick }) => (
  <div>
    <Carousel carouselType={carouselType}>
      {pictures.map((picture, index) => (
        <ImgCarouselElement
          carouselType={carouselType}
          index={index}
          key={picture.picUrl}
          onClick={onClick}
          picture={picture}
          urlsArray={pictures.map(picture => picture.picUrl)}
        />
      ))}
    </Carousel>
  </div>
))

export default ImgCarouselMessage
