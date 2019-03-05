import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { h } from 'preact'

const CtaButton = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  margin: 0;
  border: 0;
  outline: 0;

  flex-shrink: 0;
  width: 100%;

  font-family: Roboto, sans-serif;
  font-weight: 500;
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
  branch(({ ctaButton }) => !ctaButton, renderNothing),
  withHandlers({
    onClick: ({ ctaButton, onToggleContent, setPluginState }) => () => {
      onToggleContent()
      getFrekklsConfig().onCtaClick(ctaButton.action)
      if (ctaButton.action === 'want') {
        setPluginState('size-help')
      } else if (ctaButton.action === 'ok-size') {
        setPluginState('nothing')
      }
      mixpanel.track('Clicked Button', { hostname: location.hostname, type: 'CTA', action: ctaButton.action })
    },
  })
)(({ ctaButton, onClick }) => <CtaButton onClick={onClick}>{ctaButton.label}</CtaButton>)