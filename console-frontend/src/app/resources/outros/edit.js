import OutroForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiOutroShow, apiOutroUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withRaTitle('Edit Outro'),
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
