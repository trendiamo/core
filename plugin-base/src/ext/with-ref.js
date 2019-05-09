import { compose, withHandlers } from 'recompose'

const withRef = (refName, setRefName) => BaseComponent =>
  compose(
    withHandlers(() => {
      let ref
      return {
        [refName]: () => () => ref,
        [setRefName]: () => newRef => (ref = newRef),
      }
    })
  )(BaseComponent)

export default withRef
