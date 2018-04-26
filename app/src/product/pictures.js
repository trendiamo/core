import React from 'react'
import styled from 'styled-components'
import { compose, withState } from 'recompose'

const Thumbnails = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  div {
    width: 100px;
    height: 100px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }
  img {
    max-height: 100%;
    object-fit: contain;
  }
`

const Pictures = ({ product, image, setImage }) => (
  <div>
    <img alt={product.title} src={image} />
    <Thumbnails>
      {product.images.map(image => (
        <div key={image}>
          <img alt={product.title} onClick={() => setImage(image)} src={image} />
        </div>
      ))}
    </Thumbnails>
  </div>
)

export default compose(withState('image', 'setImage', ({ product }) => product.image))(Pictures)
