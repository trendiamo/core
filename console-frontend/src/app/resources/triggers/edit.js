import routes from 'app/routes'
import TriggerForm from './form'
import { apiRequest, apiTriggerShow, apiTriggerUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withRouter } from 'react-router'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Triggers', route: routes.triggersList() }, { text: 'Edit Trigger' }],
  }),
  withRouter,
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.triggerId
      const response = await apiRequest(apiTriggerUpdate, [id, { trigger: form }], {
        enqueueSnackbar,
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.triggerId
      const response = await apiRequest(apiTriggerShow, [id], {
        enqueueSnackbar,
      })
      return {
        flowId: response.flowId || '',
        flowType: response.flowType || '',
        urlMatchers: response.urlMatchers || [''],
        flowLabel: response.flow.name,
      }
    },
  })
)(TriggerForm)
