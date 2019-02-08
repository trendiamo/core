import ProductMessage from './product-message'
import { Carousel, CarouselElement } from './carousel'
import { h } from 'preact'

const ProductCarouselMessage = ({ carouselType, productCarousel }) => (
  <Carousel carouselType={carouselType}>
    {productCarousel.map(product => (
      <CarouselElement key={product.id}>
        <ProductMessage product={product} />
      </CarouselElement>
    ))}
  </Carousel>
)

export default ProductCarouselMessage
