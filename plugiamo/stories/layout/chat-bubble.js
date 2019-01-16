/* eslint-disable local-rules/no-relative-parent-imports */
import Launcher from 'app/launcher/original'
import Plugin from '../plugin'
import styled from 'styled-components'
import { h } from 'preact'
import { InlineCode, Main } from '../components'

const InnerContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #fff;
`

const LauncherComp = ({ persona, onToggleContent, showingContent }) => (
  <Launcher
    bubbleText="Hi, welcome to Trendiamo!"
    onToggleContent={onToggleContent}
    persona={persona}
    showingContent={showingContent}
  />
)

const chatBubbleDefaults = {
  timeStart: 2,
  timeEnd: 20,
  typingSpeed: 0.04,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
  hideBarAfter: 3,
  startTypingAfter: 0.135,
}

const chatBubbleVarsDescriptions = {
  timeStart: 'Time after which bubble appears on page.',
  timeEnd: 'Time after which bubble disappears. Counts after timeStart + timeStartDuration.',
  typingSpeed: 'Time interval between every letter when typing.',
  timeStartDuration: 'Duration of appearing transition.',
  timeEndDuration: 'Duration of disappearing transition.',
  hideBarAfter: 'Typing bar disappears after this time. Counts after typing ends.',
  startTypingAfter: 'Delay after which typing should start. Counts after timeStart + timeStartDuration',
}

const ChatBubble = () => (
  <div>
    <Main>
      <h2>{'Chat Bubble'}</h2>
      <p>
        <InlineCode>{'ChatBubble'}</InlineCode>
        {' appears after defined interval of time by the side of the '}
        <InlineCode>{'Launcher'}</InlineCode>
      </p>
      <p>
        {'Current settings for the '}
        <InlineCode>{'ChatBubble'}</InlineCode>
        {' are:'}
      </p>
      <ul>
        {Object.keys(chatBubbleDefaults).map(key => (
          <li key={key}>
            <b>{`${key}: `}</b>
            {`${chatBubbleDefaults[key]} sec.`}
            <p>{chatBubbleVarsDescriptions[key]}</p>
            <hr />
          </li>
        ))}
      </ul>
      <hr />
      <h4>{'Things to know'}</h4>
      <ul>
        <li>
          {
            "It's another iframe. Was built this way to give more accessibility to a website on which plugin is installed"
          }
        </li>
        <li>{'After first interaction with the plugin, bubble disappears.'}</li>
      </ul>
    </Main>
    <Plugin Component={<InnerContent>{'plugin content goes here'}</InnerContent>} Launcher={LauncherComp} />
  </div>
)

export default ChatBubble
