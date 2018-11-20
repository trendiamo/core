import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import Launcher from './launcher'
import mixpanel from 'ext/mixpanel'
import setup, { optionsFromHash } from './setup'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { infoMsgHof } from 'shared/info-msg'
import { location } from 'config'

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

const App = ({ persona, onToggleContent, personaPicUrl, showingContent }) => (
  <div>
    {showingContent && <Content onToggleContent={onToggleContent} persona={persona} showingContent={showingContent} />}
    <Launcher onToggleContent={onToggleContent} personaPicUrl={personaPicUrl} showingContent={showingContent} />
    {showingContent && <Gradient />}
  </div>
)

export default compose(
  graphql(
    gql`
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
    `,
    {
      hasPersona: !!optionsFromHash().persona,
      hostname: location.hostname,
      personaId: optionsFromHash().persona,
    }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    website: data.hostname && data.hostname.website,
  })),
  branch(({ website }) => !website, infoMsgHof(`no website found for hostname ${location.hostname}`)),
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
  withProps(({ persona }) => ({
    personaPicUrl: persona.profilePic.url,
  })),
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
)(App)
