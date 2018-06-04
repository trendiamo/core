import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PicturesContainer = styled.div`
  position: relative;
  width: 75vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f0f0;

  @media (max-width: 999px) {
    display: none;
  }
`

const PictureContainer = styled.div`
  float: left;
  width: 33.33%;
  height: 50%;
`

const PictureLinkContainer = styled(Link)`
  float: left;
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
