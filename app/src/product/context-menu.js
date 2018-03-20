import IconEllipsisV from 'icons/icon-ellipsis-v'
import React from 'react'
import { Arrow, Manager, Popper, Target } from 'react-popper'
import { compose, withHandlers, withState } from 'recompose'

const ContextMenu = ({ close, handleMenuClick, isOpen, onFlag }) => (
  <Manager style={{ minWidth: '20px', position: 'relative' }}>
    <Target className="target" onClick={handleMenuClick}>
      <IconEllipsisV />
    </Target>
    {isOpen && (
      <Popper className="popper" placement="bottom">
        <ul>
          <li>
            <span onClick={onFlag(close)}>{'Flag as inappropriate'}</span>
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
    toggle: ({ isOpen, setIsOpen }) => () => setIsOpen(!isOpen),
  }),
  withHandlers({
    handleMenuClick: ({ toggle }) => event => {
      event.preventDefault()
      toggle()
    },
  })
)(ContextMenu)
