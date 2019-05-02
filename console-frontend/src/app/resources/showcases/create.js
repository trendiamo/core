import React from 'react'
import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const ShowcaseForm1 = compose(
  withProps({
    backRoute: routes.showcasesList(),
    title: 'Create Showcase',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiShowcaseCreate, [{ showcase: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully created showcase', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        personaId: '',
        title: '',
        subtitle: '',
        chatBubbleText: '',
        chatBubbleExtraText: '',
        spotlightsAttributes: [
          {
            personaId: '',
            productPicksAttributes: [
              {
                url: '',
                name: '',
                description: '',
                displayPrice: '',
                picUrl: '',
              },
            ],
          },
        ],
      }
    },
  })
)(ShowcaseForm)

const ShowcaseForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <ShowcaseForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default ShowcaseForm2
