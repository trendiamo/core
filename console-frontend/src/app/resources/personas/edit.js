import PersonaForm from './form'
import routes from 'app/routes'
import { apiPersonaShow, apiPersonaUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Personas', route: routes.personasList() }, { text: 'Edit Persona' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.personaId
      const { json, errors, requestError } = await apiRequest(apiPersonaUpdate, [id, { persona: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.personaId
      const { json, requestError } = await apiRequest(apiPersonaShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      const resultObject = {
        name: json.name || '',
        description: json.description || '',
        profilePicUrl: json.profilePicUrl || '',
      }
      return resultObject
    },
  })
)(PersonaForm)
