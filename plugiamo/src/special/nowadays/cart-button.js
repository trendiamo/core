import CartIcon from 'icons/cart.svg'
import styled from 'styled-components'
import { addMainProductToCart } from './cart'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const CartButton = styled(
  compose(
    withHandlers({
      onClick: ({ buttonType }) => () => {
        if (buttonType === 'add') {
          addMainProductToCart()
        }
      },
    })
  )(({ buttonType, className, onClick }) => (
    <button className={className} onClick={onClick} type="button">
      <CartIcon fill="#fff" height="24" style={{ verticalAlign: 'bottom', marginRight: '0.4rem' }} width="24" />
      {buttonType === 'add' ? 'Add to Cart' : 'Proceed to checkout'}
    </button>
  ))
)`
  font-family: Roboto, sans-serif;
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 100%;
  appearance: none;
  border: 0;
  outline: 0;
  background-color: #ff7840;
  color: white;
  padding: 1rem;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;
`

export default CartButton
