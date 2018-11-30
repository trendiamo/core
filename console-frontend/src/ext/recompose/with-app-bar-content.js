import omit from 'lodash.omit'
import React from 'react'
import { compose, createSink } from 'recompose'
import { isEqual } from 'lodash'
import { withStoreConsumer } from './with-store'

const Sink = createSink(({ appBarContent, store, setStore, ...props }) => {
  if (typeof appBarContent === 'function') appBarContent = appBarContent(props)
  if (isEqual(appBarContent, store.appBarContent)) return
  setStore({ ...store, appBarContent })
})

const withAppBarContent = appBarContent => BaseComponent =>
  compose(withStoreConsumer)(props => (
    <React.Fragment>
      <Sink appBarContent={appBarContent} {...props} />
      <BaseComponent {...omit(props, ['store', 'setStore'])} />
    </React.Fragment>
  ))

export default withAppBarContent
