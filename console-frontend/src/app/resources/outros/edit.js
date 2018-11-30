import OutroForm from './form'
import routes from 'app/routes'
import { apiOutroShow, apiOutroUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Outros', route: routes.outrosList() }, { text: 'Edit Outro' }],
  }),
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
