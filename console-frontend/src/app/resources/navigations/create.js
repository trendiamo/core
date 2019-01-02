import NavigationForm from './form'
import routes from 'app/routes'
import { apiNavigationCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Navigations', route: routes.navigationsList() }, { text: 'Create Navigation' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const response = await apiRequest(apiNavigationCreate, [{ navigation: form }], {
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
        personaId: '',
        name: '',
        navigationItemsAttributes: [
          {
            text: '',
            url: '',
            picUrl: '',
          },
        ],
      }
    },
  })
)(NavigationForm)
