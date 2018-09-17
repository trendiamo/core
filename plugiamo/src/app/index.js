import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import { h } from 'preact'
import infoMsg from 'ext/recompose/info-msg'
import Launcher from './launcher'
import mixpanel from 'mixpanel-browser'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'

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

const App = ({ exposition, onCtaClick, onToggleContent, showingContent }) => (
  <div>
    {showingContent && <Content exposition={exposition} onCtaClick={onCtaClick} />}
    <Launcher influencer={exposition.influencer} onToggleContent={onToggleContent} showingContent={showingContent} />
    {showingContent && <Gradient />}
  </div>
)

export default compose(
  graphql(
    gql`
      query($domain: String!) {
        exposition(where: { domain: $domain }) {
          id
          ctaText
          ctaUrl
          description
          influencer {
            name
            profilePic {
              url
            }
          }
          videos {
            videoUrl
          }
          instagramPosts {
            url
          }
        }
      }
    `,
    { domain: location.host }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    exposition: data.exposition,
  })),
  branch(({ exposition }) => !exposition, infoMsg('Trendiamo: no content found for this domain')),
  withState('showingContent', 'setShowingContent', false),
  withHandlers({
    onCtaClick: ({ exposition }) => () => {
      mixpanel.track('ClickedCTA', {
        host: window.location.hostname,
      })
      mixpanel.reset
      // window.location = exposition.ctaUrl
    },
    onToggleContent: ({ setShowingContent, showingContent }) => () => {
      mixpanel.track(!showingContent ? 'Opened' : 'Closed', {
        host: window.location.hostname,
      })
      if (!showingContent) {
        mixpanel.time_event('ClickedCTA')
        mixpanel.time_event('Closed')
      } else {
        mixpanel.reset
        mixpanel.time_event('Opened')
      }
      return setShowingContent(!showingContent)
    },
  })
)(App)
