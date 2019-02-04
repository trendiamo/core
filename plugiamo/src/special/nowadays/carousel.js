import styled from 'styled-components'
import { h } from 'preact'

const Carousel = styled.div`
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
  margin-left: -13px;
  margin-right: -13px;
  margin-bottom: 5px;
  min-height: 260px;
`
const CarouselPic = styled.div`
  margin: 0 5px;
  max-height: 260px;
  min-width: 260px;

  &:first-child {
    padding-left: 10px;
    min-width: 270px;
  }

  &:last-child {
    padding-right: 10px;
    min-width: 270px;
  }

  img {
    border-radius: 12px;
    width: 100%;
    max-height: 260px;
    object-fit: cover;
  }
`

const ImgCarouselMessage = ({ imageCarousel }) => (
  <Carousel>
    {imageCarousel.map(imgObj => (
      <CarouselPic key={imgObj.picUrl}>
        <img alt="" src={imgObj.picUrl} />
      </CarouselPic>
    ))}
  </Carousel>
)

export default ImgCarouselMessage
