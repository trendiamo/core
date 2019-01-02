import NavigationForm from './form'
import routes from 'app/routes'
import { apiNavigationShow, apiNavigationUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Navigations', route: routes.navigationsList() }, { text: 'Edit Navigation' }],
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.navigationId
      const response = await apiRequest(apiNavigationUpdate, [id, { navigation: form }], {
        enqueueSnackbar,
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.navigationId
      const response = await apiRequest(apiNavigationShow, [id], {
        enqueueSnackbar,
      })
      return {
        personaId: response.persona.id || '',
        name: response.name || '',
        __persona: response.persona,
        navigationItemsAttributes: response.navigationItemsAttributes.map(navigationItem => ({
          id: navigationItem.id || '',
          text: navigationItem.text || '',
          url: navigationItem.url || '',
          picUrl: navigationItem.picUrl || '',
        })),
      }
    },
  })
)(NavigationForm)
