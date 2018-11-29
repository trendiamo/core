import OutroForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiOutroCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withRaTitle('Create Outro'),
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
