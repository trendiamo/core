import React, { useCallback, useReducer } from 'react'
import { createContext } from 'react'

export const StoreContext = createContext('store')

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer((state, action) => {
    if (action.type === 'merge') {
      return { ...state, ...action.value }
    } else {
      throw new Error()
    }
  }, {})
  const setStore = useCallback(value => dispatch({ type: 'merge', value }), [dispatch])

  return <StoreContext.Provider value={{ store, setStore }}>{children}</StoreContext.Provider>
}
