import styled from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'

const animate = component =>
  compose(
    withState('isEntering', 'setIsEntering', true),
    lifecycle({
      componentDidMount() {
        const { setIsEntering, timeout } = this.props
        setTimeout(() => setIsEntering(false), timeout || 10)
      },
    })
  )(component)

const TopSlideAnimation = animate(
  styled.div`
    opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
    transform: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 'translateY(20px)' : 'none')};
    transition: opacity 0.25s ease, transform 0.25s ease;
  `
)

export { animate, TopSlideAnimation }
