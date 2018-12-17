import auth from 'auth'
import omit from 'lodash.omit'
import React from 'react'
import { compose, createSink, lifecycle, mapProps, withProps, withState } from 'recompose'
import { isEqual } from 'lodash'
import { withStoreConsumer } from './with-store'

const Sink = createSink(({ onboarding, setOnboarding, store, setStore }) => {
  if (isEqual(onboarding, store.onboarding)) return
  setStore({ ...store, onboarding, setOnboarding })
})

const withOnboarding = BaseComponent =>
  compose(
    withStoreConsumer,
    withState('onboarding', 'setOnboarding', {
      stageIndex: 0,
      stepIndex: 0,
      run: false,
    }),
    lifecycle({
      componentDidMount() {
        const { setOnboarding, onboarding } = this.props
        const onboardingStageIndex = auth.getUser().onboardingStage
        setTimeout(() => {
          setOnboarding({ ...onboarding, stageIndex: onboardingStageIndex, run: onboardingStageIndex === 0 })
        }, 0)
      },
    })
  )(({ onboarding, setOnboarding, store, ...props }) => (
    <React.Fragment>
      <Sink onboarding={onboarding} setOnboarding={setOnboarding} store={store} {...props} />
      {store.onboarding && (
        <BaseComponent onboarding={onboarding} setOnboarding={setOnboarding} {...omit(props, ['setStore'])} />
      )}
    </React.Fragment>
  ))

export const withOnboardingConsumer = BaseComponent =>
  compose(
    withStoreConsumer,
    withProps(({ store }) => ({
      onboarding: store.onboarding,
      setOnboarding: store.setOnboarding,
    })),
    mapProps(props => omit(props, ['store', 'setStore']))
  )(BaseComponent)

export default withOnboarding
