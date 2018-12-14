import omit from 'lodash.omit'
import React from 'react'
import { compose, createSink, mapProps, withProps } from 'recompose'
import { isEqual } from 'lodash'
import { withStoreConsumer } from './with-store'

const Sink = createSink(({ onboarding, store, setStore }) => {
  if (isEqual(onboarding, store.onboarding)) return
  setStore({ ...store, onboarding })
})

const withOnboarding = BaseComponent =>
  compose(withStoreConsumer)(({ onboarding, store, ...props }) => (
    <React.Fragment>
      <Sink onboarding={onboarding} store={store} {...props} />
      {store.onboarding && <BaseComponent onboarding={onboarding} {...omit(props, ['setStore'])} />}
    </React.Fragment>
  ))

export const withOnboardingConsumer = BaseComponent =>
  compose(
    withStoreConsumer,
    withProps(({ store }) => ({
      onboarding: store.onboarding,
    })),
    mapProps(props => omit(props, ['store', 'setStore']))
  )(BaseComponent)

export default withOnboarding
