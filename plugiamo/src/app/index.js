import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import Launcher from './launcher'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import setup, { optionsFromHash } from './setup'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { HEIGHT_BREAKPOINT, isGraphCMS, location } from 'config'
import { infoMsgHof } from 'shared/info-msg'

const Gradient = animateOnMount(styled.div`
  z-index: 2147482998;
  position: fixed;
  width: 500px;
  height: 500px;
  bottom: 0;
  right: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at bottom right, rgba(29, 39, 54, 0.16) 0, rgba(29, 39, 54, 0) 72%);
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`)

export const AppBase = styled(({ className, Component, onToggleContent, persona, showingContent }) => (
  <div className={className}>
    {showingContent && (
      <Content
        Component={Component}
        onToggleContent={onToggleContent}
        persona={persona}
        showingContent={showingContent}
      />
    )}
    <Launcher onToggleContent={onToggleContent} persona={persona} showingContent={showingContent} />
    {showingContent && <Gradient />}
  </div>
))`
  display: none;
  @media (min-height: ${HEIGHT_BREAKPOINT}px) {
    display: block;
  }
`

export default compose(
  withProps({ Component: <Router /> }),
  graphql(
    isGraphCMS
      ? gql`
          query($hasPersona: Boolean!, $hostname: String!, $personaId: ID) {
            hostname(where: { hostname: $hostname }) {
              website {
                triggers {
                  id
                  order
                  urlMatchers {
                    regexp
                  }
                  scriptedChat {
                    id
                    persona {
                      id
                      name
                      description
                      profilePic {
                        url
                      }
                    }
                  }
                  curation {
                    id
                    persona {
                      id
                      name
                      description
                      profilePic {
                        url
                      }
                    }
                  }
                  outro {
                    id
                    persona {
                      id
                      name
                      description
                      profilePic {
                        url
                      }
                    }
                  }
                }
              }
            }
            persona(where: { id: $personaId }) @include(if: $hasPersona) {
              id
              name
              description
              profilePic {
                url
              }
            }
          }
        `
      : gql`
          query($pathname: String!, $hasPersona: Boolean!, $personaId: ID, $pluginPath: String) {
            flow(pathname: $pathname, pluginPath: $pluginPath) {
              id
              flowType
              persona {
                id
                name
                description
                profilePic {
                  url
                }
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
      ...(isGraphCMS ? { hostname: location.hostname } : {}),
    }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  branch(
    ({ data }) => (isGraphCMS ? !data.hostname || !data.hostname.website : !data.flow),
    infoMsgHof(`no data found for hostname ${location.hostname}`)
  ),
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

      if (autoOpen) {
        setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }
    },
  }),
  branch(({ persona }) => !persona, renderNothing),
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
