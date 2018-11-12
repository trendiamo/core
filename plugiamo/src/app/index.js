import addPicture from './add-picture'
import animateOnMount from 'shared/animate-on-mount'
import Content from './content'
import history from 'ext/history'
import infoMsg from 'ext/recompose/info-msg'
import Launcher from './launcher'
import mixpanel from 'ext/mixpanel'
import routes from './routes'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { location } from 'config'
import { matchUrl } from 'ext/simple-router'

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

const optionsFromHash = () => {
  const result = {}
  if (!location.hash) return result
  const match = /trnd:([^&]+)/.exec(location.hash)
  if (!match) return result
  match[1].split(',').forEach(pairStr => {
    const matches = /(.+):(.+)/.exec(pairStr)
    result[matches[1]] = matches[2]
  })
  return result
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
  withState('influencer', 'setInfluencer'),
  withState('showingContent', 'setShowingContent', false),
  lifecycle({
    componentDidMount() {
      mixpanel.track('Loaded Plugin', { hash: location.hash, hostname: location.hostname })
      const { influencer, open, path, picture } = optionsFromHash()

      /* set influencer */ {
        const { chat, setInfluencer, website } = this.props
        let influencerObj
        if (influencer) {
          const influencers = [chat && chat.influencer, ...website.spotlights].filter(e => e)
          influencerObj = influencers.find(e => e.id === influencer)
        }
        const defaultInfluencer = influencerObj
          ? influencerObj.influencer
          : chat
          ? chat.influencer
          : website.spotlights.length
          ? website.spotlights[0].influencer
          : undefined
        setInfluencer(defaultInfluencer)
      }

      if (picture) addPicture(picture)
      if (path) {
        history.replace(path)
      } else {
        const { chat } = this.props
        if (chat) history.replace(routes.scriptedChat(chat.id))
      }
      if (open && open.match(/1|true/)) {
        const { setShowingContent } = this.props
        setShowingContent(true)
      } else {
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
