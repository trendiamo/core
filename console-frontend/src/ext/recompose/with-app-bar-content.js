import React, { useContext } from 'react'
import { createSink } from 'recompose'
import { isEqual } from 'lodash'
import { StoreContext } from 'ext/hooks/store'

const setPageTitle = ({ title }) => {
  if (!title) return
  document.title = `${title} - Frekkls Admin`
}

const Sink = createSink(({ appBarContent, store, setStore, ...props }) => {
  if (typeof appBarContent === 'function') appBarContent = appBarContent(props)
  if (isEqual(appBarContent, store.appBarContent)) return
  setPageTitle(appBarContent)
  setStore({ ...store, appBarContent })
})

const withAppBarContent = appBarContent => BaseComponent => {
  const WithAppBarContent = props => {
    const { store, setStore } = useContext(StoreContext)
    return (
      <React.Fragment>
        <Sink appBarContent={appBarContent} {...props} setStore={setStore} store={store} />
        <BaseComponent {...props} />
      </React.Fragment>
    )
  }
  return WithAppBarContent
}

export default withAppBarContent
