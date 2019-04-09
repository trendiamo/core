import NavigationForm from './form'
import routes from 'app/routes'
import { apiNavigationCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.navigationsList(),
    title: 'Create Navigation',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiNavigationCreate, [{ navigation: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        personaId: '',
        name: '',
        chatBubbleText: '',
        chatBubbleExtraText: '',
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
