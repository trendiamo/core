import routes from 'app/routes'
import ScriptedChatForm from './form'
import { apiRequest, apiScriptedChatShow, apiScriptedChatUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.scriptedChatsList(),
    title: 'Edit Scripted Chat',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.scriptedChatId
      const { json, errors, requestError } = await apiRequest(apiScriptedChatUpdate, [id, { scriptedChat: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      if (!errors && !requestError) enqueueSnackbar('Successfully updated scripted chat', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.scriptedChatId
      const { json, requestError } = await apiRequest(apiScriptedChatShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  }),
  withProps({
    showChildSteps: true,
  })
)(ScriptedChatForm)
