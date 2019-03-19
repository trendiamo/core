import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const Button = styled.button.attrs({
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
  padding: 25px 5px;
  font-size: 18px;
  line-height: 0;
  text-transform: uppercase;
  cursor: pointer;
  max-height: 50px;
  ${({ hide }) =>
    hide &&
    `max-height: 0px;
  padding: 0;
  color: transparent;
  `}

  transition: color 0.3s${({ hide }) => !hide && ' 0.3s'}, padding 0.3s${({ hide }) =>
  hide && ' 0.3s'}, max-height 0.0s${({ hide }) => hide && ' 0.3s'};
`

const CtaButton = ({ onClick, hide }) => (
  <Button hide={hide} onClick={onClick}>
    {'Done! Show me results!'}
  </Button>
)

export default compose(
  withHandlers({
    onClick: ({ goToNextStep }) => () => goToNextStep('showResults'),
  })
)(CtaButton)
