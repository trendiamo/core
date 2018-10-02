import animateOnMount from '../shared/animate-on-mount'
import styled from 'styled-components'

const bounce = component =>
  animateOnMount(
    styled(component)`
      transition: transform
        ${({ animationStep }) => (animationStep < 2 ? '0.1s ease-out' : '0.25s cubic-bezier(0.76, -0.53, 0, 5)')};
      transform: ${({ animationStep }) => (animationStep === 1 ? `scale(0.8)` : `scale(1)`)};
    `,
    500,
    100
  )

export default bounce
