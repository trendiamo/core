import React from 'react'
import { Carousel, CarouselElement } from './carousel'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { imgixUrl } from 'tools'

const ImgCarouselElement = compose(
  withHandlers({
    onClick: ({ onClick, index, urlsArray }) => () =>
      onClick({ type: 'clickImageCarouselItem', item: { index, urlsArray } }),
    onTouchEnd: ({ onClick, index, urlsArray }) => () =>
      onClick({ type: 'touchImageCarousel', item: { index, urlsArray } }),
  })
)(({ carouselType, imgUrl, onClick, onTouchEnd }) => (
  <CarouselElement carouselType={carouselType} onClick={onClick} onTouchEnd={onTouchEnd}>
    <img alt="" src={imgixUrl(imgUrl, { fit: 'crop', w: 260, h: 260 })} />
  </CarouselElement>
))

const ImgCarouselMessage = compose(
  withState('isTouch', 'setIsTouch', false),
  withProps(({ imageCarousel }) => ({
    urlsArray: imageCarousel.map(image => image.picUrl),
  }))
)(({ urlsArray, carouselType, onClick }) => (
  <div>
    <Carousel carouselType={carouselType}>
      {urlsArray.map((imgUrl, index) => (
        <ImgCarouselElement
          carouselType={carouselType}
          imgUrl={imgUrl}
          index={index}
          key={imgUrl}
          onClick={onClick}
          urlsArray={urlsArray}
        />
      ))}
    </Carousel>
  </div>
))

export default ImgCarouselMessage
