import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import emojify from 'ext/emojify'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import withChatActions from 'ext/recompose/with-chat-actions'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { SimpleChat } from 'plugin-base'

const emojifySimpleChat = simpleChat => {
  return {
    ...simpleChat,
    simpleChatSteps: simpleChat.simpleChatSteps.map(simpleChatStep => ({
      ...simpleChatStep,
      key: simpleChatStep.key === 'default' ? simpleChatStep.key : emojify(simpleChatStep.key),
      simpleChatMessages: simpleChatStep.simpleChatMessages.map(simpleChatMessage => ({
        ...simpleChatMessage,
        text:
          simpleChatMessage.type === 'SimpleChatTextMessage' ? emojify(simpleChatMessage.text) : simpleChatMessage.text,
      })),
    })),
  }
}

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
              type
              text
              title
              picture {
                url
              }
              url
              displayPrice
              videoUrl
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
)(
  ({
    modalsProps,
    animateOpacity,
    assessment,
    assessmentOptions,
    backButtonLabel,
    bridge,
    ChatBase,
    chatLogCallbacks,
    clickActions,
    coverIsMinimized,
    ctaButton,
    ctaButtonClicked,
    data,
    FlowBackButton,
    goToPrevStep,
    headerConfig,
    hideCtaButton,
    hideProgressBar,
    lazyLoadingCount,
    Modals,
    onCtaButtonClick,
    onToggleContent,
    persona,
    products,
    progress,
    setCtaButtonClicked,
    showBackButton,
    storeLog,
  }) => (
    <div>
      <ChatModals {...modalsProps} />
      <SimpleChat
        animateOpacity={animateOpacity}
        assessment={assessment}
        assessmentOptions={assessmentOptions}
        backButtonLabel={backButtonLabel}
        bridge={bridge}
        ChatBase={ChatBase}
        chatLogCallbacks={chatLogCallbacks}
        clickActions={clickActions}
        coverIsMinimized={coverIsMinimized}
        ctaButton={ctaButton}
        ctaButtonClicked={ctaButtonClicked}
        data={{ ...data, simpleChat: emojifySimpleChat(data.simpleChat) }}
        FlowBackButton={FlowBackButton}
        goToPrevStep={goToPrevStep}
        headerConfig={headerConfig}
        hideCtaButton={hideCtaButton}
        hideProgressBar={hideProgressBar}
        lazyLoadingCount={lazyLoadingCount}
        Modals={Modals}
        onCtaButtonClick={onCtaButtonClick}
        onToggleContent={onToggleContent}
        persona={persona}
        products={products}
        progress={progress}
        setCtaButtonClicked={setCtaButtonClicked}
        showBackButton={showBackButton}
        storeLog={storeLog}
      />
    </div>
  )
)
