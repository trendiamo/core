import ActionsBar from './actions-bar'
import ContextMenu from './context-menu'
import { getMaxWidthForCompleteCard } from './utils'
import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
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

const ProductCard = ({ href, product, onToggleLike, title, viewType }) => {
  return (
    <ProductCardContainer viewType={viewType}>
      <ProductCardContainerLink href={href}>
        <ProductCardHeader viewType={viewType}>
          <ProductCardTitle viewType={viewType}>{title}</ProductCardTitle>
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
      <ActionsBar onToggleLike={onToggleLike} product={product} viewType={viewType} />
    </ProductCardContainer>
  )
}

export default compose(
  withHandlers({
    onToggleLike: ({ product, productsData }) => data => {
      if (!productsData) return
      const { id: productId } = product
      productsData.updateQuery(previousProductsData => ({
        ...previousProductsData,
        products: previousProductsData.products.map(e => (e.id === productId ? { ...e, ...data.toggleLike } : e)),
      }))
    },
  }),
  withProps(({ product, viewType }) => ({
    href:
      viewType === 'people'
        ? product.url.replace(/\/collections\/([^/]+)\//, `/collections/${product.user.username}/`)
        : product.url,
    title: viewType === 'people' ? product.user.username : product.title,
  }))
)(ProductCard)
