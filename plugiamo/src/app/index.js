import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import init from './setup/init'
import Launcher from './launcher'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import setup, { optionsFromHash } from './setup'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { HEIGHT_BREAKPOINT, location } from 'config'
import { infoMsgHof } from 'shared/info-msg'

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

export const AppBase = styled(
  ({ className, Component, Launcher, onToggleContent, persona, position, showingContent, data }) => (
    <div className={className}>
      {showingContent && (
        <Content
          Component={Component}
          onToggleContent={onToggleContent}
          persona={persona}
          position={position}
          showingContent={showingContent}
        />
      )}
      <Launcher
        bubbleText={data && data.flow && data.flow.chatBubbleText}
        onToggleContent={onToggleContent}
        persona={persona}
        position={position}
        showingContent={showingContent}
      />
      {showingContent && <Gradient position={position} />}
    </div>
  )
)`
  display: none;
  @media (min-height: ${HEIGHT_BREAKPOINT}px) {
    display: block;
  }
`

export default compose(
  withProps({ Component: <Router /> }),
  withProps({ Launcher }),
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
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      const { data, setPersona, setShowingContent } = this.props
      const { flowType, open: autoOpen, persona } = setup(data)
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

      init()

      if (autoOpen) {
        setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }
    },
  }),
  branch(({ persona }) => !persona, renderNothing),
  withProps(() => {
    const account = localStorage.getItem('trnd-plugin-account')
    return {
      position: account === 'Shopinfo' ? 'left' : account === 'Impressorajato' ? 'right-elevated' : 'right',
    }
  }),
  withHandlers({
    onToggleContent: ({ setShowingContent, showingContent }) => () => {
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')
      if (!showingContent) {
        document.documentElement.classList.add('trnd-open')
      } else {
        document.documentElement.classList.remove('trnd-open')
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
