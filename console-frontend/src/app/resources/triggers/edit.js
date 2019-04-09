import routes from 'app/routes'
import TriggerForm from './form'
import { apiRequest, apiTriggerShow, apiTriggerUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withRouter } from 'react-router'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.triggersList(),
    title: 'Edit Trigger',
  }),
  withRouter,
  withSnackbar,
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
