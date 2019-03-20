import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import routes from 'app/routes'
import { assessmentHack } from 'special/assessment/utils'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { history, Showcase as ShowcaseBase } from 'plugin-base'
import { markGoFwd, replaceLastPath } from 'app/setup/flow-history'

const convertSpotlights = spotlights => {
  return spotlights.map(spotlight => {
    return {
      ...spotlight,
      translation: { selectedBy: getFrekklsConfig().i18n.productsSelectedBy(spotlight.persona.name.split(' ')[0]) },
    }
  })
}

const Showcase = compose(
  withProps({ history, FlowBackButton }),
  graphql(
    gql`
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
              instagramUrl
              profilePicAnimationUrl
            }
            productPicks {
              id
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
    routeToShowcase: ({ showcase }) => () => {
      const newRoute = routes.showcase(showcase.id)
      replaceLastPath(newRoute)
      history.replace(newRoute)
    },
    routeToSpotlight: ({ showcase }) => spotlight => {
      const newRoute = routes.spotlight(showcase.id, spotlight.id)
      replaceLastPath(newRoute)
      history.replace(newRoute)
    },
  }),
  withHandlers({
    onSpotlightClick: ({ routeToSpotlight, setShowAssessmentContent }) => ({ spotlight }) => index => {
      mixpanel.track('Clicked Persona', {
        flowType: 'showcase',
        hostname: location.hostname,
        personaName: spotlight.persona.name,
        personaRef: spotlight.persona.id,
      })
      if (index === 0 && assessmentHack()) {
        setTimeout(() => setShowAssessmentContent(true), 300)
      }
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
          markGoFwd()
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
