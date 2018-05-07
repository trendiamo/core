import IconEllipsisV from 'icons/icon-ellipsis-v'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { Manager, Popper, Reference } from 'react-popper'

const PopperContainer = styled.div`
  position: relative;
`

const PopperContent = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.13);
  min-width: 200px;
  font-size: 85%;
  li {
    font-weight: 500;
    margin-bottom: 1rem;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: transparent;
  border-bottom-color: white;
  border-width: 0 5px 5px 5px;
  top: -5px;
  right: 12px;
  margin-top: 0;
  margin-bottom: 0;
`

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: transparent;
  z-index: 1;
`

const IconContainer = styled.div`
  color: #c5c5c5;
  cursor: pointer;
`

const popperStyle = {
  left: 'initial',
  right: 0,
  transform: 'translate3d(11px, 32px, 0px)',
  zIndex: 1,
}

const ContextMenu = ({ children, className, close, handleMenuClick, isOpen }) => (
  <Manager>
    <PopperContainer className={className}>
      <Reference>
        {({ ref }) => (
          <IconContainer onClick={handleMenuClick} ref={ref}>
            <IconEllipsisV />
          </IconContainer>
        )}
      </Reference>
      {isOpen && (
        <React.Fragment>
          <Overlay onClick={close} />
          <Popper placement="bottom">
            {({ ref, style, placement, arrowProps }) => (
              <div
                data-placement={placement}
                ref={ref}
                style={{
                  ...style,
                  ...popperStyle,
                }}
              >
                <PopperContent>{children}</PopperContent>
                <div ref={arrowProps.ref}>
                  <Arrow />
                </div>
              </div>
            )}
          </Popper>
        </React.Fragment>
      )}
    </PopperContainer>
  </Manager>
)

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    close: ({ setIsOpen }) => () => setIsOpen(false),
    toggle: ({ isOpen, setIsOpen }) => () => setIsOpen(!isOpen),
  }),
  withHandlers({
    handleMenuClick: ({ toggle }) => event => {
      event.preventDefault()
      toggle()
    },
  })
)(ContextMenu)
