import styled from 'styled-components'

import leftArrow from '../images/about-arrow-left.svg'
import rightArrow from '../images/about-arrow-right.svg'

const LeftArrow = styled.img.attrs({
  src: leftArrow,
})`
  z-index: 1;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`

const RightArrow = styled.img.attrs({
  src: rightArrow,
})`
  z-index: 1;
  height: 40px;
  &:hover {
    cursor: pointer;
  }
`

export { RightArrow, LeftArrow }
