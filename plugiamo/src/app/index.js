import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import { h } from 'preact'
import history from 'ext/history'
import infoMsg from 'ext/recompose/info-msg'
import Launcher from './launcher'
import { location } from 'config'
import { matchUrl } from 'ext/simple-router'
import mixpanel from 'ext/mixpanel'
import routes from './routes'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'

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

const App = ({ onToggleContent, sellerPicUrl, showingContent, website }) => (
  <div>
    {showingContent && <Content onToggleContent={onToggleContent} showingContent={showingContent} website={website} />}
    <Launcher onToggleContent={onToggleContent} sellerPicUrl={sellerPicUrl} showingContent={showingContent} />
    {showingContent && <Gradient />}
  </div>
)

const pathFromHash = () => {
  if (!location.hash) return
  const match = /trnd:([^&]+)/.exec(location.hash)
  if (!match) return
  return match[1]
}

export default compose(
  graphql(
    gql`
      query($hostname: String!) {
        hostname(where: { hostname: $hostname }) {
          website {
            title
            subtitle
            chats {
              id
              path
              influencer {
                name
                description
                profilePic {
                  url
                }
              }
            }
            spotlights {
              id
              influencer {
                name
                description
                profilePic {
                  url
                }
              }
              productPicks {
                url
                name
                description
                displayPrice
                picture {
                  url
                }
              }
            }
          }
        }
      }
    `,
    { hostname: location.hostname }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    website: data.hostname && data.hostname.website,
  })),
  branch(({ website }) => !website, infoMsg(`no website found for hostname ${location.hostname}`)),
  withProps(({ website }) => ({
    chat: website.chats.find(chat => matchUrl(location.pathname, chat.path)),
  })),
  withProps(({ chat, website }) => ({
    influencer: chat ? chat.influencer : website.spotlights.length ? website.spotlights[0].influencer : undefined,
  })),
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      const path = pathFromHash()
      mixpanel.track('Loaded Plugin', { hostname: location.hostname, path })
      if (path) {
        const { setShowingContent } = this.props
        history.replace(path)
        setShowingContent(true)
      } else {
        const { chat } = this.props
        if (chat) history.replace(routes.scriptedChat(chat.id))
        mixpanel.time_event('Opened')
      }
    },
  }),
  withProps(({ influencer }) => ({
    sellerPicUrl: influencer ? influencer.profilePic.url : undefined,
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
