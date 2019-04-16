import styled from 'styled-components'

import leftArrow from '../images/about-arrow-left.svg'
import rightArrow from '../images/about-arrow-right.svg'

const arrowFactory = src => styled.img.attrs({
  src,
})`
  z-index: 1;
  height: 40px;
  width: 40px;
`

const LeftArrow = arrowFactory(leftArrow)
const RightArrow = arrowFactory(rightArrow)

export { RightArrow, LeftArrow }
