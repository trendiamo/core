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
  background-color: #232323;
  color: white;
  padding: 1rem;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
`

export default compose(
  branch(({ showing }) => !showing, renderNothing),
  withHandlers({
    onClick: ({ goToNextStep }) => () => goToNextStep('showResults'),
  })
)(({ onClick }) => <CtaButton onClick={onClick}>{'Done! Show me results!'}</CtaButton>)
