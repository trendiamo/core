/* eslint-disable local-rules/no-relative-parent-imports */
import Cover, { BelowCover } from 'app/content/cover'
import Plugin from '../plugin'
import { ChatBackground, ChatMessage, ChatOptions } from 'app/content/scripted-chat/shared'
import { CoverScriptedChat } from 'app/content/scripted-chat'
import { h } from 'preact'

const ScriptedChatComp = ({ persona }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Cover>
      <CoverScriptedChat persona={persona} />
    </Cover>
    <BelowCover>
      <ChatBackground>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {Array.from(Array(4)).map(e => (
            <ChatMessage
              isMessageShown
              key={e}
              log={{ from: 'Jon', message: { text: 'Winter is coming 😨' }, timestamp: Date.now() }}
            />
          ))}
          <ChatOptions log={{ options: [{ id: 1, text: 'Fight' }, { id: 2, text: 'Run' }] }} />
        </div>
      </ChatBackground>
    </BelowCover>
  </div>
)

const ScriptedChat = () => <Plugin Component={<ScriptedChatComp />} />

export default ScriptedChat
