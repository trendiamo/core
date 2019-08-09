import ButtonFrame from './button-frame'
import Content from './content'
import React, { useCallback, useEffect, useReducer } from 'react'
import { buttonContainerStyle, containerStyle } from './styles'

const Button = ({ message, action, animation, clicked, frameStyleStr, handleClick, position, value }) => {
  const onClick = useCallback(() => handleClick(value), [value, handleClick])

  return (
    <div style={buttonContainerStyle({ hasMargin: value === 'no' })}>
      <ButtonFrame
        action={action}
        animation={animation}
        clicked={clicked}
        isDelayed={value === 'yes'}
        position={position}
        styleStr={frameStyleStr}
        value={value}
      >
        <Content action={action} message={message} onClick={onClick} />
      </ButtonFrame>
    </div>
  )
}

const Buttons = ({
  animation,
  data,
  disappear,
  position,
  launcherConfig,
  onClick,
  offset,
  setDisappear,
  pluginZIndex,
}) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'merge') {
        return { ...state, ...action.value }
      } else if (action.type === 'mergeCb') {
        return action.callback(state)
      } else if (action.type === 'click') {
        if (state.clicked || !onClick) return state
        setDisappear(true)
        onClick(action.value)
        return { ...state, clicked: action.value }
      } else {
        throw new Error()
      }
    },
    {
      action: null,
      clicked: null,
    }
  )

  const handleClick = useCallback(value => {
    dispatch({ type: 'click', value })
  }, [])

  useEffect(() => {
    dispatch({ type: 'merge', value: { action: 'appear' } })
  }, [])

  useEffect(() => {
    if (disappear) {
      dispatch({
        type: 'mergeCb',
        callback: state => {
          if (state.action === 'appear') {
            return { ...state, action: 'fadeOut' }
          } else {
            return state
          }
        },
      })
    }
  }, [disappear])

  if (!state.action) return null

  return (
    <div style={containerStyle({ position, action: state.action, launcherConfig, offset, pluginZIndex })}>
      <Button
        action={state.action}
        animation={animation}
        clicked={state.clicked}
        handleClick={handleClick}
        message={data.buttonNo}
        position={position}
        value="no"
      />
      <Button
        action={state.action}
        animation={animation}
        clicked={state.clicked}
        handleClick={handleClick}
        message={data.buttonYes}
        position={position}
        value="yes"
      />
    </div>
  )
}

export default Buttons
