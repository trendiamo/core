// Taken from react-router, simplified, and added a wait for onChange

import { cloneElement } from 'preact'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

const Router = ({ Component }) => Component

function assign(obj, props) {
  for (let i in props) {
    obj[i] = props[i]
  }
  return obj
}

function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/')
}

const EMPTY = {}

function matchUrl(url, route) {
  const reg = /(?:\?([^#]*))?(#.*)?$/
  let c = url.match(reg),
    matches = {},
    ret
  if (c && c[1]) {
    let p = c[1].split('&')
    for (let i = 0; i < p.length; i++) {
      let r = p[i].split('=')
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='))
    }
  }
  url = segmentize(url.replace(reg, ''))
  route = segmentize(route || '')
  let max = Math.max(url.length, route.length)
  for (let i = 0; i < max; i++) {
    if (route[i] && route[i].charAt(0) === ':') {
      let flags = (route[i].match(/[+*?]+$/) || EMPTY)[0] || '',
        param = route[i].replace(/(^:|[+*?]+$)/g, ''),
        plus = ~flags.indexOf('+'),
        star = ~flags.indexOf('*'),
        val = url[i] || ''
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false
        break
      }
      matches[param] = decodeURIComponent(val)
      if (plus || star) {
        matches[param] = url
          .slice(i)
          .map(decodeURIComponent)
          .join('/')
        break
      }
    } else if (route[i] !== url[i]) {
      ret = false
      break
    }
  }
  if (ret === false) return false
  return matches
}

const getMatchingChildren = (children, url) =>
  children
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

export { matchUrl }

export default compose(
  withState('Component', 'setComponent', null),
  withState('previousRoute', 'setPreviousRoute', null),
  withHandlers({
    executeRouteTo: ({ setComponent, setPreviousRoute }) => (route, newComponent) => {
      setPreviousRoute(route)
      setComponent(newComponent)
    },
  }),
  withProps(({ Component, children, executeRouteTo, onChange, previousRoute, setComponent }) => ({
    routeTo: route => {
      if (route === previousRoute) return
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
            executeRouteTo(route, newComponent)
          })
        } else {
          executeRouteTo(route, newComponent)
        }
      } else {
        executeRouteTo(route, newComponent)
      }
    },
  })),
  lifecycle({
    componentDidMount() {
      const { history, routeTo, setPreviousRoute } = this.props
      setPreviousRoute(history.location)
      routeTo(history.location)
      // we don't remove this in componentWillUnmount because preact doesn't fire it inside iframes
      // instead we do history.addEventListeners in the componentWillUnmount of Content
      history.addEventListener(routeTo)
    },
  })
)(Router)
