import omit from 'lodash.omit'
import React from 'react'
import { compose, createSink } from 'recompose'
import { isEqual } from 'lodash'
import { withStoreConsumer } from './with-store'

const setPageTitle = appBarContent => {
  if (!appBarContent.breadcrumbs || !appBarContent.breadcrumbs.length) return
  const title = appBarContent.breadcrumbs[appBarContent.breadcrumbs.length - 1].text
  document.title = `${title} - Trendiamo Console`
}

const Sink = createSink(({ appBarContent, store, setStore, ...props }) => {
  if (typeof appBarContent === 'function') appBarContent = appBarContent(props)
  if (isEqual(appBarContent, store.appBarContent)) return
  setPageTitle(appBarContent)
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
