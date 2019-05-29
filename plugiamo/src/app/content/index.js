import ContentFrame from './content-frame'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, lifecycle } from 'recompose'
import { ContentWrapper, history } from 'plugin-base'
import { h } from 'preact'

const Content = ({
  Component,
  frameStyleStr,
  hideContentFrame,
  isUnmounting,
  launcherConfig,
  onToggleContent,
  position,
  persona,
  setShowAssessmentContent,
  skipEntry,
}) => (
  <ContentFrame
    frameStyleStr={frameStyleStr}
    hidden={hideContentFrame}
    isUnmounting={isUnmounting}
    launcherConfig={launcherConfig}
    onToggleContent={onToggleContent}
    position={position}
    skipEntry={skipEntry}
  >
    <ContentWrapper
      onToggleContent={onToggleContent}
      persona={persona}
      setShowAssessmentContent={setShowAssessmentContent}
    >
      {Component}
    </ContentWrapper>
  </ContentFrame>
)

export default compose(
  lifecycle({
    componentDidMount() {
      if (window.__trndInitialPath) history.replace(window.__trndInitialPath)
    },
    componentWillUnmount() {
      document.body.style.overflow = ''
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
