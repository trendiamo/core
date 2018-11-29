import OutroForm from './form'
import { apiOutroShow, apiOutroUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withTitle } from 'ext/recompose/with-title'

export default compose(
  withTitle('Edit Outro'),
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setErrors }) => {
      const id = match.params.outroId
      const response = await apiOutroUpdate(id, { outro: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async () => {
      const id = match.params.outroId
      const response = await apiOutroShow(id)
      return {
        personaId: response.persona.id || '',
      }
    },
  })
)(OutroForm)
