import ChatLogUi from './chat-log-ui'
import Container from './components/base-container'
import Cover from './components/cover'
import ScrollLock from 'ext/scroll-lock'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'

const Base = ({ persona, onToggleContent, getContentRef, setContentRef, handleScroll, data, client }) => (
  <Container contentRef={getContentRef}>
    <ScrollLock>
      <Cover persona={persona} />
      <ChatLogUi
        client={client}
        contentRef={getContentRef}
        data={data}
        onScroll={handleScroll}
        onToggleContent={onToggleContent}
        persona={persona}
        setContentRef={setContentRef}
      />
    </ScrollLock>
  </Container>
)

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
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withHandlers(() => {
    let contentRef
    return {
      setContentRef: () => ref => (contentRef = ref),
      getContentRef: () => () => contentRef,
    }
  })
)(Base)
