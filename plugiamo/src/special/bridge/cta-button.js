import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { timeout } from 'plugin-base'

const Button = styled.button`
  appearance: none;
  margin: 0;
  border: 0;
  outline: 0;

  flex-shrink: 0;
  width: 100%;

  font-family: Roboto, sans-serif;
  font-weight: 500;
  z-index: 1;
  background-color: ${({ ctaButton }) => ctaButton.backgroundColor || '#111'};
  color: ${({ ctaButton }) => ctaButton.color || '#fff'};
  padding: 25px 5px;
  font-size: 18px;
  line-height: 0;
  text-transform: uppercase;
  cursor: pointer;
  max-height: 50px;
  transition: color 0.3s 0.3s, padding 0.3s, max-height 0.3s 0.3s;
  ${({ animation }) =>
    (animation === 'hide' || animation === 'init') &&
    `max-height: 0px;
      padding: 0;
      color: transparent;
      transition: color 0.29s 0.01s, padding 0.3s 0.3s, max-height 0.3s 0.3s;
    `}
  overflow: hidden;
`

const CtaButton = ({ onClick, animation, ctaButton }) => (
  <Button animation={animation} ctaButton={ctaButton} onClick={onClick} type="button">
    {ctaButton.label}
  </Button>
)

export default compose(
  withState('animation', 'setAnimation', ({ hide }) => (hide ? 'remove' : 'show')),
  lifecycle({
    componentWillUnmount() {
      timeout.clear('ctaButtonAnimation')
    },
    componentDidUpdate(prevProps) {
      const { hide, setAnimation, clicked } = this.props
      if (hide !== undefined && hide !== prevProps.hide) {
        setAnimation(hide ? 'hide' : 'init')
        if (clicked) return
        timeout.clear('ctaButtonAnimation')
        timeout.set('ctaButtonAnimation', () => setAnimation(hide ? 'remove' : 'show'), hide ? 600 : 30)
      }
    },
  }),
  branch(({ animation }) => animation === 'remove', renderNothing),
  withHandlers({
    onClick: ({ setClicked, clicked, onClick }) => () => {
      if (clicked) return
      setClicked && setClicked(true)
      onClick && onClick()
    },
  })
)(CtaButton)
