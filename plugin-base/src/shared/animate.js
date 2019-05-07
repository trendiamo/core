import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'
import { timeout } from 'ext'

const animate = BaseComponent =>
  compose(
    withState('isEntering', 'setIsEntering', true),
    withState('timeoutName', 'setTimeoutName'),
    lifecycle({
      componentDidMount() {
        const { setIsEntering, setTimeoutName, delay } = this.props
        const name = timeout.generateTimeoutName()
        setTimeoutName(name)
        timeout.set(name, () => setIsEntering(false), delay || 10)
      },
      componentWillUnmount() {
        const { timeoutName } = this.props
        timeout.clear(timeoutName)
      },
    })
  )(props => <BaseComponent {...omit(props, ['timeoutName', 'setTimeoutName'])} />)

const TopSlideAnimation = animate(
  styled.div`
    opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
    transform: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 'translateY(20px)' : 'none')};
    transition: opacity 0.25s ease, transform 0.25s ease;
  `
)

export { animate, TopSlideAnimation }
