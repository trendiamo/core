import OutroForm from './form'
import routes from 'app/routes'
import { apiOutroShow, apiOutroUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Outros', route: routes.outrosList() }, { text: 'Edit Outro' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.outroId
      const response = await apiRequest(apiOutroUpdate, [id, { outro: form }], {
        enqueueSnackbar,
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.outroId
      const response = await apiRequest(apiOutroShow, [id], {
        enqueueSnackbar,
      })
      return {
        personaId: response.persona.id || '',
        name: response.name || '',
        __persona: response.persona,
      }
    },
  })
)(OutroForm)
