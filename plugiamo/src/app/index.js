import AppHacks from 'special/assessment/app-hacks'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { h } from 'preact'
import { location } from 'config'
import { optionsFromHash } from './setup'
import { useMemo } from 'preact/hooks'

const AppGraphql = () => {
  const variables = useMemo(
    () => ({
      hasPersona: !!optionsFromHash().persona,
      pathname:
        location.hostname === 'www.pionier-workwear.com' ? `${location.pathname}${location.search}` : location.pathname,
      personaId: optionsFromHash().persona,
      pluginPath: optionsFromHash().path,
    }),
    []
  )

  const data = useGraphql(
    gql`
      query($pathname: String!, $hasPersona: Boolean!, $personaId: ID, $pluginPath: String) {
        website {
          name
          previewMode
        }
        flow(pathname: $pathname, pluginPath: $pluginPath) {
          id
          flowType
          chatBubbleText
          chatBubbleExtraText
          chatBubbleButtonYes
          chatBubbleButtonNo
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
          }
        }
        persona(id: $personaId) @include(if: $hasPersona) {
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
        }
      }
    `,
    variables
  )

  if (data.website && data.website.previewMode && !localStorage.getItem('trnd-plugin-enable-preview')) return null

  return <AppHacks data={data} />
}

export default AppGraphql
