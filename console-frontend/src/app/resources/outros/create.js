import OutroForm from './form'
import routes from 'app/routes'
import { apiOutroCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Outros', route: routes.outrosList() }, { text: 'Create Outro' }],
  }),
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
