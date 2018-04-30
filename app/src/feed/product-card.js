import ActionsBar from './actions-bar'
import ContextMenu from 'components/context-menu'
import { getMaxWidthForCompleteCard } from './utils'
import React from 'react'
import ShareProduct from './share-product'
import { compose, withHandlers, withProps } from 'recompose'
import styled, { css } from 'styled-components'

const ProductCardContainer = styled.div`
  position: relative;
  overflow: auto;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.13);
  border-radius: ${({ viewType }) => (viewType === 'list' ? '20px' : '10px')};
  margin-bottom: 30px;
  ${({ viewType }) =>
    viewType === 'list' ||
    css`
      width: 42%;
      max-width: 280px;
      margin-left: 10px;
      margin-right: 10px;
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

const ProductCardTitle = styled.a`
  font-size: 14px;
  color: #3d4246;
  font-weight: 700;
  overflow-wrap: break-word;
  word-wrap: break-word;
  flex-basis: 100%;

  display: block;
  text-decoration: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    opacity: 1;
  }

  @media (max-width: ${({ viewType }) => getMaxWidthForCompleteCard(viewType)}px) {
    color: white;
    position: absolute;
    bottom: 10px;
    z-index: 1;
  }
`

const StyledContextMenu = styled(ContextMenu)`
  margin-right: 1rem;
  @media (max-width: ${({ viewType }) => getMaxWidthForCompleteCard(viewType)}px) {
    display: none;
  }
`

const ProductCardImageWrapper = styled.a`
  margin-bottom: 0;
  position: relative;
  width: 100%;

  display: block;
  text-decoration: none;
  touch-action: manipulation;

  &:hover,
  &:focus {
    opacity: 1;
  }

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
      <ProductCardHeader viewType={viewType}>
        <ProductCardTitle href={href} viewType={viewType}>
          {title}
        </ProductCardTitle>
        <StyledContextMenu viewType={viewType}>
          <ul>
            <ShareProduct product={product} />
          </ul>
        </StyledContextMenu>
      </ProductCardHeader>
      <ProductCardImageWrapper href={href} id={product.wrapper_id}>
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
