import React from 'react'
import routes from 'app/routes'
import TriggerForm from './form'
import { apiRequest, apiTriggerShow, apiTriggerUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const TriggerForm1 = compose(
  withProps({
    backRoute: routes.triggersList(),
    title: 'Edit Trigger',
  }),
  withRouter,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.triggerId
      const { json, errors, requestError } = await apiRequest(apiTriggerUpdate, [id, { trigger: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated trigger', { variant: 'success' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.triggerId
      const { json, requestError } = await apiRequest(apiTriggerShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  })
)(TriggerForm)

const TriggerForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <TriggerForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default TriggerForm2
