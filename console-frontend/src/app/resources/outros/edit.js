import OutroForm from './form'
import routes from 'app/routes'
import { apiOutroShow, apiOutroUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.outrosList(),
    title: 'Edit Outro',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.outroId
      const { json, errors, requestError } = await apiRequest(apiOutroUpdate, [id, { outro: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated outro', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.outroId
      const { json, requestError } = await apiRequest(apiOutroShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  })
)(OutroForm)
