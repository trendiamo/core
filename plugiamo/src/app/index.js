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
import { isSmall } from 'utils'
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

const App = ({ influencer, onToggleContent, sellerPicUrl, showingContent }) => (
  <div>
    {showingContent && (
      <Content influencer={influencer} onToggleContent={onToggleContent} showingContent={showingContent} />
    )}
    <Launcher onToggleContent={onToggleContent} sellerPicUrl={sellerPicUrl} showingContent={showingContent} />
    {showingContent && <Gradient />}
  </div>
)

export default compose(
  graphql(
    gql`
      query($hasInfluencer: Boolean!, $hostname: String!, $influencerId: ID) {
        hostname(where: { hostname: $hostname }) {
          website {
            flows {
              id
              order
              urlMatchers {
                regexp
              }
              chat {
                id
                influencer {
                  name
                  description
                  profilePic {
                    url
                  }
                }
              }
              curation {
                id
                influencer {
                  name
                  description
                  profilePic {
                    url
                  }
                }
              }
              success {
                id
                influencer {
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
        influencer(where: { id: $influencerId }) @include(if: $hasInfluencer) {
          name
          description
          profilePic {
            url
          }
        }
      }
    `,
    {
      hasInfluencer: !!optionsFromHash().persona,
      hostname: location.hostname,
      influencerId: optionsFromHash().persona,
    }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    website: data.hostname && data.hostname.website,
  })),
  branch(({ website }) => !website, infoMsgHof(`no website found for hostname ${location.hostname}`)),
  withState('influencer', 'setInfluencer'),
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      mixpanel.track('Loaded Plugin', { hash: location.hash, hostname: location.hostname })
      const { data, setInfluencer, setShowingContent } = this.props
      const { influencer, open } = setup(data)
      setInfluencer(influencer)

      if (open && !isSmall()) {
        setShowingContent(true)
      } else {
        mixpanel.time_event('Opened')
      }
    },
  }),
  branch(({ influencer }) => !influencer, renderNothing),
  withProps(({ influencer }) => ({
    sellerPicUrl: influencer.profilePic.url,
  })),
  withHandlers({
    // onCtaClick: ({ exposition }) => () => {
    //   mixpanel.track('Clicked CTA Link', { hostname: location.hostname }, () => {
    //     window.location = exposition.ctaUrl
    //   })
    // },
    onToggleContent: ({ setShowingContent, showingContent }) => () => {
      if (!showingContent) {
        mixpanel.track('Opened', { hostname: location.hostname })
        mixpanel.time_event('Clicked CTA Link')
        mixpanel.time_event('Closed')
      } else {
        mixpanel.track('Closed', { hostname: location.hostname })
        mixpanel.time_event('Opened')
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
