import ActionsBar from './actions-bar'
import ContextMenu from './context-menu'
import { getMaxWidthForCompleteCard } from './utils'
import React from 'react'
import styled, { css } from 'styled-components'

const ProductCardContainer = styled.div`
  position: relative;
  overflow: auto;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.13);
  border-radius: 20px;
  ${({ viewType }) =>
    viewType === 'list' &&
    css`
      margin-bottom: 30px;
    `};
`

const ProductCardHeader = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: space-between;
  margin-left: 1rem;

  @media (max-width: ${({ viewType }) => getMaxWidthForCompleteCard(viewType)}px) {
    height: 0;
  }
`

const ProductCardTitle = styled.div`
  font-size: 14px;
  color: #3d4246;
  font-weight: 700;
  overflow-wrap: break-word;
  word-wrap: break-word;

  @media (max-width: ${({ viewType }) => getMaxWidthForCompleteCard(viewType)}px) {
    color: white;
    position: absolute;
    bottom: 10px;
    z-index: 1;
  }
`

const ProductCardContainerLink = styled.a`
  text-decoration: none;
  touch-action: manipulation;
  &:hover,
  &:focus {
    opacity: 1;
  }
`

const ProductCardImageWrapper = styled.div`
  margin-bottom: 0;
  position: relative;
  width: 100%;

  &::after {
    content: " ";
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    box-shadow: inset 0 -160px 160px -160px #000000;
  }
}
`
// .grid-view-item__vendor {
//   text-transform: none;
//   font-weight: 600;
// }

// .round-img {
//   border-radius: 50%;
//   object-fit: contain;
//   background-color: lightgray;
// }

// "grid-view-item__image-wrapper js"
// div style={{ paddingTop: product.featured_image ? `${product.featured_image_padding_top}%` : '100%' }}
// <div style={{ marginLeft: '10px', marginRight: '10px' }}>
//   <img className="round-img" height="40" src={product.profile_img_url} width="40" />
// </div>
// <div>
//   <div className="h4 grid-view-item__title">{product.title}</div>
//   <div className="grid-view-item__vendor">{product.vendor}</div>
// </div>
const ProductCard = ({ product, productsData, viewType }) => {
  return (
    <ProductCardContainer viewType={viewType}>
      <ProductCardContainerLink href={product.url}>
        <ProductCardHeader viewType={viewType}>
          <ProductCardTitle viewType={viewType}>{product.title}</ProductCardTitle>
          <ContextMenu product={product} viewType={viewType} />
        </ProductCardHeader>
        <ProductCardImageWrapper id={product.wrapper_id}>
          <img
            alt={product.featured_image_alt}
            className="grid-view-item__image lazyload"
            data-aspectratio={product.featured_image_aspect_ratio}
            data-sizes="auto"
            data-src={product.img_url}
            data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
            id={product.img_id}
            src={product.featured_image}
          />
        </ProductCardImageWrapper>
      </ProductCardContainerLink>
      <ActionsBar product={product} productsData={productsData} viewType={viewType} />
    </ProductCardContainer>
  )
}

export default ProductCard
