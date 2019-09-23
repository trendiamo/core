import LeftArrowIcon from 'icons/left-arrow.svg'
import RightArrowIcon from 'icons/right-arrow.svg'
import styled from 'styled-components'
import { Fragment, h } from 'preact'
import { useMemo } from 'preact/hooks'

const Button = styled.button`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 50%;
  z-index: 4;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  outline: 0;
  cursor: ${({ isVisible }) => (isVisible ? 'pointer' : 'default')};
`

const LeftButton = styled(Button)`
  left: 0;
`

const RightButton = styled(Button)`
  right: 0;
`

const styledArrowIconFactory = Arrow => styled(Arrow)`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  fill: #fff;
  width: 42px;
  height: 42px;
  position: absolute;
  top: 50vh;
  z-index: 12340000004;
  cursor: pointer;
`

const StyledLeftArrowIcon = styled(styledArrowIconFactory(LeftArrowIcon))`
  left: 40px;
`

const StyledRightArrowIcon = styled(styledArrowIconFactory(RightArrowIcon))`
  right: 40px;
`

const CarouselModalArrows = ({ selectedImageIndex, onLeftArrowClick, onRightArrowClick, urlsArray }) => {
  const hasLeftButton = useMemo(() => 0 < selectedImageIndex, [selectedImageIndex])
  const hasRightButton = useMemo(() => 0 < selectedImageIndex < urlsArray.length - 1, [
    selectedImageIndex,
    urlsArray.length,
  ])

  return (
    <Fragment>
      <LeftButton isVisible={hasLeftButton} onClick={onLeftArrowClick} type="button">
        <StyledLeftArrowIcon isVisible={hasLeftButton} />
      </LeftButton>
      <RightButton isVisible={hasRightButton} onClick={onRightArrowClick} type="button">
        <StyledRightArrowIcon isVisible={hasRightButton} />
      </RightButton>
    </Fragment>
  )
}

export default CarouselModalArrows
