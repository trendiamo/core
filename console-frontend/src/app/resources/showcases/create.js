import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Showcases', route: routes.showcasesList() }, { text: 'Create Showcase' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const { json, errors, requestError } = await apiRequest(apiShowcaseCreate, [{ showcase: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
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
