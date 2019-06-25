import ContentFrame from './content-frame'
import { ContentWrapper, history, useAnimateOnMount } from 'plugin-base'
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
  showingContent,
  skipEntry,
}) => {
  const { entry } = useAnimateOnMount({ skipEntry })

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

export default Content
