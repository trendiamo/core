import { compose, lifecycle, withState } from 'recompose'

const animateOnMount = (component, timeout) =>
  compose(
    withState('entry', 'setEntry', ({ skipEntry }) => !skipEntry),
    lifecycle({
      componentDidMount() {
        const { setEntry, skipEntry } = this.props
        if (skipEntry) return
        setTimeout(() => setEntry(false), timeout || 10)
      },
    })
  )(component)

export default animateOnMount
