import ContentFrame from './content-frame'
import { ContentWrapper, history } from 'plugin-base'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

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
  showingContent,
  onUserInteracted,
}) => {
  const [entry, setEntry] = useState(true)

  useEffect(() => {
    if (!showingContent) return setEntry(true)

    let didCancel = false
    setTimeout(() => {
      didCancel || setEntry(false)
    }, 10)
    return () => (didCancel = true)
  }, [showingContent])

  useEffect(() => {
    if (window.__trndInitialPath) history.replace(window.__trndInitialPath)
    return () => (document.body.style.overflow = '')
  }, [])

  return (
    <ContentFrame
      entry={entry}
      frameStyleStr={frameStyleStr}
      hidden={hideContentFrame}
      isUnmounting={isUnmounting}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    >
      <ContentWrapper
        onToggleContent={onToggleContent}
        onUserInteracted={onUserInteracted}
        persona={persona}
        setShowAssessmentContent={setShowAssessmentContent}
        showingContent={showingContent}
      >
        {Component}
      </ContentWrapper>
    </ContentFrame>
  )
}

export default Content
