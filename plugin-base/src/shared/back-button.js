import React from 'react'
import styled from 'styled-components'
import { animate } from 'shared/animate'
import { IconChevronLeft } from 'icons'

const Chevron = styled(IconChevronLeft)`
  fill: ${({ config }) => config.textColor || '#aaa'};
  height: 12px;
  width: 12px;
  vertical-align: middle;
`

const Span = styled.span`
  margin-left: 3px;
  vertical-align: middle;
`

const BackButton = animate(
  styled(({ className, onClick, config = {}, hide }) => (
    <button className={className} onClick={hide ? () => {} : onClick} type="button">
      <Chevron config={config} />
      <Span>{'Back'}</Span>
    </button>
  ))`
    color: ${({ config = {} }) => config.textColor || '#aaa'};
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;

    background: ${({ config = {} }) => config.backgroundColor || 'transparent'};
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
  `
)

export default BackButton
