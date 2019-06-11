import emojify from 'ext/emojify'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import { assessmentHack, rememberPersona } from 'special/assessment/utils'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { history, Showcase as ShowcaseBase } from 'plugin-base'
import { markGoFwd, replaceLastPath } from 'app/setup/flow-history'
import { routes, SpotlightItem } from 'plugin-base'

const assessmentSpotlight = {
  persona: {
    name: 'Style Assistent',
    description: 'In wenigen Schritten finden was zu dir passt!',
  },
}

const convertSpotlights = (spotlights, onSpotlightClick) => {
  const results = spotlights.map(spotlight => ({
    ...spotlight,
    persona: {
      ...spotlight.persona,
      description: emojify(spotlight.persona.description),
    },
    productPicks: spotlight.productPicks.map(productPick => ({
      ...productPick,
      description: emojify(productPick.description),
    })),
    translation: {
      selectedBy: emojify(getFrekklsConfig().i18n.productsSelectedBy(spotlight.persona.name.split(' ')[0])),
    },
  }))

  if (assessmentHack()) {
    return [
      {
        Component: <SpotlightItem bordered onClick={onSpotlightClick} spotlight={assessmentSpotlight} withoutPicture />,
      },
      ...results,
    ]
  }

  return results
}

const Showcase = compose(
  withProps({
    history,
    FlowBackButton,
    backButtonLabel: getFrekklsConfig().i18n.backButton,
  }),
  graphql(
    gql`
      query($id: ID!) {
        showcase(id: $id) {
          id
          title
          subtitle
          spotlights {
            id
            order
            persona {
              id
              name
              description
              profilePic {
                url
              }
              picRect {
                x
                y
                width
                height
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
              picRect {
                x
                y
                width
                height
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
  })),
  withHandlers({
    routeToShowcase: ({ showcase }) => () => {
      const newRoute = routes.showcase(showcase.id)
      replaceLastPath(newRoute)
      history.replace(newRoute)
    },
    routeToSpotlight: ({ showcase }) => spotlightId => {
      const newRoute = routes.spotlight(showcase.id, spotlightId)
      replaceLastPath(newRoute)
      history.replace(newRoute)
    },
  }),
  withHandlers({
    onSpotlightClick: ({ routeToSpotlight, setShowAssessmentContent }) => spotlight => {
      if (!spotlight.productPicks) {
        setTimeout(() => setShowAssessmentContent(true), 300)
        mixpanel.track('Clicked Self-Assessment Spotlight', {
          flowType: 'showcase',
          hostname: location.hostname,
        })
        return
      }
      mixpanel.track('Clicked Persona', {
        flowType: 'showcase',
        hostname: location.hostname,
        personaName: spotlight.persona.name,
        personaRef: spotlight.persona.id,
        personaOrder: spotlight.order,
      })
      if (assessmentHack()) rememberPersona(spotlight.persona)
      routeToSpotlight(spotlight.id)
    },
    onProductClick: () => (product, spotlight) => {
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
  withProps(({ data, onSpotlightClick }) => ({
    spotlights: data.showcase && convertSpotlights(data.showcase.spotlights, onSpotlightClick),
    subtitle: data.showcase && emojify(data.showcase.subtitle),
    title: data.showcase && emojify(data.showcase.title),
  })),
  withProps(({ onSpotlightClick, onProductClick }) => ({
    callbacks: {
      onSpotlightClick,
      onProductClick,
    },
  }))
)(ShowcaseBase)

export default Showcase
