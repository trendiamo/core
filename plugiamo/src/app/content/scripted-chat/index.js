import ChatLogUi from './chat-log-ui'
import Cover from 'app/content/cover'
import styled from 'styled-components'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { ChatBackground } from './shared'
import { Consumer } from 'ext/graphql-context'
import { CoverImg, InfluencerDescription, PaddedCover } from 'shared/cover'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { TopSlideAnimation } from 'shared/animate'

const FlexDiv = styled.div`
  display: flex;
`

const CoverScriptedChat = ({ influencer }) => (
  <FlexDiv>
    <CoverImg src={influencer.profilePic.url} />
    <PaddedCover>
      <span>{influencer.name}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <InfluencerDescription>{influencer.description}</InfluencerDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;
`

const ContentScriptedChat = compose(
  withProps(({ influencer }) => ({
    firstName: influencer.name.split(' ')[0],
  }))
)(({ chat, firstName, onToggleContent }) => (
  <ChatBackground>
    <H2>{chat.title}</H2>
    <Consumer>
      {client => (
        <ChatLogUi
          client={client}
          initialChatStep={chat.chatStep}
          onToggleContent={onToggleContent}
          personName={firstName}
        />
      )}
    </Consumer>
  </ChatBackground>
))

const ScriptedChat = compose(
  graphql(
    gql`
      query($id: ID!) {
        chat(where: { id: $id }) {
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
    chat: data.chat,
  }))
  <div>
)(({ chat, influencer, onToggleContent }) => (
    <Cover>
      <CoverScriptedChat influencer={influencer} />
    </Cover>
    <ContentScriptedChat chat={chat} influencer={influencer} onToggleContent={onToggleContent} />
  </div>
))

export default ScriptedChat
