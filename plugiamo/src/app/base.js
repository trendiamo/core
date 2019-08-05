import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import Gradient from './gradient'
import Launcher from './launcher'
import LauncherBubbles from './launcher-bubbles'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { bigLauncherConfig, HEIGHT_BREAKPOINT, location, smallLauncherConfig } from 'config'
import { emojifyStyles } from 'ext/emojify'
import { h } from 'preact'
import { isSmall } from 'utils'
import { useCallback, useEffect, useMemo, useReducer } from 'preact/hooks'

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
  seller,
  pluginState,
  position,
  setDisappear,
  setShowAssessmentContent,
  showingBubbles,
  showingContent,
  showingLauncher,
  onUserInteracted,
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

  const [key, dispatch] = useReducer((state, action) => {
    if (action.type === 'change') {
      return state + 1
    } else {
      throw new Error()
    }
  }, 0)

  useEffect(() => {
    if (showingContent) dispatch({ type: 'change' })
  }, [showingContent])

  return (
    <AppBaseDiv>
      {showingContent && <Gradient position={position} />}
      <Content
        Component={Component}
        frameStyleStr={emojifyStyles}
        hideContentFrame={hideContentFrame}
        isUnmounting={isUnmounting}
        key={key}
        launcherConfig={launcherConfig}
        onToggleContent={onToggleContent}
        onUserInteracted={onUserInteracted}
        position={position}
        seller={seller}
        setShowAssessmentContent={setShowAssessmentContent}
        showingContent={showingContent}
      />
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
          position={position}
          pulsating={pluginState !== 'closed'}
          seller={seller}
          showingContent={showingContent}
        />
      )}
    </AppBaseDiv>
  )
}

export default AppBase
