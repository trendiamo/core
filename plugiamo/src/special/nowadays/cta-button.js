import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const CtaButton = styled(
  compose(
    withHandlers({
      onClick: ({ ctaButton, onToggleContent, setPluginState }) => () => {
        onToggleContent()
        if (ctaButton.action === 'want') {
          setPluginState('size-help')
        } else if (ctaButton.action === 'ok-size') {
          setPluginState('nothing')
        }
      },
    })
  )(({ ctaButton, className, onClick }) => (
    <button className={className} onClick={onClick} type="button">
      {ctaButton.label}
    </button>
  ))
)`
  appearance: none;
  margin: 0;
  border: 0;
  outline: 0;

  position: fixed;
  bottom: 0;
  width: 100%;

  font-family: Roboto, sans-serif;
  z-index: 1;
  background-color: #ff7840;
  color: white;
  padding: 1rem;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
`

export default CtaButton
