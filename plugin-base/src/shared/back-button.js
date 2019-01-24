import React from 'react'
import styled from 'styled-components'
import { animate } from 'shared/animate'
import { IconChevronLeft } from 'icons'

const Chevron = styled(IconChevronLeft)`
  fill: #aaa;
  height: 12px;
  width: 12px;
  vertical-align: middle;
`

const Span = styled.span`
  margin-left: 3px;
  vertical-align: middle;
`

const BackButton = animate(
  styled(({ className, onClick }) => (
    <button className={className} onClick={onClick} type="button">
      <Chevron />
      <Span>{'Back'}</Span>
    </button>
  ))`
    color: #aaa;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;

    background: transparent;
    outline: none;
    border: none;
    padding: 0;
    margin-bottom: 5px;

    transform: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 'translateY(-200px)' : 'none')};
    transition: transform 0.6s ease;
  `
)

export default BackButton
