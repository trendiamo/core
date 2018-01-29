import ActionsBar from './actions-bar'
import ContextMenu from './context-menu'
import React from 'react'

const ProductCard = ({ consumerId, openModal, product }) => {
  return (
    <div className={`grid-view-item${product.available ? '' : ' product-price--sold-out grid-view-item--sold-out'}`}>
      <a className="grid-view-item__link grid-view-item__image-container" href={product.url}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <img className="round-img" src={product.profile_img_url} width="40" height="40" />
          </div>
          <div style={{ width: '80%' }}>
            <div className="h4 grid-view-item__title">{product.title}</div>
            <div className="grid-view-item__vendor">{product.vendor}</div>
          </div>
          <ContextMenu product={product} />
        </div>
        <div id={product.wrapper_id} className="grid-view-item__image-wrapper js">
          <div style={{ paddingTop: product.featured_image ? `${product.featured_image_padding_top}%` : '100%' }}>
            <img
              alt={product.featured_image_alt}
              id={product.img_id}
              className="grid-view-item__image lazyload"
              src={product.featured_image}
              data-src={product.img_url}
              data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]"
              data-aspectratio={product.featured_image_aspect_ratio}
              data-sizes="auto"
            />
          </div>
        </div>
      </a>
      <ActionsBar consumerId={consumerId} openModal={openModal} product={product} />
    </div>
  )
}

export default ProductCard
