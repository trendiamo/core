import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.showcasesList(),
    title: 'Create Showcase',
  }),
  withSnackbar,
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
