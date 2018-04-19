import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const Offers = ({ onChoice, product, available }) => (
  <form action="/cart/add" className="product-form" encType="multipart/form-data" method="post">
    {product.options.map((option, i) => (
      <div className="product-form__item" key={option}>
        <label htmlFor={`SingleOptionSelector-${i}`}>{option}</label>
        <select
          className="product-form__input"
          id={`SingleOptionSelector-${i}`}
          onChange={event => onChoice(event.target.value, i)}
        >
          {[...new Set(product.variants.map(e => e[`option${i + 1}`]))].map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    ))}
    <div className="product-form__item product-form__item--submit">
      <button className="btn product-form__cart-submit" disabled={!available} name="add" type="submit">
        <span id="AddToCartText">{available ? 'Add to cart' : 'Unavailable'}</span>
      </button>
    </div>
  </form>
)

const findVariant = (variants, choices) =>
  variants.find(e =>
    Object.keys(choices).reduce((acc, key) => acc && e[`option${Number(key) + 1}`] === choices[key], true)
  )

export default compose(
  withState('choices', 'setChoices', {}),
  withHandlers({
    onChoice: ({ choices, setChoices }) => (value, i) => setChoices({ ...choices, [i]: value }),
  }),
  withProps(({ choices, product }) => ({
    available: (findVariant(product.variants, choices) || {}).available,
  }))
)(Offers)
