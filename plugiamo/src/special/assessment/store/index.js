import assessProducts from './assess-products'
import Chat from 'app/content/scripted-chat/components/chat'
import ItemDiv from 'app/content/scripted-chat/components/item-div'
import Modal from './modal'
import { ChatBackground, convertLogs } from 'app/content/scripted-chat/shared'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { fetchProducts } from 'special/assessment/utils'
import { h } from 'preact'
import { isSmall } from 'utils'

const ChatLogUiTemplate = ({
  onScroll,
  results,
  setShowingContent,
  setShowingLauncher,
  setContentRef,
  contentRef,
  setBackgroundRef,
  touch,
  minHeight,
  logSection,
  step,
}) => (
  <Chat onScroll={onScroll} ref={setContentRef} touch={touch}>
    <ChatBackground ref={setBackgroundRef} style={{ minHeight }}>
      <ItemDiv animate={false} contentRef={contentRef} dontScroll logSection={logSection} />
    </ChatBackground>
    {!isSmall() && (
      <Modal
        header={step.header}
        results={results}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
      />
    )}
  </Chat>
)

const prepareProductsToChat = results => {
  return [{ message: { assessmentProducts: [...results], type: 'assessmentProducts' }, type: 'message' }]
}

export default compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0),
  withState('results', 'setResults', []),
  lifecycle({
    componentDidMount() {
      const _this = this
      fetchProducts(results => {
        const { setResults, tags } = _this.props
        const client = results.find(client => client.hostname === location.hostname)
        setResults(assessProducts(client.products, tags))
      })
    },
  }),
  withProps(({ results }) => ({
    logSection: {
      type: 'message',
      logs: prepareProductsToChat(results),
    },
  })),
  withHandlers(() => {
    let backgroundRef
    return {
      setContentRef: ({ setContentRef }) => ref => {
        setContentRef(ref)
      },
      setBackgroundRef: () => ref => (backgroundRef = ref),
      getBackgroundRef: () => () => backgroundRef,
    }
  }),
  withHandlers({
    configMinHeight: ({ setMinHeight, getBackgroundRef, minHeight }) => () => {
      if (getBackgroundRef().base.clientHeight !== minHeight) {
        setMinHeight(getBackgroundRef().base.clientHeight)
      }
    },
    updateLogs: ({ setLogs }) => ({ data }) => setLogs(convertLogs(data)),
  })
)(ChatLogUiTemplate)
