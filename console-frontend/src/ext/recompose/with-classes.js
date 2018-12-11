import omit from 'lodash.omit'
import React from 'react'
import { compose, createSink, mapProps, withProps } from 'recompose'
import { isEqual } from 'lodash'
import { withStoreConsumer } from './with-store'

const Sink = createSink(({ classes, store, setStore }) => {
  if (isEqual(classes, store.classes)) return
  setStore({ ...store, classes })
})

const withClasses = BaseComponent =>
  compose(withStoreConsumer)(({ classes, store, ...props }) => (
    <React.Fragment>
      <Sink classes={classes} store={store} {...props} />
      {store.classes && <BaseComponent classes={classes} {...omit(props, ['setStore'])} />}
    </React.Fragment>
  ))

export const withClassesConsumer = BaseComponent =>
  compose(
    withStoreConsumer,
    withProps(({ store }) => ({
      classes: store.classes,
    })),
    mapProps(props => omit(props, ['store', 'setStore']))
  )(BaseComponent)

export default withClasses
