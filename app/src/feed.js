import React from 'react'
import ReactDOM from 'react-dom'
import ActionsBar from './actions-bar'
import ProductsGrid from './products-grid'

const consumerId = document.querySelector('.consumer-id').dataset.consumerId
const products = Array.prototype.map.call(document.querySelectorAll('.product-info'), info =>
  JSON.parse(info.content.textContent)
)
const appElement = document.querySelector('.grid.grid--uniform.grid--view-items')

ReactDOM.render(<ProductsGrid appElement={appElement} consumerId={consumerId} products={products} />, appElement)
