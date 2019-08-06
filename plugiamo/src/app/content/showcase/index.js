import FlowBackButton from 'shared/flow-back-button'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import useEmojify from 'ext/hooks/use-emojify'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { h } from 'preact'
import { history, Showcase as ShowcaseBase } from 'plugin-base'
import { isPCAssessment, rememberSeller } from 'special/assessment/utils'
import { markGoFwd, replaceLastPath } from 'app/setup/flow-history'
import { routes, SpotlightItem } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const assessmentSpotlight = {
  seller: {
    name: 'Style Assistent',
    bio: 'In wenigen Schritten finden was zu dir passt!',
  },
}

const convertSpotlights = (emojify, spotlights, onSpotlightClick) => {
  const results = spotlights.map(spotlight => ({
    ...spotlight,
    seller: {
      ...spotlight.seller,
      bio: emojify(spotlight.seller.bio),
    },
    productPicks: spotlight.productPicks.map(productPick => ({
      ...productPick,
      description: emojify(productPick.description),
    })),
    translation: {
      selectedBy: emojify(getFrekklsConfig().i18n.productsSelectedBy(spotlight.seller.name.split(' ')[0])),
    },
  }))

  if (isPCAssessment()) {
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
  const [spotlights, setSpotlights] = useState([])
  const [subheading, setSubheading] = useState('')
  const [heading, setHeading] = useState('')

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
      mixpanel.track('Clicked Seller', {
        flowType: 'showcase',
        hostname: location.hostname,
        sellerName: spotlight.seller.name,
        sellerRef: spotlight.seller.id,
        sellerOrder: spotlight.order,
      })
      if (isPCAssessment()) rememberSeller(spotlight.seller)
      routeToSpotlight(spotlight.id)
    },
    [routeToSpotlight, setShowAssessmentContent]
  )

  const onProductClick = useCallback((product, spotlight) => {
    mixpanel.track(
      'Clicked Product',
      {
        flowType: 'showcase',
        sellerName: spotlight.seller.name,
        sellerRef: spotlight.seller.id,
        hostname: location.hostname,
        productName: product.name,
      },
      () => {
        markGoFwd()
        window.location = product.url
      }
    )
  }, [])

  const emojify = useEmojify()
  useEffect(() => {
    if (!emojify) return
    setSpotlights(convertSpotlights(emojify, showcase.spotlights, onSpotlightClick))
    setSubheading(emojify(showcase.subheading))
    setHeading(emojify(showcase.heading))
  }, [emojify, onSpotlightClick, showcase.spotlights, showcase.subheading, showcase.heading])

  const callbacks = useMemo(
    () => ({
      onSpotlightClick,
      onProductClick,
    }),
    [onProductClick, onSpotlightClick]
  )

  if (spotlights.length === 0) return null

  return (
    <ShowcaseBase
      {...props}
      backButtonLabel={getFrekklsConfig().i18n.backButton}
      callbacks={callbacks}
      FlowBackButton={FlowBackButton}
      heading={heading}
      history={history}
      routeToShowcase={routeToShowcase}
      showcase={showcase}
      spotlights={spotlights}
      subheading={subheading}
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
          heading
          subheading
          useSellerAnimation
          spotlights {
            id
            order
            useSellerAnimation
            seller {
              id
              name
              bio
              profilePic {
                url
              }
              picRect {
                x
                y
                width
                height
              }
              profilePicAnimation {
                url
              }
              instagramUrl
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
