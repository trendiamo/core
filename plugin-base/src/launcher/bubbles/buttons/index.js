import ButtonFrame from './button-frame'
import Content from './content'
import React from 'react'
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from 'recompose'
import { buttonContainerStyle, containerStyle } from './styles'

const ButtonsTemplate = ({ animation, bubble, position, action, handleClick, clicked, launcherConfig }) => (
  <div style={containerStyle({ position, action, launcherConfig })}>
    {bubble.buttons.map((button, index) => (
      <div key={button.value} style={buttonContainerStyle(index)}>
        <ButtonFrame action={action} animation={animation} button={button} clicked={clicked} left position={position}>
          <Content action={action} button={button} clicked={clicked} handleClick={handleClick} />
        </ButtonFrame>
      </div>
    ))}
  </div>
)

const Buttons = compose(
  withState('action', 'setAction', null),
  withState('clicked', 'setClicked', null),
  withHandlers({
    handleClick: ({ setDisappear, clicked, setClicked, onClick }) => value => () => {
      if (clicked) return
      setDisappear(true)
      setClicked(value)
      onClick && onClick(value)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setAction, bubble } = this.props
      setTimeout(() => {
        setAction('appear')
      }, bubble.timeStart * 1000)
    },
    componentDidUpdate() {
      const { disappear, setAction, action } = this.props
      if (disappear && action === 'appear') {
        setAction('disappear')
      }
    },
  }),
  branch(({ showingContent, action }) => !action || showingContent, renderNothing)
)(ButtonsTemplate)

export default Buttons
