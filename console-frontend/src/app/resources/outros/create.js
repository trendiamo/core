import OutroForm from './form'
import routes from 'app/routes'
import { apiOutroCreate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.outrosList(),
    title: 'Create Outro',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar }) => async form => {
      const { json, errors, requestError } = await apiRequest(apiOutroCreate, [{ outro: form }])
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
        chatBubbleButtonYes: '',
        chatBubbleButtonNo: '',
      }
    },
  })
)(OutroForm)
