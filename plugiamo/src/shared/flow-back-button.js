import { BackButton } from 'plugin-base'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { h } from 'preact'
import { markGoBack, shouldRenderBack } from 'app/setup/flow-history'

const FlowBackButton = compose(
  withHandlers({
    onClick: () => () => {
      markGoBack()
      window.history.back()
    },
  }),
  branch(() => !shouldRenderBack(), renderNothing)
)(({ onClick }) => <BackButton onClick={onClick} />)

export default FlowBackButton
