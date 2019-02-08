import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { scrollToCart, scrollToCheckout } from './cart'

const CtaButton = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  margin: 0;
  border: 0;
  outline: 0;

  position: fixed;
  bottom: 0;
  width: 100%;

  font-family: Roboto, sans-serif;
  z-index: 1;
  background-color: #ff6b02;
  color: white;
  padding: 1rem;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
`

export default compose(
  withHandlers({
    onClick: ({ ctaButton, onToggleContent, setPluginState }) => () => {
      onToggleContent()
      if (ctaButton.action === 'want') {
        scrollToCart()
        setPluginState('size-help')
      } else if (ctaButton.action === 'ok-size') {
        scrollToCart()
        setPluginState('nothing')
      } else if (ctaButton.action === 'checkout') {
        scrollToCheckout()
      }
      mixpanel.track('Clicked Button', { hostname: location.hostname, type: 'CTA', action: ctaButton.action })
    },
  })
)(({ ctaButton, onClick }) => <CtaButton onClick={onClick}>{ctaButton.label}</CtaButton>)
