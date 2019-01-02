import routes from 'app/routes'
import ScriptedChatForm from './form'
import { apiRequest, apiScriptedChatCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Scripted Chats', route: routes.scriptedChatsList() }, { text: 'Create Scripted Chat' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const response = await apiRequest(apiScriptedChatCreate, [{ scriptedChat: form }], {
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
