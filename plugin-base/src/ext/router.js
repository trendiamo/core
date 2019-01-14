// Taken from react-router, simplified, and added a wait for onChange
import isEqual from 'lodash.isequal'
import { cloneElement } from 'react'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { matchUrl } from 'tools'

function assign(obj, props) {
  for (let i in props) {
    obj[i] = props[i]
  }
  return obj
}

const getMatchingChildren = (children, url) =>
  (Array.isArray(children) ? children : [children])
    .map(vnode => {
      let matches = matchUrl(url, vnode.attributes ? vnode.attributes.path : vnode.props.path)
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
    getNewComponent: ({ children }) => route => {
      const matchingChildren = route && getMatchingChildren(children, route)
      return matchingChildren ? matchingChildren[0] : null
    },
  }),
  withHandlers({
    attemptRouteTo: ({ Component, routeTo, onChange, previousRoute, setComponent, getNewComponent }) => (
      route,
      isFirstTime
    ) => {
      if (!isFirstTime && route === previousRoute) return
      const newComponent = getNewComponent(route)
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
    componentDidUpdate() {
      const { Component, previousRoute, getNewComponent, setComponent } = this.props
      const newComponent = getNewComponent(previousRoute)
      if (Component && newComponent && !isEqual(Component.props, newComponent.props)) {
        setComponent(cloneElement(newComponent))
      }
    },
  })
)(({ Component }) => Component)

export { matchUrl, Router }
export default Router
