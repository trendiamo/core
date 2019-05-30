import chatLogCallbacks from 'shared/chat-log-callbacks'
import ChatModals from 'shared/chat-modals'
import CtaButton from 'special/bridge/cta-button'
import emojify from 'ext/emojify'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import ProgressBar from 'special/assessment/progress-bar'
import withChatActions from 'ext/recompose/with-chat-actions'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { ChatContent, ChatLogUi, SimpleChat, SimpleChatCover } from 'plugin-base'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'

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

const ChatBase = ({
  assessment,
  assessmentOptions,
  bridge,
  data,
  persona,
  backButtonLabel,
  onToggleContent,
  contentRef,
  handleScroll,
  headerConfig,
  ctaButton,
  onCtaButtonClick,
  coverMinimized,
  lazyLoadingCount,
  lazyLoadActive,
  setLazyLoadActive,
  products,
  progress,
  hideProgressBar,
  ctaButtonClicked,
  setCtaButtonClicked,
  hideCtaButton,
  touch,
  storeLog,
  goToPrevStep,
  showBackButton,
  clickActions,
  FlowBackButton,
  chatLogCallbacks,
}) => (
  <div>
    <SimpleChatCover
      assessment={assessment}
      backButtonLabel={backButtonLabel}
      bridge={bridge}
      clickActions={clickActions}
      FlowBackButton={FlowBackButton}
      goToPrevStep={goToPrevStep}
      header={data.header}
      headerConfig={headerConfig}
      minimized={coverMinimized}
      persona={persona}
      showBackButton={showBackButton}
      step={data}
    />
    {progress >= 0 && <ProgressBar hide={hideProgressBar} progress={progress} />}
    <ChatLogUi
      assessment={assessment}
      assessmentOptions={assessmentOptions}
      bridge={bridge}
      chatLogCallbacks={chatLogCallbacks}
      clickActions={clickActions}
      contentRef={contentRef}
      data={data}
      lazyLoadActive={lazyLoadActive}
      lazyLoadingCount={lazyLoadingCount}
      onScroll={handleScroll}
      onToggleContent={onToggleContent}
      persona={persona}
      products={products}
      ref={contentRef}
      setLazyLoadActive={setLazyLoadActive}
      storeLog={storeLog}
      touch={touch}
    >
      <ChatContent />
    </ChatLogUi>
    {ctaButton && (
      <CtaButton
        clicked={ctaButtonClicked}
        ctaButton={ctaButton}
        hide={hideCtaButton}
        onClick={onCtaButtonClick}
        setClicked={setCtaButtonClicked}
      />
    )}
  </div>
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
