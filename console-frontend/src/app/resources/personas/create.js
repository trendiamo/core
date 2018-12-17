import PersonaForm from './form'
import routes from 'app/routes'
import { apiPersonaCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Personas', route: routes.personasList() }, { text: 'Create Persona' }],
  }),
  withHandlers({
    saveFormObject: () => async (form, { setErrors }) => {
      const response = await apiPersonaCreate({ persona: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        description: '',
        profilePicUrl: '',
      }
    },
  })
)(PersonaForm)
