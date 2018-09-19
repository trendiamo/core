import animateOnMount from 'shared/animate-on-mount'
import Button from 'shared/button'
import config from '../config'
import Frame from 'shared/frame'
import { h } from 'preact'
import IgPost from './ig-post'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'

const TrendiamoContentFrame = animateOnMount(styled(Frame)`
  border: 0;
  z-index: 2147483000;
  position: fixed;
  bottom: 100px;
  right: 30px;
  height: calc(100vh - 150px);
  width: ${config.width}px;
  overflow-x: hidden;
  max-height: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
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
  background-color: #55ebd1;
  background-image: url(https://www.transparenttextures.com/patterns/dark-mosaic.png);
  background-size: contain;
  background-position: center;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  padding: 2rem 1rem;
  text-shadow: 1px 1px 1px #888;
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

const PoweredBy = styled.div`
  color: #999;
  font-size: small;
  padding-top: 1.2rem;
  text-align: center;
  a {
    color: #5d69b9;
  }
`

const Content = ({ exposition, onCtaClick, variation }) => (
  <TrendiamoContentFrame>
    <Wrapper>
      <Cover>
        <AnimatedContent timeout={250 * 1}>{`${exposition.influencer.name} says…`}</AnimatedContent>
      </Cover>
      <InnerContent>
        <AnimatedContent timeout={250 * 2}>
          <p>{exposition.description}</p>
          {exposition.videos.map(e => (
            <iframe
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
              key={e.videoUrl}
              src={e.videoUrl}
              style={{ marginBottom: '1rem', width: '100%' }}
            />
          ))}
          {exposition.instagramPosts.map(e => (
            <IgPost key={e.url} url={e.url} />
          ))}
          {variation === 'control' && (
            <Button fullWidth onClick={onCtaClick}>
              {exposition.ctaText}
            </Button>
          )}
          {variation === 'treatment' && (
            <Button fullWidth onClick={onCtaClick} style={{ color: 'red' }}>
              {exposition.ctaText}
            </Button>
          )}
        </AnimatedContent>
        <PoweredBy>
          {'Trusted by '}
          <a href="https://trendiamo.com" rel="noopener noreferrer" target="_blank">
            {'trendiamo'}
          </a>
        </PoweredBy>
      </InnerContent>
    </Wrapper>
  </TrendiamoContentFrame>
)

export default Content
