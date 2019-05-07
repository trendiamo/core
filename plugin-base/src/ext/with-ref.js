import { compose, withHandlers } from 'recompose'

const getRef = element => {
  if (!element || !element.base) return
  if (element.base.constructor && element.base.constructor.name === 'StyledComponent') {
    return element.base.base || element.base
  }
  return element.base || element
}

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
