import CartIcon from 'icons/cart.svg'
import ChatMessages from './chat-messages'
import data from './data'
import styled from 'styled-components'
import { addMainProductToCart } from './cart'
import { BelowCover, Cover } from './cover'
import { h } from 'preact'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const CheckoutButton = styled(({ className }) => (
  <button className={className} onClick={addMainProductToCart} type="button">
    <CartIcon fill="#fff" height="24" style={{ verticalAlign: 'bottom', marginRight: '0.4rem' }} width="24" />
    {'Add to Cart'}
  </button>
))`
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

const NowadaysBase = () => (
  <ColFlexDiv>
    <Cover persona={data.persona} product={data.product} />
    <BelowCover>
      <ChatMessages chatMessages={data.chatMessages} />
      <CheckoutButton />
    </BelowCover>
  </ColFlexDiv>
)

export default NowadaysBase
