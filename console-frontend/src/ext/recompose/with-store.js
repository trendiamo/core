import React from 'react'
import { compose, withState } from 'recompose'
import { createContext } from 'react'

const StoreContext = createContext('store')
const StoreConsumer = StoreContext.Consumer
const StoreProvider = StoreContext.Provider

export const withStoreProvider = BaseComponent => {
  const WithStateProvider = compose(withState('store', 'setStore', {}))(({ store, setStore, ...props }) => (
    <StoreProvider value={{ store, setStore }}>
      <BaseComponent {...props} />
    </StoreProvider>
  ))
  return WithStateProvider
}

export const withStoreConsumer = BaseComponent => {
  const WithStoreConsumer = props => (
    <StoreConsumer>
      {({ store, setStore }) => <BaseComponent {...props} setStore={setStore} store={store} />}
    </StoreConsumer>
  )
  return WithStoreConsumer
}
