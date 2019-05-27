import styled from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'
import { h } from 'preact'

const Frame = styled.iframe`
  width: 0;
  border: 0;
  height: 0;
  display: none;
  position: absolute;
`

const LoadingFrame = compose(
  withState('iframeRef', 'setIframeRef', null),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { iframeRef, onLoad } = this.props
      if (iframeRef && iframeRef !== prevProps.iframeRef) {
        const load = () => {
          onLoad && onLoad(iframeRef)
        }
        if (iframeRef.contentDocument.readyState === 'complete') {
          load()
        } else {
          iframeRef.onload = load
        }
      }
    },
  })
)(({ setIframeRef }) => <Frame ref={setIframeRef} tabIndex="-1" title="loading-frame" />)

export default LoadingFrame
