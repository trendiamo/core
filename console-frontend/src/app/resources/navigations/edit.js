import NavigationForm from './form'
import routes from 'app/routes'
import { apiNavigationShow, apiNavigationUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Navigations', route: routes.navigationsList() }, { text: 'Edit Navigation' }],
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.navigationId
      const { json, errors, requestError } = await apiRequest(apiNavigationUpdate, [id, { navigation: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.navigationId
      const { json, requestError } = await apiRequest(apiNavigationShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return {
        personaId: json.persona.id || '',
        name: json.name || '',
        chatBubbleText: json.chatBubbleText || '',
        __persona: json.persona,
        navigationItemsAttributes: json.navigationItemsAttributes.map(navigationItem => ({
          id: navigationItem.id || '',
          text: navigationItem.text || '',
          url: navigationItem.url || '',
          picUrl: navigationItem.picUrl || '',
        })),
      }
    },
  })
)(NavigationForm)
