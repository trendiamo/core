import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PicturesContainer = styled.div`
  position: relative;
`

const PictureContainer = styled.div`
  width: 33.33%;
  height: 50%;
`

const PictureLinkContainer = styled(Link)`
  display: block;
  width: 33.33%;
  height: 50%;
`

const StyledPicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`

export { PictureContainer, PictureLinkContainer, PicturesContainer, StyledPicture }
