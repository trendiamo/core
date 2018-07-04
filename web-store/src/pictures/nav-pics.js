import React from 'react'
import styled from 'styled-components'
import { PictureLinkContainer, PicturesContainer, StyledPicture } from './common'

const PictureLink = PictureLinkContainer.extend`
  position: relative;

  &::after {
    content: ' ';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    box-shadow: inset 0 -160px 160px -160px #000000;
  }
`

const Name = styled.div`
  color: white;
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1;
  font-weight: 500;
  font-size: 18px;
`

const NavPics = ({ taxon, products }) => (
  <PicturesContainer>
    {Object.values(products).map(product => (
      <PictureLink key={product.id} to={`/collections/${taxon.permalink}/products/${product.slug}`}>
        <StyledPicture alt="" className="lazyload" data-src={product.featuredImage} />
        <Name>{product.name}</Name>
      </PictureLink>
    ))}
  </PicturesContainer>
)

export default NavPics
