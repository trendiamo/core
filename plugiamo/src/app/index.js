import AppHacks from 'special/assessment/app-hacks'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { h } from 'preact'
import { location } from 'config'
import { optionsFromHash } from './setup'
import { ThemeContext } from 'plugin-base'
import { useMemo } from 'preact/hooks'

const AppGraphql = () => {
  const variables = useMemo(
    () => ({
      hasSeller: !!optionsFromHash().seller,
      pathname:
        location.hostname === 'www.pionier-workwear.com' ? `${location.pathname}${location.search}` : location.pathname,
      sellerId: optionsFromHash().seller,
      pluginPath: optionsFromHash().path,
    }),
    []
  )

  const data = useGraphql(
    gql`
      query($pathname: String!, $hasSeller: Boolean!, $sellerId: ID, $pluginPath: String) {
        website {
          name
          previewMode
          theme {
            roundEdges
            themeColor
            textColor
          }
        }
        flow(pathname: $pathname, pluginPath: $pluginPath) {
          id
          flowType
          teaserMessage
          extraTeaserMessage
          chatBubbleButtonYes
          chatBubbleButtonNo
          useSellerAnimation
          seller {
            id
            name
            bio
            img {
              url
            }
            imgRect {
              x
              y
              width
              height
            }
            animatedImg {
              url
            }
            instagramUrl
          }
          owner {
            id
            name
            bio
            img {
              url
            }
            imgRect {
              x
              y
              width
              height
            }
          }
        }
        seller(id: $sellerId) @include(if: $hasSeller) {
          id
          name
          bio
          img {
            url
          }
          imgRect {
            x
            y
            width
            height
          }
          animatedImg {
            url
          }
        }
      }
    `,
    variables
  )

  if (data.website && data.website.previewMode && !localStorage.getItem('trnd-plugin-enable-preview')) return null

  return (
    <ThemeContext.Provider value={data && data.website && data.website.theme}>
      <AppHacks data={data} />
    </ThemeContext.Provider>
  )
}

export default AppGraphql
