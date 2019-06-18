import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import Launcher from './launcher'
import LauncherBubbles from './launcher-bubbles'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { bigLauncherConfig, HEIGHT_BREAKPOINT, location, smallLauncherConfig } from 'config'
import { emojifyStyles } from 'ext/emojify'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useAnimateOnMount } from 'plugin-base'
import { useCallback, useMemo } from 'preact/hooks'

const StyledDiv = styled.div`
  z-index: 2147482998;
  position: fixed;
  width: 500px;
  height: 500px;
  bottom: 0;
  ${({ position }) => (position === 'left' ? 'left: 0;' : 'right: 0;')}
  pointer-events: none;
  background: radial-gradient(
    ellipse at bottom ${({ position }) => (position === 'left' ? 'left' : 'right')},
    rgba(29, 39, 54, 0.16) 0,
    rgba(29, 39, 54, 0) 72%
  );
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

const Gradient = props => {
  const { entry } = useAnimateOnMount()

  return <StyledDiv {...props} entry={entry} />
}

const AppBaseDiv = styled.div`
  display: none;
  @media (min-height: ${HEIGHT_BREAKPOINT}px) {
    display: block;
  }
`

const AppBase = ({
  Component,
  data,
  disappear,
  hideContentFrame,
  isUnmounting,
  onToggleContent,
  persona,
  pluginState,
  position,
  setDisappear,
  setShowAssessmentContent,
  showAssessmentContent,
  showingBubbles,
  showingContent,
  showingLauncher,
  skipContentEntry,
}) => {
  const launcherConfig = useMemo(() => {
    const frekklsLC = getFrekklsConfig().launcherConfig
    const defaultLC = isSmall()
      ? smallLauncherConfig
      : frekklsLC.size === 'small'
      ? smallLauncherConfig
      : bigLauncherConfig

    return {
      ...defaultLC,
      extraElevation: frekklsLC.extraElevation || 0,
    }
  }, [])

  const outroButtonsClick = useCallback(value => {
    mixpanel.track('Clicked Outro Button', { hostname: location.hostname, value })
  }, [])

  return (
    <AppBaseDiv>
      {(showAssessmentContent || showingContent) && (
        <Content
          Component={Component || <Router />}
          frameStyleStr={emojifyStyles}
          hideContentFrame={hideContentFrame}
          isUnmounting={isUnmounting}
          launcherConfig={launcherConfig}
          onToggleContent={onToggleContent}
          persona={persona}
          position={position}
          setShowAssessmentContent={setShowAssessmentContent}
          showingContent={showingContent}
          skipEntry={skipContentEntry}
        />
      )}
      {!showingContent && showingBubbles && (
        <LauncherBubbles
          data={data}
          disappear={disappear}
          frameStyleStr={emojifyStyles}
          launcherConfig={launcherConfig}
          onToggleContent={onToggleContent}
          outroButtonsClick={outroButtonsClick}
          position={position}
          setDisappear={setDisappear}
        />
      )}
      {showingLauncher && (
        <Launcher
          data={data}
          disappear={disappear}
          frameStyleStr={emojifyStyles}
          launcherConfig={launcherConfig}
          onToggleContent={onToggleContent}
          persona={persona}
          position={position}
          pulsating={pluginState !== 'closed'}
          showingContent={showingContent}
        />
      )}
      {showingContent && <Gradient position={position} />}
    </AppBaseDiv>
  )
}

export default withHotkeys({
  [escapeKey]: ({ onToggleContent, showingContent }) => () => {
    if (showingContent) onToggleContent()
  },
})(AppBase)
