import ButtwrapModal from './buttwrap-modal'
import CartIcon from 'icons/cart.svg'
import styled from 'styled-components'
import { addMainProductToCart, proceedToCheckout } from './cart'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const CartButton = styled(
  compose(
    withState('isOpen', 'setIsOpened', false),
    withHandlers({
      closeModal: ({ setIsOpened }) => () => {
        setIsOpened(false)
      },
      openModal: ({ setIsOpened }) => () => {
        setIsOpened(true)
      },
    }),
    withHandlers({
      onClick: ({ setIsOpened, buttonType }) => () => {
        buttonType === 'add' ? addMainProductToCart() : setIsOpened(!proceedToCheckout())
      },
    })
  )(({ buttonType, className, closeModal, isOpen, onClick }) => (
    <h.Fragment>
      <button className={className} onClick={onClick} type="button">
        <CartIcon fill="#fff" height="24" style={{ verticalAlign: 'bottom', marginRight: '0.4rem' }} width="24" />
        {buttonType === 'add' ? 'Add to Cart' : 'Proceed to checkout'}
      </button>
      <ButtwrapModal closeModal={closeModal} isOpen={isOpen} />
    </h.Fragment>
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
