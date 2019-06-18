import ContentFrame from './content-frame'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { ContentWrapper, history } from 'plugin-base'
import { h } from 'preact'
import { useEffect } from 'preact/hooks'

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
}) => {
  useEffect(() => {
    if (window.__trndInitialPath) history.replace(window.__trndInitialPath)
    return () => (document.body.style.overflow = '')
  }, [])

  return (
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
}

export default withHotkeys({
  [escapeKey]: ({ onToggleContent, showingContent }) => () => {
    if (showingContent) onToggleContent()
  },
})(Content)
