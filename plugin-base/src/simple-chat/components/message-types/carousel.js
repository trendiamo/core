import omit from 'lodash.omit'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { IconChevronLeft } from 'icons'

const BASE_SIZE = 260
const PRODUCT_ITEM_HEIGHT = 'auto'

const isTouchDevice = 'ontouchstart' in document.documentElement

const Container = styled(props => <div {...omit(props, ['carouselType'])} />)`
  position: relative;
  height: ${({ carouselType }) => (carouselType === 'productCarousel' ? PRODUCT_ITEM_HEIGHT : BASE_SIZE)}px;
  margin-left: -16px;
  margin-right: -16px;
`

const CarouselContent = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Gradient = styled.div`
  &:before {
    content: '';
    position: absolute;
    background: linear-gradient(
      ${({ direction }) => (direction === 'right' ? -90 : 90)}deg,
      #ebeef2,
      rgba(255, 255, 255, 0)
    );
    width: 100px;
    top: 0;
    bottom: 0;
    ${({ direction }) => direction}: 0;
    pointer-events: none;
    transition: visibility 0.4s, opacity 0.4s;
    ${({ show }) => !show && 'opacity: 0; visibility: hidden;'}
  }
`

const CarouselElement = styled(props => <div {...omit(props, ['carouselType', 'width'])} />)`
  flex: none;
  height: ${({ carouselType }) => (carouselType === 'productCarousel' ? PRODUCT_ITEM_HEIGHT : BASE_SIZE)}px;
  width: ${({ width }) => (width ? width : BASE_SIZE)}px;
  margin: 0 5px;
  cursor: pointer;
  scroll-snap-align: start;
  scroll-margin: 15px;
  scroll-snap-margin: 15px;

  &:first-child {
    width: ${BASE_SIZE + 10}px;
    padding-left: 10px;
  }

  &:last-child {
    width: ${BASE_SIZE + 15}px;
    padding-right: 15px;
  }

  img {
    width: 100%;
    object-fit: cover;
    ${({ carouselType }) =>
      carouselType === 'imageCarousel' &&
      `
      height: 100%;
      border-radius: 12px;
    `}
  }
`

const ArrowContainer = styled(props => <div {...omit(props, ['direction', 'show'])} />)`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ direction }) => `${direction}: 0;`}
  width: 60px;
  cursor: pointer;
  ${({ show }) => (!show ? 'opacity: 0; visibility: hidden;' : '')}
  transition: visibility 0.4s, opacity 0.4s;
  user-select: none;
  &:hover {
    svg {
      fill: #fff;
    }
  }
`

const ArrowIconStyled = styled(props => <IconChevronLeft {...omit(props, ['direction'])} />)`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction}: 20px;
  transform: translateY(-50%) ${({ direction }) => (direction === 'right' ? 'rotate(-180deg)' : '')};
  width: 15px;
  fill: rgba(255, 255, 255, 0.75);
  filter: drop-shadow(2px ${({ direction }) => (direction === 'right' ? -3 : 3)}px 3px rgba(0, 0, 0, 0.5));
`

const Arrow = ({ direction, carouselRef, scrollLeft, show }) => {
  const onClick = useCallback(() => {
    const elementSize = BASE_SIZE + 10
    const distanceFromSibling =
      direction === 'left'
        ? scrollLeft - elementSize * Math.floor(scrollLeft / elementSize)
        : elementSize * (Math.floor(scrollLeft / elementSize) + 1) - scrollLeft
    const distance = distanceFromSibling === 0 ? elementSize : distanceFromSibling
    carouselRef.current.scrollLeft += direction === 'left' ? -distance : distance
  }, [carouselRef, direction, scrollLeft])

  return (
    <ArrowContainer direction={direction} onClick={onClick} show={show}>
      <ArrowIconStyled direction={direction} />
    </ArrowContainer>
  )
}

const Carousel = ({ carouselType, children }) => {
  const ref = useRef(null)
  const [scrollLeft, setScrollLeft] = useState(0)

  const showLeftArrow = useMemo(() => scrollLeft > 0, [scrollLeft])

  const showRightArrow = useMemo(
    () => scrollLeft === 0 || ref.current.scrollWidth - scrollLeft - ref.current.clientWidth > 0,
    [scrollLeft]
  )

  const onScroll = useCallback(event => setScrollLeft(event.target.scrollLeft), [])

  return (
    <Container carouselType={carouselType}>
      <CarouselContent onScroll={onScroll} ref={ref}>
        {children}
      </CarouselContent>
      {!isTouchDevice && (
        <div>
          <Gradient direction="left" show={showLeftArrow} />
          <Gradient direction="right" show={showRightArrow} />
          <Arrow
            carouselRef={ref}
            carouselType={carouselType}
            direction="left"
            scrollLeft={scrollLeft}
            show={showLeftArrow}
          />
          <Arrow
            carouselRef={ref}
            carouselType={carouselType}
            direction="right"
            scrollLeft={scrollLeft}
            show={showRightArrow}
          />
        </div>
      )}
    </Container>
  )
}

export { Carousel, CarouselElement }
