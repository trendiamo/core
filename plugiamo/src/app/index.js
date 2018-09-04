import Content from './content'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { h } from 'preact'
import Launcher from './launcher'
import ReactGA from 'react-ga'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'

const App = ({ exposition, onCtaClick, onToggleContent, showingContent }) => (
  <div>
    {showingContent && <Content exposition={exposition} onCtaClick={onCtaClick} />}
    <Launcher influencer={exposition.influencer} onToggleContent={onToggleContent} showingContent={showingContent} />
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
    {
      options: () => ({
        variables: { domain: location.host },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    exposition: data.exposition,
  })),
  withState('showingContent', 'setShowingContent', false),
  withHandlers({
    onCtaClick: ({ exposition }) => () => {
      ReactGA.event({
        action: 'Click CTA',
        category: 'Content',
      })
      window.location = exposition.ctaUrl
    },
    onToggleContent: ({ setShowingContent, showingContent }) => () => {
      ReactGA.event({
        action: !showingContent ? 'Opened' : 'Closed',
        category: 'Launcher',
      })
      return setShowingContent(!showingContent)
    },
  })
)(App)
