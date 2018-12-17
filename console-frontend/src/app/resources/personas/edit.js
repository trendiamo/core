import PersonaForm from './form'
import routes from 'app/routes'
import { apiPersonaShow, apiPersonaUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Personas', route: routes.personasList() }, { text: 'Edit Persona' }],
  }),
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setErrors }) => {
      const id = match.params.personaId
      const response = await apiPersonaUpdate(id, { persona: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async () => {
      const id = match.params.personaId
      const result = await apiPersonaShow(id)
      const resultObject = {
        name: result.name || '',
        description: result.description || '',
        profilePicUrl: result.profilePicUrl || '',
      }
      return resultObject
    },
  })
)(PersonaForm)
