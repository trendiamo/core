import React, { useState } from 'react'
import { createContext } from 'react'

export const StoreContext = createContext('store')

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState({})
  return <StoreContext.Provider value={{ store, setStore }}>{children}</StoreContext.Provider>
}
