import chatLog from 'app/content/scripted-chat/chat-log'
import ItemDiv from './item-div'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { convertLogs } from 'app/content/scripted-chat/shared'
import { h } from 'preact'

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;
`

const ConsumerContentDiv = ({ logs, title, contentRef, onOptionClick, animateNewOptions }) => (
  <div>
    <H2>{title}</H2>
    {logs.map((logSection, index) => (
      /* eslint-disable react/no-array-index-key */
      <ItemDiv
        callback={logSection.type === 'message' && animateNewOptions}
        clickChatOption={onOptionClick}
        contentRef={contentRef}
        key={index}
        logSection={logSection}
      />
    ))}
  </div>
)

export default compose(
  withState('logs', 'setLogs', []),
  withHandlers({
    updateLogs: ({ setLogs }) => ({ data }) => setLogs(convertLogs(data)),
  }),
  withHandlers({
    animateNewOptions: ({ logs, setLogs }) => () => {
      const newOptions = logs[logs.length - 1]
      if (newOptions && newOptions.type === 'option') {
        logs[logs.length - 1].logs.map(log => {
          log.animate = true
        })
        setLogs(logs)
      }
    },
    onOptionClick: ({ onStopChat, persona, configMinHeight }) => chatOption => {
      configMinHeight()
      mixpanel.track('Clicked Chat Option', {
        flowType: 'simpleChat',
        hostname: location.hostname,
        personaName: persona.name,
        personaRef: persona.id,
        chatOptionText: chatOption.text,
      })
      if (chatOption.id === 'stop') {
        return onStopChat()
      }
      chatLog.selectOption(chatOption)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { updateLogs, data } = this.props
      chatLog.init({ data, listeners: [updateLogs] })
    },
  })
)(ConsumerContentDiv)
