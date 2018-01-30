import IconEllipsisV from './icon-ellipsis-v'
import React from 'react'
import ShareProduct from './share-product'
import { Manager, Target, Popper, Arrow } from 'react-popper'
import { compose, withHandlers, withState } from 'recompose'

const ContextMenu = ({ handleMenuClick, isOpen, product }) => (
  <Manager className="manager">
    <Target className="target" onClick={handleMenuClick}>
      <IconEllipsisV />
    </Target>
    {isOpen && (
      <Popper placement="bottom" className="popper">
        <ul>
          <li>
            <ShareProduct product={product} />
          </li>
        </ul>
        <Arrow className="popper__arrow" />
      </Popper>
    )}
  </Manager>
)

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    close: ({ setIsOpen }) => () => setIsOpen(false),
    open: ({ setIsOpen }) => () => setIsOpen(true),
    toggle: ({ isOpen, setIsOpen }) => () => setIsOpen(!isOpen)
  }),
  withHandlers({
    handleMenuClick: ({ toggle }) => event => {
      event.preventDefault()
      toggle()
    }
  })
)(ContextMenu)
