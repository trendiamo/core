import { compose, withHandlers } from 'recompose'

const getRef = element => (element && element.base ? getRef(element.base) : element)

const withRef = (refName, setRefName) => BaseComponent =>
  compose(
    withHandlers(() => {
      let reference
      return {
        [refName]: () => () => getRef(reference),
        [setRefName]: () => ref => (reference = ref && ref.base ? ref : { base: ref }),
      }
    })
  )(BaseComponent)

export default withRef
