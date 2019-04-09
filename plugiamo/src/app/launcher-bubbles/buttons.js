import Frame from 'shared/frame'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { positioning } from 'utils'

const ButtonFrame = styled(props => <Frame {...omit(props, ['action', 'button', 'left', 'clicked'])} />)`
  height: ${({ action }) => (action === 'disappear' ? '40px' : 0)};
  width: ${({ action }) => (action === 'disappear' ? '100%' : 0)};
  border: 2px solid #999;
  background: #fff;
  box-shadow: 2px 7px 40px 2px rgba(64, 67, 77, 0.28), 0px 2px 4px 0px rgba(0, 0, 0, 0.17);
  border-radius: 22px;
  overflow: hidden;
  animation-name: ${({ action }) =>
    action === 'appear'
      ? '_frekkls_bubble_button_appear'
      : action === 'disappear'
      ? '_frekkls_bubble_button_disappear'
      : 'none'};
  animation-delay: ${({ button }) => button.appearsAfter}s;
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
  ${({ button, clicked }) =>
    button.value === clicked &&
    `
    transition: background 0.1s;
    animation-delay: 1s;
    background: #ddd;
  `}
  & + iframe {
    margin-left: 8px;
  }
  @keyframes _frekkls_bubble_button_appear {
    0% {
      height: 0;
      width: 0%;
      border-radius: 50%;
    }
    50% {
      border-radius: 50%;
    }
    100% {
      height: 40px;
      width: 100%;
    }
  }
  @keyframes _frekkls_bubble_button_disappear {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

const containerStyle = ({ position, action, config }) => ({
  position: 'fixed',
  display: 'flex',
  width: '225px',
  height: '40px',
  zIndex: '2147483005',
  justifyContent: 'space-between',
  pointerEvents: action === 'disappear' && 'none',
  ...positioning.get({ type: 'launcherBubbles', position, noStyle: true, reset: true, config }),
})

const buttonContainerStyle = index => ({
  flex: 1,
  display: 'flex',
  [index === 0 && 'marginRight']: '10px',
  justifyContent: 'center',
  alignItems: 'center',
})

const Content = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  transition: 2s opacity;
  transition-delay: 0.3s;
  opacity: ${({ action }) => (action === 'appear' ? 0 : 1)};
  cursor: pointer;
  animation: ${({ action }) => (action === 'appear' ? '_frekkls_bubble_btn_text_appear 1s' : 'none')};
  animation-delay: ${({ action }) => (action === 'appear' ? 0.5 : 0)}s;
  animation-fill-mode: forwards;
  @keyframes _frekkls_bubble_btn_text_appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Text = styled.div`
  white-space: nowrap;
  backface-visibility: hidden;
  user-select: none;
  pointer-events: none;
`

const ButtonsTemplate = ({ animation, bubble, position, action, handleClick, clicked, config }) => (
  <div style={containerStyle({ position, action, config })}>
    {bubble.buttons.map((button, index) => (
      <div key={button.value} style={buttonContainerStyle(index)}>
        <ButtonFrame action={action} animation={animation} button={button} clicked={clicked} left position={position}>
          <Content action={action} clicked={clicked} onClick={handleClick(button.value)}>
            <Text>{button.message}</Text>
          </Content>
        </ButtonFrame>
      </div>
    ))}
  </div>
)

const Buttons = compose(
  withState('action', 'setAction', null),
  withState('clicked', 'setClicked', null),
  withHandlers({
    handleClick: ({ setDisappear, setClicked }) => value => () => {
      setDisappear(true)
      setClicked(value)
      mixpanel.track('Clicked Outro Button', { hostname: location.hostname, value })
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
