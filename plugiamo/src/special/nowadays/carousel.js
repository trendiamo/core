import styled from 'styled-components'

const Carousel = styled.div`
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  margin-left: -16px;
  margin-right: -16px;
  min-height: ${({ carouselType }) => (carouselType === 'productCarousel' ? '270px' : '260px')};
  animation: _frekkls_message_appear 0.3s ease-out;
`

const CarouselElement = styled.div`
  margin: 0 5px;
  max-height: 260px;
  min-width: 260px;

  &:hover {
    cursor: pointer;
  }
  &:first-child {
    padding-left: 10px;
    min-width: 270px;
  }

  &:last-child {
    padding-right: 10px;
    min-width: 270px;
  }
  img {
    border-radius: ${({ carouselType }) => (carouselType === 'productCarousel' ? '0' : '12px')};
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
`

export { Carousel, CarouselElement }
