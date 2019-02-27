import NavigationForm from './form'
import routes from 'app/routes'
import { apiNavigationShow, apiNavigationUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.navigationsList(),
    title: 'Edit Navigation',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.navigationId
      const { json, errors, requestError } = await apiRequest(apiNavigationUpdate, [id, { navigation: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      if (!errors && !requestError) enqueueSnackbar('Successfully updated navigation', { variant: 'success' })
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
