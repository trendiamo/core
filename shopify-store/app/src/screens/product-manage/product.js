import IconTrash from 'icons/icon-trash'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withProps } from 'recompose'

const Li = styled.li`
  display: flex;
  flex-wrap: wrap;
  background-color: #f4f4f4;
  margin: 0% 0% 20%;
  border-radius: 6px;
  overflow: hidden;
  height: 60vh;
  flex-direction: column;
  @media screen and (min-width: 575px) {
    height: 8rem;
    flex-direction: row;
    margin: 1% 0;
  }
}
`

const StyledIconTrash = styled(IconTrash)`
  width: 30px;
  height: 30px;
`

const H6 = styled.h6`
  flex: 1;
  margin: 0% 0% 0%;
  text-align: center;
  padding: 0;
  @media screen and (min-width: 575px) {
    margin: auto;
    flex: 6;
    padding: 1rem;
  }
`
const P = styled.p`
  flex: 1;
  margin: 0% 0% 0%;
  text-align: center;
  @media screen and (min-width: 575px) {
    margin: auto;
    flex: 6;
    padding: 1rem;
  }
`

const Figure = styled.figure`
  background-image: ${({ background }) => (background ? `url('${background}')` : `'none'`)};
  flex: 10;
  margin: 0;
  background-size: cover;
  background-position: center;
  @media screen and (min-width: 575px) {
    flex: 2;
  }
`
const Button = styled.button`
  background-color: #fd898a;
  border: 0;
  flex: 2;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s;
  max-height: 10%;
  &:hover {
    opacity: 1;
  }
  @media screen and (min-width: 575px) {
    flex: 1;
    max-height: 100%;
  }
`

const Product = ({ deleteProductChild, title, imageUrl, variants }) => (
  <Li>
    <Figure background={imageUrl} />
    <H6>{title}</H6>
    {variants && (
      <P>
        {'Variants: ' + variants.map(variant => `${variant.title} (${variant.inventoryQuantity} In stock)`).join(', ')}
      </P>
    )}
    <Button onClick={deleteProductChild} type="submit">
      <StyledIconTrash />
    </Button>
  </Li>
)

export default compose(
  withProps(({ edge }) => ({
    imageUrl: edge.images.edges[0].node.originalSrc,
    title: edge.title,
    variants: edge.variants.edges.map(edge => edge.node),
  })),
  withHandlers({
    deleteProductChild: ({ edge, deleteProduct }) => event => {
      event.preventDefault()
      deleteProduct(edge)
    },
  })
)(Product)
