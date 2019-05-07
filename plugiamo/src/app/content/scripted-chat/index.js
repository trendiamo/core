import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import withChatActions from 'ext/recompose/with-chat-actions'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { SimpleChat } from 'plugin-base'

export default compose(
  graphql(
    gql`
      query($id: ID!) {
        simpleChat(id: $id) {
          id
          title
          name
          simpleChatSteps {
            id
            key
            simpleChatMessages {
              id
              text
            }
          }
        }
      }
    `,
    ({ id }) => ({ id })
  ),
  withChatActions(),
  withProps({
    backButtonLabel: getFrekklsConfig().i18n.backButton,
    FlowBackButton,
    chatLogCallbacks,
  }),
  branch(({ data }) => !data || data.loading || data.error, renderNothing)
)(({ modalsProps, ...props }) => (
  <div>
    <ChatModals {...modalsProps} />
    <SimpleChat {...props} />
  </div>
))
