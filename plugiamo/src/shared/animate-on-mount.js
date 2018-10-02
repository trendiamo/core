import { compose, lifecycle, withState } from 'recompose'

const animateOnMount = (component, ...timestamps) =>
  compose(
    withState('animationStep', 'setAnimationStep', 0),
    withState('timeouts', 'setTimeouts', []),
    lifecycle({
      componentDidMount() {
        const { setAnimationStep, setTimeouts } = this.props
        const actualTimestamps = timestamps.length === 0 ? [10] : timestamps
        let absoluteTimestamp = 0

        const timeouts = actualTimestamps.map((relativeTimestamp, i) => {
          absoluteTimestamp += relativeTimestamp
          return setTimeout(() => setAnimationStep(i + 1), absoluteTimestamp)
        })
        setTimeouts(timeouts)
      },
      componentWillUnmount() {
        const { timeouts } = this.props
        timeouts.forEach(timeout => clearTimeout(timeout))
      },
    })
  )(component)

export default animateOnMount
