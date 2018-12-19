import auth from 'auth'
import omit from 'lodash.omit'
import React from 'react'
import routes from 'app/routes'
import { compose, createSink, lifecycle, mapProps, withProps, withState } from 'recompose'
import { isEqual } from 'lodash'
import { withRouter } from 'react-router'
import { withStoreConsumer } from './with-store'

const Sink = createSink(({ onboarding, setOnboarding, store, setStore }) => {
  if (isEqual(onboarding, store.onboarding)) return
  setStore({ ...store, onboarding, setOnboarding })
})

const withOnboarding = BaseComponent =>
  compose(
    withStoreConsumer,
    withRouter,
    withState('onboarding', 'setOnboarding', {
      stageIndex: 0,
      stepIndex: 0,
      run: false,
      help: { run: false },
    }),
    lifecycle({
      componentDidMount() {
        const { setOnboarding, onboarding, location } = this.props
        const onboardingStageIndex = auth.getUser().onboardingStage
        setOnboarding({
          ...onboarding,
          stageIndex: onboardingStageIndex,
          run: !(location.pathname === routes.root()) && onboardingStageIndex === 0,
        })
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
    withRouter,
    withProps(({ store }) => ({
      onboarding: store.onboarding,
      setOnboarding: store.setOnboarding,
    })),
    mapProps(props => omit(props, ['store', 'setStore']))
  )(BaseComponent)

export const withOnboardingHelp = help => BaseComponent =>
  compose(
    withOnboardingConsumer,
    lifecycle({
      componentDidMount() {
        setTimeout(() => {
          const { onboarding, setOnboarding, location } = this.props
          setOnboarding({ ...onboarding, help: { ...onboarding.help, ...help, pathname: location.pathname } })
        }, 0)
      },
    })
  )(BaseComponent)

export default withOnboarding
