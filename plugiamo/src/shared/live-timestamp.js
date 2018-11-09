import timeago from 'timeago.js'
import { compose, lifecycle, withHandlers } from 'recompose'
import { h } from 'preact'

const LiveTimestamp = compose(
  withHandlers(() => {
    let timestampRef
    return {
      setTimestampRef: () => ref => (timestampRef = ref),
      start: () => () => {
        timeago().render(timestampRef)
      },
      stop: () => () => {
        timeago.cancel(timestampRef)
      },
    }
  }),
  lifecycle({
    componentDidMount() {
      const { start } = this.props
      start()
    },
    componentWillUnmount() {
      const { stop } = this.props
      stop()
    },
  })
)(({ setTimestampRef, timestamp }) => (
  <span dateTime={timestamp} ref={setTimestampRef}>
    {timeago().format(timestamp)}
  </span>
))

export default LiveTimestamp
