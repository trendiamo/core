import { compose, lifecycle } from 'recompose'
import { Rollbar } from 'ext/rollbar'

export default compose(
  lifecycle({
    componentDidCatch(error) {
      Rollbar.error(error)
    },
  })
)(({ children }) => children)
