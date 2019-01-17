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
      return json
    },
  })
)(NavigationForm)
