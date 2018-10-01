import { compose, lifecycle, withState } from 'recompose'

const animateOnMount = (component, ...timestamps) =>
  compose(
    withState('animationStep', 'setAnimationStep', 0),
    lifecycle({
      componentDidMount() {
        const { setAnimationStep } = this.props
        const actualTimestamps = timestamps.length === 0 ? [10] : timestamps
        let absoluteTimestamp = 0

        actualTimestamps.forEach((relativeTimestamp, i) => {
          absoluteTimestamp += relativeTimestamp
          setTimeout(() => setAnimationStep(i + 1), absoluteTimestamp)
        })
      },
    })
  )(component)

export default animateOnMount
