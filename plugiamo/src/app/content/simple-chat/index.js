import ChatBase from './chat-base'
import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import useChatActions from 'ext/hooks/use-chat-actions'
import useEmojify from 'ext/hooks/use-emojify'
import { Fragment, h } from 'preact'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { SimpleChat as SimpleChatBase } from 'plugin-base'
import { useEffect, useMemo, useState } from 'preact/hooks'

const emojifySimpleChat = (emojify, simpleChat) => ({
  ...simpleChat,
  simpleChatSections: simpleChat.simpleChatSections.map(simpleChatSection => ({
    ...simpleChatSection,
    key: simpleChatSection.key === 'default' ? simpleChatSection.key : emojify(simpleChatSection.key),
    simpleChatMessages: simpleChatSection.simpleChatMessages.map(simpleChatMessage => ({
      ...simpleChatMessage,
      html:
        simpleChatMessage.type === 'SimpleChatTextMessage' ? emojify(simpleChatMessage.html) : simpleChatMessage.html,
    })),
  })),
})

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
  seller,
  products,
  progress,
  setCtaButtonClicked,
  showBackButton,
  storeLog,
}) => {
  const [simpleChat, setSimpleChat] = useState(null)

  const variables = useMemo(() => ({ id }), [id])

  const data = useGraphql(
    gql`
      query($id: ID!) {
        simpleChat(id: $id) {
          id
          heading
          name
          useSellerAnimation
          simpleChatSections {
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

  const emojify = useEmojify()
  useEffect(() => {
    if (!emojify || !data.simpleChat) return
    setSimpleChat(emojifySimpleChat(emojify, data.simpleChat))
  }, [data.simpleChat, emojify])

  if (!data || data.loading || data.error || !simpleChat) return null

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
        data={{ ...data, simpleChat }}
        FlowBackButton={FlowBackButton}
        goToPrevStep={goToPrevStep}
        headerConfig={headerConfig}
        hideCtaButton={hideCtaButton}
        hideProgressBar={hideProgressBar}
        lazyLoadingCount={lazyLoadingCount}
        Modals={Modals}
        onCtaButtonClick={onCtaButtonClick}
        onToggleContent={onToggleContent}
        products={products}
        progress={progress}
        seller={seller}
        setCtaButtonClicked={setCtaButtonClicked}
        showBackButton={showBackButton}
        storeLog={storeLog}
      />
    </Fragment>
  )
}

export default SimpleChat
