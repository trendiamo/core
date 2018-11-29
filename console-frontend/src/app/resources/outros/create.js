import OutroForm from './form'
import { apiOutroCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withTitle } from 'ext/recompose/with-title'

export default compose(
  withTitle('Create Outro'),
  withHandlers({
    saveFormObject: () => async (form, { setErrors }) => {
      const response = await apiOutroCreate({ outro: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        personaId: '',
      }
    },
  })
)(OutroForm)
