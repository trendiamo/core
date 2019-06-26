import { useCallback, useMemo, useReducer } from 'preact/hooks'

const useTimeout = () => {
  const reducer = useReducer((state, action) => {
    if (action.type === 'setFrekklsTimeout') {
      return action.value
    } else if (action.type === 'clearFrekklsTimeout') {
      clearTimeout(state)
    } else {
      throw new Error()
    }
  }, null)

  const dispatch = useMemo(() => reducer[1], [reducer])

  const setFrekklsTimeout = useCallback(
    (fn, timeoutParam) => {
      const value = setTimeout(fn, timeoutParam)
      dispatch({ type: 'setFrekklsTimeout', value })
    },
    [dispatch]
  )

  const clearFrekklsTimeout = useCallback(() => dispatch({ type: 'clearFrekklsTimeout' }), [dispatch])

  return [setFrekklsTimeout, clearFrekklsTimeout]
}

export default useTimeout
