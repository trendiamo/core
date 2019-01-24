import FlowBackButton from 'shared/flow-back-button'
import mixpanel from 'ext/mixpanel'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { markGoFwd } from 'app/setup/flow-history'
import { Navigation as NavigationBase } from 'plugin-base'

const Navigation = compose(
  graphql(
    gql`
      query($id: ID!) {
        navigation(id: $id) {
          id
          navigationItems {
            id
            text
            url
            picture {
              url
            }
          }
        }
      }
    `,
    ({ id }) => ({ id })
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    navigationItems: data.navigation && data.navigation.navigationItems,
    FlowBackButton,
  })),
  withHandlers({
    onTileClick: () => navigationItem => {
      mixpanel.track(
        'Clicked Product',
        {
          flowType: 'navigation',
          hostname: location.hostname,
          navItemText: navigationItem.text,
        },
        () => {
          markGoFwd()
          window.location = navigationItem.url
        }
      )
    },
  })
)(NavigationBase)

export default Navigation
