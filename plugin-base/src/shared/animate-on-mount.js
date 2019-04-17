import { compose, lifecycle, withState } from 'recompose'

const animateOnMount = (component, timeout) =>
  compose(
    withState('entry', 'setEntry', true),
    lifecycle({
      componentDidMount() {
        const { setEntry } = this.props
        setTimeout(() => setEntry(false), timeout || 10)
      },
    })
  )(component)

export default animateOnMount
