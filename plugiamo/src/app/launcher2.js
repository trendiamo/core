import animateOnMount from 'shared/animate-on-mount'
import Frame from 'shared/frame'
import { h } from 'preact'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'

const TrendiamoLauncherFrame = styled(Frame)`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 120px;
`

const getAngle = (i, size) => -75 + (12 - size) * 15 + 30 * i

const SellerPicContainer = animateOnMount(
  styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;

    transition: opacity 0.5s ease, transform 0.75s ease;
    opacity: ${({ entry }) => (entry ? 0 : 1)};
    transform: ${({ entry, i, size }) =>
      entry
        ? `rotate(${getAngle(i, size) - 120}deg) translate(-20px) scale(0.2)`
        : `rotate(${getAngle(i, size)}deg) translate(-42px) scale(0.5)`};
  `,
  250
)

const SellerPic = animateOnMount(
  styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-image: url(${({ url }) => url});

    transition: transform 0.65s ease;
    transform: ${({ entry, i, size }) =>
      entry ? `rotate(${-getAngle(i, size) - 360}deg)` : `rotate(${-getAngle(i, size)}deg)`};
  `,
  250
)

const Container = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
`

const Logo = animateOnMount(styled.div`
  cursor: pointer;
  border-radius: 50%;
  background: #849eda;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease;

  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
`)

const Launcher = ({ onToggleContent, urls }) => (
  <TrendiamoLauncherFrame>
    <Container>
      {urls.map((url, i) => (
        <SellerPicContainer i={i} key={url} size={urls.length}>
          <SellerPic i={i} size={urls.length} url={url} />
        </SellerPicContainer>
      ))}
      <Logo onClick={onToggleContent} />
    </Container>
  </TrendiamoLauncherFrame>
)

export default compose(
  withProps(({ number }) => ({
    urls: Array.from(Array(Math.min(number, 12))).map((_, i) => `https://randomuser.me/api/portraits/men/${i + 1}.jpg`),
  })),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Launcher)
