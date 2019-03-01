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
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const { json, errors, requestError } = await apiRequest(apiSimpleChatCreate, [{ simpleChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
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
        simpleChatStepsAttributes: [
          {
            simpleChatMessagesAttributes: [{ text: '' }],
          },
        ],
      }
    },
  })
)(SimpleChatForm)
