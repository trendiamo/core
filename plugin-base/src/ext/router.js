// Taken from react-router, simplified, and added a wait for onChange
import isEqual from 'lodash.isequal'
import { cloneElement } from 'react'
import { matchUrl } from 'tools'
import { timeout } from 'ext'
import { useCallback, useEffect, useReducer } from 'react'

const assign = (obj, props) => {
  for (let i in props) {
    obj[i] = props[i]
  }
  return obj
}

const findMatchingChild = (route, children) => {
  if (!route) return null

  const matchingChildren = (Array.isArray(children) ? children : [children])
    .map(vnode => {
      let matches = matchUrl(route, vnode.props.path)
      if (matches) {
        let newProps = { matches, url: route }
        assign(newProps, matches)
        delete newProps.ref
        delete newProps.key
        return cloneElement(vnode, newProps)
      }
    })
    .filter(Boolean)

  return matchingChildren ? matchingChildren[0] : null
}

const Router = ({ children, history, onChange }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'merge') {
        return { ...state, ...action.value }
      } else if (action.type === 'attemptRouteTo') {
        if (action.route === state.previousRoute && !state.isFirstTime) return state
        if (!onChange) return state

        const NewComponent = findMatchingChild(action.route, children)
        const duration = onChange(state.previousRoute, action.route)
        timeout.set(
          'routeChange',
          () =>
            dispatch({
              type: 'merge',
              value: { previousRoute: action.route, Component: NewComponent, isFirstTime: false },
            }),
          duration || 10
        )
        if (state.Component) {
          return { ...state, Component: cloneElement(state.Component, { isLeaving: true }), isFirstTime: false }
        } else {
          return state
        }
      } else if (action.type === 'checkForNewComponentProps') {
        const NewComponent = findMatchingChild(state.previousRoute, action.children)
        if (state.Component && NewComponent && !isEqual(state.Component.props, NewComponent.props)) {
          return { ...state, Component: cloneElement(NewComponent), isFirstTime: false }
        } else {
          return state
        }
      } else {
        throw new Error()
      }
    },
    {
      Component: null,
      isFirstTime: true,
      previousRoute: '/',
    }
  )

  const attemptRouteTo = useCallback(route => {
    dispatch({ type: 'attemptRouteTo', route })
  }, [])

  const checkForNewComponentProps = useCallback(() => {
    dispatch({ type: 'checkForNewComponentProps', children })
  }, [children])

  useEffect(() => {
    attemptRouteTo(history.location)
    history.addListener(attemptRouteTo)
    return () => {
      history.removeListener(attemptRouteTo)
      timeout.clear('routeChange')
    }
  }, [attemptRouteTo, history])

  useEffect(() => {
    checkForNewComponentProps()
  }, [checkForNewComponentProps])

  return state ? state.Component : null
}

export { matchUrl, Router }
export default Router
