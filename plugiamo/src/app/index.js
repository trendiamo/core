import Assessment from 'special/assessment'
import AssessmentCart from 'special/assessment/cart'
import AssessmentSizeGuide from 'special/assessment/size-guide'
import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import Launcher from './launcher'
import LauncherBubbles from './launcher-bubbles'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import setup, { optionsFromHash } from './setup'
import setupFlowHistory from './setup/flow-history'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { animateOnMount } from 'plugin-base'
import { assessmentCart, assessmentHack } from 'special/assessment/utils'
import { bigLauncherConfig, HEIGHT_BREAKPOINT, location, smallLauncherConfig } from 'config'
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  renderNothing,
  withHandlers,
  withProps,
  withState,
} from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { infoMsgHof } from 'shared/info-msg'
import { isSmall } from 'utils'
import { timeout } from 'plugin-base'

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

const AppBaseTemplate = ({
  Component,
  Launcher,
  disappear,
  setDisappear,
  isUnmounting,
  launcherPulsating,
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
  launcherConfig,
  outroButtonsClick,
  skipContentEntry,
}) => (
  <AppBaseDiv>
    {showAssessmentContent ? (
      <Assessment
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
    {showingLauncher && (
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
        pulsating={launcherPulsating}
        showingContent={showingContent}
      />
    )}
    {showingContent && <Gradient position={position} />}
  </AppBaseDiv>
)

export const AppBase = compose(
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
  }),
  withState('disappear', 'setDisappear', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { launcherDisappear, setDisappear } = this.props
      if (launcherDisappear !== prevProps.launcherDisappear) {
        setDisappear(launcherDisappear)
      }
    },
  })
)(AppBaseTemplate)

export default compose(
  branch(() => assessmentCart(), renderComponent(AssessmentCart)),
  withProps({ Component: <Router /> }),
  withProps({ Launcher }),
  withProps({ pathFromNav: setupFlowHistory() }),
  graphql(
    gql`
      query($pathname: String!, $hasPersona: Boolean!, $personaId: ID, $pluginPath: String) {
        website {
          name
          previewMode
        }
        flow(pathname: $pathname, pluginPath: $pluginPath) {
          id
          flowType
          chatBubbleText
          chatBubbleExtraText
          chatBubbleButtonYes
          chatBubbleButtonNo
          persona {
            id
            name
            description
            profilePic {
              url
            }
            instagramUrl
          }
        }
        persona(id: $personaId) @include(if: $hasPersona) {
          id
          name
          description
          profilePic {
            url
          }
        }
      }
    `,
    {
      hasPersona: !!optionsFromHash().persona,
      pathname:
        location.hostname === 'www.pionier-workwear.com' ? `${location.pathname}${location.search}` : location.pathname,
      personaId: optionsFromHash().persona,
      pluginPath: optionsFromHash().path,
    }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  branch(({ data }) => !data.flow && assessmentHack(), renderComponent(AssessmentSizeGuide)),
  branch(({ data }) => !data.flow, infoMsgHof(`no data found for hostname ${location.hostname}`)),
  branch(({ data }) => data.website.previewMode && !localStorage.getItem('trnd-plugin-enable-preview'), renderNothing),
  withState('persona', 'setPersona'),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', false),
  withState('showAssessmentContent', 'setShowAssessmentContent', false),
  withState('showingLauncher', 'setShowingLauncher', true),
  withState('skipContentEntry', 'setSkipContentEntry', false),
  lifecycle({
    componentDidMount() {
      const { data, pathFromNav, setPersona, setShowingContent } = this.props
      const { flowType, open: autoOpen, persona } = setup(data, pathFromNav)
      setPersona(persona)
      mixpanel.track('Loaded Plugin', {
        autoOpen,
        flowType,
        hash: location.hash,
        hostname: location.hostname,
        personaName: persona.name,
        personaRef: persona.id,
      })

      // we could store this in the store, but for ease of access for now, just in localStorage
      localStorage.setItem('trnd-plugin-account', data.website.name)

      getFrekklsConfig().onShow(autoOpen)

      if (autoOpen) {
        if (data.flow.flowType !== 'outro') setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }
    },
    componentDidUpdate(prevProps) {
      const { showingContent, setSkipContentEntry, showAssessmentContent } = this.props
      if (showAssessmentContent !== prevProps.showAssessmentContent && !showAssessmentContent) {
        setSkipContentEntry(true)
      }
      if (showingContent === prevProps.showingContent) return
      setSkipContentEntry(showingContent)
      if (showingContent) {
        document.documentElement.classList.add('trnd-open')
      } else {
        document.documentElement.classList.remove('trnd-open')
      }
    },
    componentWillUnmount() {
      timeout.clear('exitOnMobile')
    },
  }),
  branch(({ persona }) => !persona, renderNothing),
  withProps(({ data }) => ({
    position: getFrekklsConfig().position,
    launcherPulsating: data.flow.flowType !== 'outro',
  })),
  withHandlers({
    onToggleContent: ({ data, setIsUnmounting, setShowingContent, showingContent, setShowAssessmentContent }) => () => {
      if (data.flow.flowType === 'outro') return
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')

      if (showingContent && isSmall()) {
        setIsUnmounting(true)
        return timeout.set(
          'exitOnMobile',
          () => {
            setIsUnmounting(false)
            setShowingContent(false)
          },
          400
        )
      }
      setShowAssessmentContent(false)
      return setShowingContent(!showingContent)
    },
    outroButtonsClick: () => value => {
      mixpanel.track('Clicked Outro Button', { hostname: location.hostname, value })
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(AppBase)
