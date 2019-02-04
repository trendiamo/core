import ChatMessages from './chat-messages'
import data from './data'
import styled from 'styled-components'
import { BelowCover, Cover } from './cover'
import { h } from 'preact'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const NowadaysBase = () => (
  <ColFlexDiv>
    <Cover persona={data.persona} product={data.product} />
    <BelowCover>
      <ChatMessages chatMessages={data.chatMessages} />
    </BelowCover>
  </ColFlexDiv>
)

export default NowadaysBase
