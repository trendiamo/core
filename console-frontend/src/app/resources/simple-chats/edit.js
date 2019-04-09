import routes from 'app/routes'
import SimpleChatForm from './form'
import { apiRequest, apiSimpleChatShow, apiSimpleChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.simpleChatsList(),
    title: 'Edit Simple Chat',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.simpleChatId
      const { json, errors, requestError } = await apiRequest(apiSimpleChatUpdate, [id, { simpleChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated simple chat', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.simpleChatId
      const { json, requestError } = await apiRequest(apiSimpleChatShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(SimpleChatForm)
