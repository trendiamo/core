import animateOnMount from 'shared/animate-on-mount'
import Button from 'shared/button'
import Frame from 'shared/frame'
import { h } from 'preact'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'

const TrendiamoContentFrame = animateOnMount(styled(Frame)`
  border: 0;
  z-index: 2147483000;
  position: fixed;
  bottom: 100px;
  right: 30px;
  height: calc(100vh - 150px);
  max-height: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
  transition: opacity 0.25s ease, transform 0.25s ease;
`)

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const Cover = styled.div`
  padding: 2rem 1rem;
  font-size: 22px;
  font-weight: 500;
  background-color: #35cbb1;
  color: #fff;
`

const InnerContent = styled.div`
  color: #333;
  padding: 0 1rem 1rem 1rem;
`

const AnimatedContent = compose(
  withProps(({ timeout }) => ({
    Component: animateOnMount(
      styled.div`
        opacity: ${({ entry }) => (entry ? 0 : 1)};
        transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
        transition: opacity 0.25s ease, transform 0.25s ease;
      `,
      timeout
    ),
  }))
)(({ children, Component }) => <Component>{children}</Component>)

const Content = () => (
  <TrendiamoContentFrame>
    <Wrapper>
      <Cover>
        <AnimatedContent timeout={250 * 1}>{'Logan Paul says…'}</AnimatedContent>
      </Cover>
      <InnerContent>
        <AnimatedContent timeout={250 * 2}>
          <p>{"Hello, why don't you buy a shirt, hmm? I find wearing a shirt to be something generally good."}</p>
          <iframe
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
            src="https://www.youtube.com/embed/h-2iuDwxcUQ"
            style={{ marginBottom: '1rem', width: '100%' }}
          />
          <Button fullWidth>{'Go buy it'}</Button>
        </AnimatedContent>
      </InnerContent>
    </Wrapper>
  </TrendiamoContentFrame>
)

export default Content
