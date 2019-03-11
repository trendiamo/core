import ChatLogUi from './chat-log-ui'
import Cover from 'app/content/scripted-chat/components/cover'
import Modal from './modal'
import ScrollLock from 'ext/scroll-lock'
import { compose, lifecycle, withState } from 'recompose'
import { h } from 'preact'
import { isSmall } from 'utils'

const StoreTemplate = ({
  coverMinimized,
  getContentRef,
  goToNextStep,
  handleScroll,
  setContentRef,
  touch,
  step,
  results,
}) => (
  <ScrollLock>
    <Cover hackathon header={step.header} minimized={coverMinimized} />
    <ChatLogUi
      contentRef={getContentRef}
      coverMinimized={coverMinimized}
      goToNextStep={goToNextStep}
      onScroll={handleScroll}
      results={results}
      setContentRef={setContentRef}
      touch={touch}
    />
    {!isSmall() && <Modal header={step.header} results={results} />}
  </ScrollLock>
)

const Store = compose(
  withState('results', 'setResults', []),
  lifecycle({
    componentDidMount() {
      const _this = this
      fetch('https://console-assets-frb.ams3.digitaloceanspaces.com/manual/improv-clients.js', {
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
        .then(response => response.json())
        .then(results => {
          const { setResults } = _this.props
          const client = results.find(client => client.hostname === location.hostname)
          // TODO: inference system || setResults(inferenceSystem(client.products))
          setResults(client.products)
        })
    },
  })
)(StoreTemplate)

export default Store
