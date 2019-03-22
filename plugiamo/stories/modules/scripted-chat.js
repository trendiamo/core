/* eslint-disable local-rules/no-relative-parent-imports */
import CoverScriptedChat from 'app/content/scripted-chat/components/cover'
import Plugin from '../plugin'
import { BelowCover, Cover, emojify } from 'plugin-base'
import { ChatBackground } from 'app/content/scripted-chat/shared'
import { h } from 'preact'
import { Main } from '../components'
import { TextMessage } from 'app/content/scripted-chat/components/message-types'

const ScriptedChatComp = ({ persona }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <Cover>
      <CoverScriptedChat persona={persona} />
    </Cover>
    <BelowCover>
      <ChatBackground>
        <TextMessage dangerouslySetInnerHTML={{ __html: emojify('Winter is coming 😨') }} />
      </ChatBackground>
    </BelowCover>
  </div>
)

const ScriptedChat = () => (
  <div>
    <Main>
      <p>{'Users can receive clarification on a few previously set questions.'}</p>
    </Main>
    <Plugin Component={<ScriptedChatComp />} />
  </div>
)

export default ScriptedChat
