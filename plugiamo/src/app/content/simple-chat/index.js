import ChatBase from './chat-base'
import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import emojify from 'ext/emojify'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import useChatActions from 'ext/hooks/use-chat-actions'
import { compose } from 'recompose'
import { Fragment, h } from 'preact'
import { gql, graphql } from 'ext/recompose/graphql'
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
              picUrl
              picRect {
                x
                y
                width
                height
              }
              url
              displayPrice
              videoUrl
              groupWithAdjacent
            }
          }
        }
      }
    `,
    ({ id }) => ({ id })
  )
)(
  ({
    animateOpacity,
    assessment,
    assessmentOptions,
    bridge,
    coverIsMinimized,
    ctaButton,
    ctaButtonClicked,
    data,
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
  }) => {
    const { clickActions, modalsProps } = useChatActions('simpleChat')

    if (!data || data.loading || data.error) return null

    return (
      <Fragment>
        <ChatModals {...modalsProps} />
        <SimpleChat
          animateOpacity={animateOpacity}
          backButtonLabel={getFrekklsConfig().i18n.backButton}
          ChatBase={ChatBase}
          chatBaseProps={{ assessment, assessmentOptions, bridge, ctaButton }}
          chatLogCallbacks={chatLogCallbacks}
          clickActions={clickActions}
          coverIsMinimized={coverIsMinimized}
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
      </Fragment>
    )
  }
)
