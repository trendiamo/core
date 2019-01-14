import i18n from 'ext/i18n'
import mixpanel from 'ext/mixpanel'
import routes from 'app/routes'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { history, Showcase as ShowcaseBase } from 'plugin-base'
import { isGraphCMS } from 'config'

const convertSpotlights = spotlights => {
  return spotlights.map(spotlight => {
    return { ...spotlight, translation: { selectedBy: i18n.productsSelectedBy(spotlight.persona.name.split(' ')[0]) } }
  })
}

const Showcase = compose(
  withProps({ history }),
  graphql(
    isGraphCMS
      ? gql`
          query($id: ID!) {
            showcase(where: { id: $id }) {
              id
              title
              subtitle
              spotlights {
                id
                persona {
                  id
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
        `
      : gql`
          query($id: ID!) {
            showcase(id: $id) {
              id
              title
              subtitle
              spotlights {
                id
                persona {
                  id
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
        `,
    ({ id }) => ({ id: id.replace(/\/.+/, '') })
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    showcase: data.showcase,
    spotlights: data.showcase && convertSpotlights(data.showcase.spotlights),
    subtitle: data.showcase && data.showcase.subtitle,
    title: data.showcase && data.showcase.title,
  })),
  withHandlers({
    routeToShowcase: ({ showcase }) => () => history.replace(routes.showcase(showcase.id)),
    routeToSpotlight: ({ showcase }) => spotlight => history.replace(routes.spotlight(showcase.id, spotlight.id)),
  }),
  withHandlers({
    onSpotlightClick: ({ routeToSpotlight }) => ({ spotlight }) => () => {
      mixpanel.track('Clicked Persona', {
        flowType: 'showcase',
        hostname: location.hostname,
        personaName: spotlight.persona.name,
        personaRef: spotlight.persona.id,
      })
      routeToSpotlight(spotlight)
    },
    onProductClick: () => ({ product, spotlight }) => () => {
      mixpanel.track(
        'Clicked Product',
        {
          flowType: 'showcase',
          personaName: spotlight.persona.name,
          personaRef: spotlight.persona.id,
          hostname: location.hostname,
          productName: product.name,
        },
        () => {
          window.location = product.url
        }
      )
    },
  }),
  withProps(({ onSpotlightClick, onProductClick }) => ({
    callbacks: {
      onSpotlightClick,
      onProductClick,
    },
  }))
)(ShowcaseBase)

export default Showcase
