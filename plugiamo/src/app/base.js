import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import Gradient from './gradient'
import Launcher from './launcher'
import LauncherBubbles from './launcher-bubbles'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import styled from 'styled-components'
import { bigLauncherConfig, HEIGHT_BREAKPOINT, location, smallLauncherConfig } from 'config'
import { emojifyStyles } from 'ext/emojify'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useCallback, useMemo } from 'preact/hooks'

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
      {showingContent && <Gradient position={position} />}
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
    </AppBaseDiv>
  )
}

export default AppBase
