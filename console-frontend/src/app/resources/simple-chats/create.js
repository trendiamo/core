import routes from 'app/routes'
import SimpleChatForm from './form'
import { apiRequest, apiSimpleChatCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.simpleChatsList(),
    title: 'Create Simple Chat',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiSimpleChatCreate, [{ simpleChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully created simple chat', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        title: '',
        personaId: '',
        chatBubbleText: '',
        chatBubbleExtraText: '',
        simpleChatStepsAttributes: [
          {
            key: 'default',
            simpleChatMessagesAttributes: [{ text: '' }],
          },
        ],
      }
    },
  })
)(SimpleChatForm)
