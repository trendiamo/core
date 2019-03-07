import ChatLogUi from './chat-log-ui'
import Cover from 'app/content/scripted-chat/components/cover'
import Modal from './modal'
import productsDB from 'special/assessment/products-db'
import ScrollLock from 'ext/scroll-lock'
import { compose, withProps } from 'recompose'
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
  withProps({
    results: productsDB.products,
  })
)(StoreTemplate)

export default Store
