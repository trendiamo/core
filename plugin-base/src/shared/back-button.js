import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import useIsEntering from 'shared/use-is-entering'
import { IconChevronLeft } from 'icons'

const Chevron = styled(IconChevronLeft)`
  height: 12px;
  width: 12px;
  vertical-align: middle;
`

const Span = styled.span`
  margin-left: 3px;
  vertical-align: middle;
`

const Button = styled(props => (
  <button type="button" {...omit(props, ['buttonConfig', 'flexibleCover', 'hide', 'isEntering'])} />
))`
  color: ${({ buttonConfig = {} }) => buttonConfig.textColor || '#aaa'};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  background: ${({ buttonConfig = {} }) => buttonConfig.backgroundColor || 'transparent'};
  outline: none;
  border: none;
  padding: 0;
  margin-bottom: 5px;

  transform: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 'translateY(-200px)' : 'none')};
  ${({ hide }) =>
    hide &&
    `
      opacity: 0;
      pointer-events: none;
    `}
  transition: opacity 0.6s, transform 0.6s ease;
  z-index: 120;
  ${({ flexibleCover }) =>
    flexibleCover &&
    `
    position: absolute;
    top: 5px;
    left: 5px;
    margin: 0;
    padding: 1px 5px 1px 2px;
    border-radius: 4px;
  `}
  svg {
    fill: ${({ buttonConfig = {} }) => buttonConfig.textColor || '#aaa'};
  }
`

const BackButton = ({ onClick, label, backButtonConfig = {}, hide, flexibleCover }) => {
  const isEntering = useIsEntering()
  const newOnClick = useCallback((...args) => hide || onClick(args), [hide, onClick])

  return (
    <Button
      buttonConfig={backButtonConfig}
      flexibleCover={flexibleCover}
      hide={hide}
      isEntering={isEntering}
      onClick={newOnClick}
    >
      <Chevron />
      <Span>{label || 'Back'}</Span>
    </Button>
  )
}

export default BackButton
