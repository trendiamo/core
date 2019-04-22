import AssessmentContent from 'special/assessment/base'
import DefaultContentFrame from './content-frame'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, lifecycle } from 'recompose'
import { ContentWrapper, history } from 'plugin-base'
import { h } from 'preact'

const Content = ({
  Component,
  ContentFrame = DefaultContentFrame,
  isUnmounting,
  onToggleContent,
  position,
  persona,
  showAssessmentContent,
  setShowAssessmentContent,
  setShowingLauncher,
  setShowingContent,
  launcherConfig,
}) => (
  <ContentFrame
    isUnmounting={isUnmounting}
    launcherConfig={launcherConfig}
    onToggleContent={onToggleContent}
    position={position}
  >
    <ContentWrapper
      onToggleContent={onToggleContent}
      persona={persona}
      setShowAssessmentContent={setShowAssessmentContent}
    >
      {showAssessmentContent ? (
        <AssessmentContent
          animateOpacity
          setShowAssessmentContent={setShowAssessmentContent}
          setShowingContent={setShowingContent}
          setShowingLauncher={setShowingLauncher}
          showAssessmentContent={showAssessmentContent}
          showingContent
        />
      ) : (
        Component
      )}
    </ContentWrapper>
  </ContentFrame>
)

export default compose(
  lifecycle({
    componentDidMount() {
      if (window.__trndInitialPath) history.replace(window.__trndInitialPath)
    },
    componentWillUnmount() {
      history.removeListeners()
      document.body.style.overflow = ''
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
