// Taken from react-router, simplified, and added a wait for onChange
import { cloneElement } from 'preact'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { matchUrl } from 'plugin-base'

function assign(obj, props) {
  for (let i in props) {
    obj[i] = props[i]
  }
  return obj
}

const getMatchingChildren = (children, url) =>
  (Array.isArray(children) ? children : [children])
    .map(vnode => {
      let matches = matchUrl(url, vnode.attributes.path)
      if (matches) {
        let newProps = { matches, url }
        assign(newProps, matches)
        delete newProps.ref
        delete newProps.key
        return cloneElement(vnode, newProps)
      }
    })
    .filter(Boolean)

const Router = compose(
  withState('Component', 'setComponent', null),
  withState('previousRoute', 'setPreviousRoute', '/'),
  withHandlers({
    routeTo: ({ setComponent, setPreviousRoute }) => (route, newComponent) => {
      setPreviousRoute(route)
      setComponent(newComponent)
    },
  }),
  withHandlers({
    attemptRouteTo: ({ Component, children, routeTo, onChange, previousRoute, setComponent }) => (
      route,
      isFirstTime
    ) => {
      if (!isFirstTime && route === previousRoute) return
      const matchingChildren = getMatchingChildren(children, route)
      const newComponent = matchingChildren ? matchingChildren[0] : null

      if (onChange) {
        const result = onChange(previousRoute, route)
        if (result === false) return
        if (result && result.then) {
          if (Component) {
            setComponent(cloneElement(Component, { isLeaving: true }))
          }
          result.then(() => {
            routeTo(route, newComponent)
          })
        } else {
          routeTo(route, newComponent)
        }
      } else {
        routeTo(route, newComponent)
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { history, attemptRouteTo } = this.props
      attemptRouteTo(history.location, true)
      // we don't remove this listener in componentWillUnmount because preact doesn't fire it inside iframes
      // instead we do history.removeListeners in the componentWillUnmount of Content
      history.addListener(attemptRouteTo)
    },
  })
)(({ Component }) => Component)

export { matchUrl, Router }
export default Router
