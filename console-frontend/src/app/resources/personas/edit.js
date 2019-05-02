import PersonaForm from './form'
import React from 'react'
import routes from 'app/routes'
import { apiPersonaShow, apiPersonaUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const PersonaForm1 = compose(
  withProps({
    backRoute: routes.personasList(),
    title: 'Edit Persona',
  }),
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

const PersonaForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <PersonaForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default PersonaForm2
