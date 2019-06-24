import ProductMessage from './product-message'
import React from 'react'
import { Carousel, CarouselElement } from './carousel'

const ProductCarouselMessage = ({ carouselType, productCarousel, onClick }) => (
  <Carousel carouselType={carouselType}>
    {productCarousel.map(product => (
      <CarouselElement carouselType={carouselType} key={product.id || product.__key}>
        <ProductMessage onClick={onClick} productMessage={product} />
      </CarouselElement>
    ))}
  </Carousel>
)

export default ProductCarouselMessage
