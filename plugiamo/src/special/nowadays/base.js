import CartIcon from 'icons/cart.svg'
import ChatLogUi from './chat-log-ui'
import data from './data'
import styled from 'styled-components'
import { addMainProductToCart } from './cart'
import { BelowCover, Cover } from './cover'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
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

const NowadaysBaseTemplate = ({ handleScroll, scrolled }) => (
  <ColFlexDiv>
    <Cover persona={data.persona} product={data.product} scrolled={scrolled} />
    <BelowCover onScroll={handleScroll}>
      <ChatLogUi />
      <CheckoutButton />
    </BelowCover>
  </ColFlexDiv>
)

const NowadaysBase = compose(
  withState('scrolled', 'setScrolled', false),
  withHandlers({
    handleScroll: ({ setScrolled, scrolled }) => () => {
      if (event.target.scrollTop === 0) {
        setScrolled(false)
      } else {
        !scrolled && setScrolled(true)
      }
    },
  })
)(NowadaysBaseTemplate)

export default NowadaysBase
