import emojify from 'ext/emojify'
import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import { assessmentHack, rememberPersona } from 'special/assessment/utils'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { h } from 'preact'
import { history, Showcase as ShowcaseBase } from 'plugin-base'
import { markGoFwd, replaceLastPath } from 'app/setup/flow-history'
import { routes, SpotlightItem } from 'plugin-base'
import { useCallback, useMemo } from 'preact/hooks'

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

const Showcase = ({ setShowAssessmentContent, showcase, ...props }) => {
  const routeToShowcase = useCallback(() => {
    const newRoute = routes.showcase(showcase.id)
    replaceLastPath(newRoute)
    history.replace(newRoute)
  }, [showcase.id])

  const routeToSpotlight = useCallback(
    spotlightId => {
      const newRoute = routes.spotlight(showcase.id, spotlightId)
      replaceLastPath(newRoute)
      history.replace(newRoute)
    },
    [showcase.id]
  )

  const onSpotlightClick = useCallback(
    spotlight => {
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
    [routeToSpotlight, setShowAssessmentContent]
  )

  const onProductClick = useCallback((product, spotlight) => {
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
  }, [])

  const spotlights = useMemo(() => convertSpotlights(showcase.spotlights, onSpotlightClick), [
    onSpotlightClick,
    showcase.spotlights,
  ])
  const subtitle = useMemo(() => emojify(showcase.subtitle), [showcase.subtitle])
  const title = useMemo(() => emojify(showcase.title), [showcase.title])
  const callbacks = useMemo(
    () => ({
      onSpotlightClick,
      onProductClick,
    }),
    [onProductClick, onSpotlightClick]
  )

  return (
    <ShowcaseBase
      {...props}
      backButtonLabel={getFrekklsConfig().i18n.backButton}
      callbacks={callbacks}
      FlowBackButton={FlowBackButton}
      history={history}
      routeToShowcase={routeToShowcase}
      showcase={showcase}
      spotlights={spotlights}
      subtitle={subtitle}
      title={title}
    />
  )
}

const ShowcaseGraphql = ({ id, ...props }) => {
  const variables = useMemo(() => ({ id: id.replace(/\/.+/, '') }), [id])

  const data = useGraphql(
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
    variables
  )

  if (!data || data.loading || data.error || !data.showcase) return null

  return <Showcase {...props} showcase={data.showcase} />
}

export default ShowcaseGraphql
