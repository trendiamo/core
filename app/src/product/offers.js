import React from 'react'
import styled from 'styled-components'
import { addToCart, formatMoney } from 'utils'
import { compose, withHandlers, withProps, withState } from 'recompose'

const StyledDiv = styled.div`
  margin: 0 -5px -10px;
`

const Offers = ({ onChoice, onSubmit, options, price, product, available }) => (
  <React.Fragment>
    <p aria-hidden="true" className="product-single__price">
      <span className="product-price__price">
        <span>{price}</span>
      </span>
    </p>
    <StyledDiv>
      {options.map((option, i) => (
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
        <button
          className="btn product-form__cart-submit"
          disabled={!available}
          name="add"
          onClick={onSubmit}
          type="button"
        >
          <span id="AddToCartText">{available ? 'Zum Warenkorb' : 'Unavailable'}</span>
        </button>
      </div>
    </StyledDiv>
  </React.Fragment>
)

const findVariant = (variants, choices) =>
  variants.find(e =>
    Object.keys(choices).reduce((acc, key) => acc && e[`option${Number(key) + 1}`] === choices[key], true)
  )

export default compose(
  withState('choices', 'setChoices', {}),
  withProps(({ choices, product }) => ({
    variant: findVariant(product.variants, choices),
  })),
  withHandlers({
    onChoice: ({ choices, setChoices }) => (value, i) => setChoices({ ...choices, [i]: value }),
    onSubmit: ({ variant }) => () => variant && addToCart(variant.id),
  }),
  withProps(({ product, variant }) => ({
    available: (variant || {}).available,
    options: product.options.length === 1 && product.variants[0].title === 'Default Title' ? [] : product.options,
    price: formatMoney((variant || {}).price),
  }))
)(Offers)
