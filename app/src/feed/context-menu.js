import IconEllipsisV from 'icons/icon-ellipsis-v'
import React from 'react'
import ShareProduct from './share-product'
import styled from 'styled-components'
import StyledPopper from 'components/styled-popper'
import { Arrow, Manager, Target } from 'react-popper'
import { compose, withHandlers, withState } from 'recompose'

const StyledTarget = styled(Target)`
  color: #888;
  height: 50px;
  width: 50px;
  padding-top: 12px;
  padding-left: 12px;
`

const ContextMenu = ({ handleMenuClick, isOpen, product }) => (
  <Manager>
    <StyledTarget onClick={handleMenuClick}>
      <IconEllipsisV />
    </StyledTarget>
    {isOpen && (
      <StyledPopper placement="bottom">
        <ul>
          <li>
            <ShareProduct product={product} />
          </li>
        </ul>
        <Arrow />
      </StyledPopper>
    )}
  </Manager>
)

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    close: ({ setIsOpen }) => () => setIsOpen(false),
    open: ({ setIsOpen }) => () => setIsOpen(true),
    toggle: ({ isOpen, setIsOpen }) => () => setIsOpen(!isOpen),
  }),
  withHandlers({
    handleMenuClick: ({ toggle }) => event => {
      event.preventDefault()
      toggle()
    },
  })
)(ContextMenu)
