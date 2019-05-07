import React from 'react'
import { Carousel, CarouselElement } from './carousel'
import { compose, withProps, withState } from 'recompose'
import { imgixUrl } from 'tools'

const ImageCarouselMessageTemplate = ({ urlsArray, carouselType, onClick }) => (
  <div>
    <Carousel carouselType={carouselType}>
      {urlsArray.map((imgUrl, index) => (
        <CarouselElement
          carouselType={carouselType}
          key={imgUrl}
          onClick={() => onClick({ type: 'clickImageCarouselItem', item: { index, urlsArray } })}
          onTouchEnd={() => onClick({ type: 'touchImageCarousel', item: { index, urlsArray } })}
        >
          <img alt="" src={imgixUrl(imgUrl, { fit: 'crop', w: 260, h: 260 })} />
        </CarouselElement>
      ))}
    </Carousel>
  </div>
)

const ImgCarouselMessage = compose(
  withState('isTouch', 'setIsTouch', false),
  withProps(({ imageCarousel }) => ({
    urlsArray: imageCarousel.map(image => image.picUrl),
  }))
)(ImageCarouselMessageTemplate)

export default ImgCarouselMessage
