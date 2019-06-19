import styled from 'styled-components'
import { h } from 'preact'
import { timeout } from 'plugin-base'
import { useCallback, useEffect, useState } from 'preact/hooks'

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

const CtaButton = ({ clicked, ctaButton, hide, onClick, setClicked }) => {
  const [animation, setAnimation] = useState(hide ? 'remove' : 'show')

  useEffect(() => () => timeout.clear('ctaButtonAnimation'), [])

  useEffect(() => {
    if (hide === undefined) return
    setAnimation(hide ? 'hide' : 'init')
    if (clicked) return
    timeout.clear('ctaButtonAnimation')
    timeout.set('ctaButtonAnimation', () => setAnimation(hide ? 'remove' : 'show'), hide ? 600 : 30)
  }, [clicked, hide])

  const newOnClick = useCallback(() => {
    if (clicked) return
    setClicked && setClicked(true)
    onClick && onClick()
  }, [clicked, onClick, setClicked])

  if (animation === 'remove') return null

  return (
    <Button animation={animation} ctaButton={ctaButton} onClick={newOnClick} type="button">
      {ctaButton.label}
    </Button>
  )
}

export default CtaButton
