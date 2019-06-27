import ChatBase from './chat-base'
import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import emojify from 'ext/emojify'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import useChatActions from 'ext/hooks/use-chat-actions'
import { Fragment, h } from 'preact'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { SimpleChat as SimpleChatBase } from 'plugin-base'
import { useMemo } from 'preact/hooks'

const emojifySimpleChat = simpleChat => {
  return {
    ...simpleChat,
    simpleChatSteps: simpleChat.simpleChatSteps.map(simpleChatStep => ({
      ...simpleChatStep,
      key: simpleChatStep.key === 'default' ? simpleChatStep.key : emojify(simpleChatStep.key),
      simpleChatMessages: simpleChatStep.simpleChatMessages.map(simpleChatMessage => ({
        ...simpleChatMessage,
        html:
          simpleChatMessage.type === 'SimpleChatTextMessage' ? emojify(simpleChatMessage.html) : simpleChatMessage.html,
      })),
    })),
  }
}

const SimpleChat = ({
  animateOpacity,
  assessment,
  assessmentOptions,
  coverIsMinimized,
  ctaButton,
  ctaButtonClicked,
  goToPrevStep,
  headerConfig,
  hideCtaButton,
  hideProgressBar,
  id,
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
  const variables = useMemo(() => ({ id }), [id])

  const data = useGraphql(
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
              html
              title
              picture {
                url
              }
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
    variables
  )

  const { clickActions, modalsProps } = useChatActions({ flowType: 'simpleChat' })

  if (!data || data.loading || data.error) return null

  return (
    <Fragment>
      <ChatModals {...modalsProps} />
      <SimpleChatBase
        animateOpacity={animateOpacity}
        backButtonLabel={getFrekklsConfig().i18n.backButton}
        ChatBase={ChatBase}
        chatBaseProps={{ assessment, assessmentOptions, ctaButton }}
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

export default SimpleChat
