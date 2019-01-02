import ShowcaseForm from './form'
import routes from 'app/routes'
import { apiShowcaseCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Showcases', route: routes.showcasesList() }, { text: 'Create Showcase' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const response = await apiRequest(apiShowcaseCreate, [{ showcase: form }], {
        enqueueSnackbar,
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        personaId: '',
        title: '',
        subtitle: '',
        spotlightsAttributes: [
          {
            text: '',
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
