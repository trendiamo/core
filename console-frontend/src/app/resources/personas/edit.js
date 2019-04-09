import PersonaForm from './form'
import routes from 'app/routes'
import { apiPersonaShow, apiPersonaUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.personasList(),
    title: 'Edit Persona',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.personaId
      const { json, errors, requestError } = await apiRequest(apiPersonaUpdate, [id, { persona: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated persona', { variant: 'success' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.personaId
      const { json, requestError } = await apiRequest(apiPersonaShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  })
)(PersonaForm)
