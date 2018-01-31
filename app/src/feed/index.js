import ProductsGrid from './products-grid'
import React from 'react'
import ReactDOM from 'react-dom'
import { $, $$, getMetadata } from 'utils'

export default () => {
  const appElement = $('.grid.grid--uniform.grid--view-items')
  const products = $$('.product-info', info => JSON.parse(info.content.textContent))

  ReactDOM.render(<ProductsGrid appElement={appElement} metadata={getMetadata()} products={products} />, appElement)
}
