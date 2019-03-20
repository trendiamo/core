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
}) => (
  <ContentFrame isUnmounting={isUnmounting} onToggleContent={onToggleContent} position={position}>
    <ContentWrapper
      onToggleContent={onToggleContent}
      persona={persona}
      setShowAssessmentContent={setShowAssessmentContent}
    >
      {showAssessmentContent ? (
        <AssessmentContent
          animateOpacity
          setShowingContent={setShowingContent}
          setShowingLauncher={setShowingLauncher}
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
