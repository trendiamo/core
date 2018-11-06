import { ChatBackground } from './shared'
import ChatLogUi from './chat-log-ui'
import { Consumer } from 'ext/graphql-context'
import { h } from 'preact'
import styled from 'styled-components'
import { TopSlideAnimation } from 'shared/animate'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { CoverImg, InfluencerDescription, PaddedCover } from 'shared/cover'
import { gql, graphql } from 'ext/recompose/graphql'

const FlexDiv = styled.div`
  display: flex;
`

const CoverScriptedChat = compose(
  withProps(({ id, website }) => ({
    chat: website.chats.find(e => e.id === id),
  }))
)(({ chat }) => (
  <FlexDiv>
    <CoverImg src={chat.influencer.profilePic.url} />
    <PaddedCover>
      <span>{chat.influencer.name}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <InfluencerDescription>{chat.influencer.description}</InfluencerDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
))

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;
`

const ContentScriptedChat = compose(
  withProps(({ id, website }) => ({
    chat: website.chats.find(e => e.id === id),
  })),
  withProps(({ chat }) => ({
    firstName: chat.influencer.name.split(' ')[0],
  })),
  graphql(
    gql`
      query($id: ID!) {
        chat(where: { id: $id }) {
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

export { CoverScriptedChat, ContentScriptedChat }
