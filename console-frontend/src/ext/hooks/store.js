import React, { useCallback, useMemo, useReducer } from 'react'
import { createContext } from 'react'

export const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer((state, action) => {
    if (action.type === 'merge') {
      return { ...state, ...action.value }
    } else {
      throw new Error()
    }
  }, {})

  const setStore = useCallback(value => dispatch({ type: 'merge', value }), [dispatch])

  const value = useMemo(() => ({ store, setStore }), [setStore, store])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
