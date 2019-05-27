import Assessment from 'special/assessment'
import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import LauncherBubbles from './launcher-bubbles'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { animateOnMount } from 'plugin-base'
import { bigLauncherConfig, HEIGHT_BREAKPOINT, location, smallLauncherConfig } from 'config'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
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

const Frame = styled.iframe`
  width: 0;
  border: 0;
  height: 0;
  display: none;
  position: absolute;
`

const LoadingFrame = compose(
  withState('iframeRef', 'setIframeRef', null),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { iframeRef, onLoad } = this.props
      if (iframeRef && iframeRef !== prevProps.iframeRef) {
        const load = () => {
          onLoad && onLoad(iframeRef)
        }
        if (iframeRef.contentDocument.readyState === 'complete') {
          load()
        } else {
          iframeRef.onload = load
        }
      }
    },
  })
)(({ setIframeRef }) => <Frame ref={setIframeRef} tabIndex="-1" title="loading-frame" />)

const AppBaseTemplate = ({
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
  onLauncherFrameLoad,
}) => (
  <AppBaseDiv>
    <LoadingFrame onLoad={onLauncherFrameLoad} />
    {showAssessmentContent ? (
      <Assessment
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
    {showingBubbles && (
      <LauncherBubbles
        data={data}
        disappear={disappear}
        launcherConfig={launcherConfig}
        onToggleContent={onToggleContent}
        outroButtonsClick={outroButtonsClick}
        position={position}
        setDisappear={setDisappear}
        showingContent={showingContent}
      />
    )}
    {showingLauncher && (
      <Launcher
        data={data}
        disappear={disappear}
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
    onLauncherFrameLoad: ({ googleAnalytics, setIsGAReady }) => iframeRef => {
      if (!googleAnalytics) {
        return setIsGAReady && setIsGAReady(true)
      }
      googleAnalytics.initGO(iframeRef).then(() => {
        setIsGAReady(true)
      })
    },
    outroButtonsClick: () => value => {
      mixpanel.track('Clicked Outro Button', { hostname: location.hostname, value })
    },
  })
)(AppBaseTemplate)
