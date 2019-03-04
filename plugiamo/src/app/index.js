import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import getFrekklsConfig from 'frekkls-config'
import Launcher from './launcher'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import setup, { optionsFromHash } from './setup'
import setupFlowHistory from './setup/flow-history'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { HEIGHT_BREAKPOINT, location } from 'config'
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

const getExtraBubble = flow => {
  if (flow.flowType === 'outro') {
    return {
      buttons: [
        {
          value: 'no',
          message: flow.chatBubbleButtonNo,
          appearsAfter: 0,
        },
        {
          value: 'yes',
          message: flow.chatBubbleButtonYes,
          appearsAfter: 0.2,
        },
      ],
      timeStart: 2.5,
      timeEnd: null,
      timeStartDuration: 0.4,
    }
  }
  return { message: flow.chatBubbleExtraText }
}

const AppBaseTemplate = ({
  Component,
  Launcher,
  isUnmounting,
  launcherType,
  onToggleContent,
  persona,
  position,
  showingContent,
  data,
  bubble,
  extraBubble,
}) => (
  <AppBaseDiv>
    {showingContent && (
      <Content
        Component={Component}
        isUnmounting={isUnmounting}
        onToggleContent={onToggleContent}
        persona={persona}
        position={position}
        showingContent={showingContent}
      />
    )}
    <Launcher
      bubble={bubble}
      data={data}
      extraBubble={extraBubble}
      launcherType={launcherType}
      onToggleContent={onToggleContent}
      persona={persona}
      position={position}
      showingContent={showingContent}
    />
    {showingContent && <Gradient position={position} />}
  </AppBaseDiv>
)

export const AppBase = compose(
  withProps(({ data }) => {
    if (!data) return
    const extraBubble = data.launcher ? data.launcher.chatBubbleExtra : getExtraBubble(data.flow)
    const bubble = data.launcher ? data.launcher.chatBubble : { message: data.flow.chatBubbleText }
    return {
      bubble: extraBubble.buttons || extraBubble.message ? { ...bubble, timeOfElevation: 1.6, timeEnd: null } : bubble,
      extraBubble,
      [extraBubble.buttons && 'launcherType']: 'original',
    }
  })
)(AppBaseTemplate)

export default compose(
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
      pathname: location.pathname,
      personaId: optionsFromHash().persona,
      pluginPath: optionsFromHash().path,
    }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  branch(({ data }) => !data.flow, infoMsgHof(`no data found for hostname ${location.hostname}`)),
  branch(({ data }) => data.website.previewMode && !localStorage.getItem('trnd-plugin-enable-preview'), renderNothing),
  withState('persona', 'setPersona'),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', false),
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
        setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }
    },
    componentDidUpdate(prevProps) {
      const { showingContent } = this.props
      if (showingContent === prevProps.showingContent) return
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
  withProps(() => ({ position: getFrekklsConfig().position })),
  withHandlers({
    onToggleContent: ({ data, setIsUnmounting, setShowingContent, showingContent }) => () => {
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
      return setShowingContent(!showingContent)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(AppBase)
