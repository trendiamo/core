import ActionsBar from './actions-bar'
import ContextMenu from './context-menu'
import React from 'react'

// <div style={{ marginLeft: '10px', marginRight: '10px' }}>
//   <img className="round-img" height="40" src={product.profile_img_url} width="40" />
// </div>
// <div>
//   <div className="h4 grid-view-item__title">{product.title}</div>
//   <div className="grid-view-item__vendor">{product.vendor}</div>
// </div>
const ProductCard = ({ product, productsData }) => {
  return (
    <div className={`grid-view-item${product.available ? '' : ' product-price--sold-out grid-view-item--sold-out'}`}>
      <a className="grid-view-item__link grid-view-item__image-container" href={product.url}>
        <div style={{ display: 'flex', justifyContent: 'space-between', height: '50px', marginLeft: '1rem', alignItems: 'center' }}>
          <div className="h4 grid-view-item__title">{product.title}</div>
          <ContextMenu product={product} />
        </div>
        <div className="grid-view-item__image-wrapper js" id={product.wrapper_id}>
          <div style={{ paddingTop: product.featured_image ? `${product.featured_image_padding_top}%` : '100%' }}>
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
          </div>
        </div>
      </a>
      <ActionsBar product={product} productsData={productsData} />
    </div>
  )
}

export default ProductCard
