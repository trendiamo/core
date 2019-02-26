import chatLog from 'app/content/scripted-chat/chat-log'
import ItemDiv from './item-div'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
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
  withProps(({ persona }) => ({
    personName: persona.name.split(' ')[0],
  })),
  withHandlers({
    updateLogs: ({ setLogs }) => chatLog => setLogs(convertLogs(chatLog.logs)),
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
        flowType: 'scriptedChat',
        hostname: location.hostname,
        personaName: persona.name,
        personaRef: persona.id,
        chatOptionText: chatOption.text,
      })
      chatOption.expanded = true
      if (chatOption.destinationChatStep) {
        chatLog.fetchStep(chatOption.destinationChatStep.id)
      } else if (chatOption.id === 'stop') {
        onStopChat()
      } else {
        console.error('No destination chat step for option', chatOption)
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { client, initialChatStep, personName, updateLogs } = this.props
      chatLog.init(client, personName)
      // we don't remove this listener in componentWillUnmount because preact doesn't fire it inside iframes
      // instead we do a check for chatLog.timestamp in the chatLog logic, to prevent duplicates
      chatLog.addListener(updateLogs)
      chatLog.fetchStep(initialChatStep.id)
    },
  })
)(ConsumerContentDiv)
