import routes from 'app/routes'
import ScriptedChatForm from './form'
import { apiRequest, apiScriptedChatCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Scripted Chats', route: routes.scriptedChatsList() }, { text: 'Create Scripted Chat' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const { json, errors, requestError } = await apiRequest(apiScriptedChatCreate, [{ scriptedChat: form }])
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
        chatStepAttributes: {
          chatMessagesAttributes: [
            {
              delay: '',
              text: '',
            },
          ],
        },
      }
    },
  })
)(ScriptedChatForm)
