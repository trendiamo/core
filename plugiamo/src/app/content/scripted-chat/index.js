import ChatLogUi from './chat-log-ui'
import Cover from 'app/content/cover'
import styled from 'styled-components'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { ChatBackground } from './shared'
import { Consumer } from 'ext/graphql-context'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { TopSlideAnimation } from 'shared/animate'

const FlexDiv = styled.div`
  display: flex;
`

const CoverScriptedChat = ({ persona }) => (
  <FlexDiv>
    <CoverImg src={persona.profilePic.url} />
    <PaddedCover>
      <span>{persona.name}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <PersonaDescription>{persona.description}</PersonaDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;
`

const ContentScriptedChat = ({ scriptedChat, onToggleContent, persona }) => (
  <ChatBackground>
    <H2>{scriptedChat.title}</H2>
    <Consumer>
      {client => (
        <ChatLogUi
          client={client}
          initialChatStep={scriptedChat.chatStep}
          onToggleContent={onToggleContent}
          persona={persona}
        />
      )}
    </Consumer>
  </ChatBackground>
)

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ScriptedChat = compose(
  graphql(
    gql`
      query($id: ID!) {
        scriptedChat(where: { id: $id }) {
          id
          title
          chatStep {
            id
          }
        }
      }
    `,
    ({ id }) => ({ id })
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    scriptedChat: data.scriptedChat,
  }))
)(({ scriptedChat, persona, onToggleContent }) => (
  <FlexContainer>
    <Cover>
      <CoverScriptedChat persona={persona} />
    </Cover>
    <ContentScriptedChat onToggleContent={onToggleContent} persona={persona} scriptedChat={scriptedChat} />
  </FlexContainer>
))

export default ScriptedChat
