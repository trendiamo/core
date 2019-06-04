import Assessment from 'special/assessment'
import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import LauncherBubbles from './launcher-bubbles'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { animateOnMount } from 'plugin-base'
import { bigLauncherConfig, HEIGHT_BREAKPOINT, location, smallLauncherConfig } from 'config'
import { compose, withHandlers, withProps } from 'recompose'
import { emojifyStyles } from 'ext/emojify'
import { h } from 'preact'
import { isSmall } from 'utils'

const Gradient = animateOnMount(styled.div`
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
`)

const AppBaseDiv = styled.div`
  display: none;
  @media (min-height: ${HEIGHT_BREAKPOINT}px) {
    display: block;
  }
`

const AppBase = ({
  Component,
  Launcher,
  disappear,
  setDisappear,
  isUnmounting,
  onToggleContent,
  persona,
  position,
  showingContent,
  data,
  showAssessmentContent,
  setShowAssessmentContent,
  setShowingLauncher,
  setShowingContent,
  showingLauncher,
  showingBubbles,
  launcherConfig,
  outroButtonsClick,
  skipContentEntry,
  pluginState,
}) => (
  <AppBaseDiv>
    {showAssessmentContent ? (
      <Assessment
        frameStyleStr={emojifyStyles}
        isUnmounting={isUnmounting}
        onToggleContent={onToggleContent}
        setShowAssessmentContent={setShowAssessmentContent}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        showAssessmentContent={showAssessmentContent}
      />
    ) : (
      showingContent && (
        <Content
          Component={Component}
          frameStyleStr={emojifyStyles}
          isUnmounting={isUnmounting}
          launcherConfig={launcherConfig}
          onToggleContent={onToggleContent}
          persona={persona}
          position={position}
          setShowAssessmentContent={setShowAssessmentContent}
          showingContent={showingContent}
          skipEntry={skipContentEntry}
        />
      )
    )}
    {!showAssessmentContent && !showingContent && showingBubbles && (
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

export default compose(
  withProps(() => {
    const frekklsLC = getFrekklsConfig().launcherConfig
    const defaultLC = isSmall()
      ? smallLauncherConfig
      : frekklsLC.size === 'small'
      ? smallLauncherConfig
      : bigLauncherConfig

    return {
      launcherConfig: {
        ...defaultLC,
        extraElevation: frekklsLC.extraElevation || 0,
      },
    }
  }),
  withHandlers({
    outroButtonsClick: () => value => {
      mixpanel.track('Clicked Outro Button', { hostname: location.hostname, value })
    },
  })
)(AppBase)
