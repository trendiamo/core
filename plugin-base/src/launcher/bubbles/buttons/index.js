import ButtonFrame from './button-frame'
import Content from './content'
import React from 'react'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { buttonContainerStyle, containerStyle } from './styles'

const Button = ({ button, action, animation, clicked, frameStyleStr, handleClick, position }) => (
  <div style={buttonContainerStyle(button.value === 'no')}>
    <ButtonFrame
      action={action}
      animation={animation}
      button={button}
      clicked={clicked}
      position={position}
      styleStr={frameStyleStr}
    >
      <Content action={action} button={button} clicked={clicked} handleClick={handleClick} />
    </ButtonFrame>
  </div>
)

const ButtonsTemplate = ({ animation, bubble, position, action, handleClick, clicked, launcherConfig, offset }) => (
  <div style={containerStyle({ position, action, launcherConfig, offset })}>
    <Button
      action={action}
      animation={animation}
      button={bubble.buttonNo}
      clicked={clicked}
      handleClick={handleClick}
      position={position}
    />
    <Button
      action={action}
      animation={animation}
      button={bubble.buttonYes}
      clicked={clicked}
      handleClick={handleClick}
      position={position}
    />
  </div>
)

const Buttons = compose(
  withState('action', 'setAction', null),
  withState('clicked', 'setClicked', null),
  withProps(({ bubble }) => ({
    areEmpty: bubble && !bubble.buttonNo.message && !bubble.buttonYes.message,
  })),
  withHandlers({
    handleClick: ({ setDisappear, clicked, setClicked, onClick }) => value => () => {
      if (clicked || !onClick) return
      setDisappear(true)
      setClicked(value)
      onClick(value)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setAction, areEmpty, bubble } = this.props
      if (!areEmpty && bubble) {
        setTimeout(() => {
          setAction('appear')
        }, bubble.timeStart * 1000)
      }
    },
    componentDidUpdate(prevProps) {
      const { disappear, setAction, action, areEmpty } = this.props
      if (prevProps.areEmpty !== areEmpty) {
        setAction(areEmpty ? 'disappear' : 'appear')
      }
      if (disappear && action === 'appear') {
        setAction('fadeOut')
      }
    },
  }),
  branch(({ showingContent, action }) => !action || showingContent, renderNothing)
)(ButtonsTemplate)

export default Buttons
