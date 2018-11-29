import TriggerForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiTriggerShow, apiTriggerUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withRouter } from 'react-router'

export default compose(
  withRaTitle('Edit Trigger'),
  withRouter,
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setErrors }) => {
      const id = match.params.triggerId
      const response = await apiTriggerUpdate(id, { trigger: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async () => {
      const id = match.params.triggerId
      const response = await apiTriggerShow(id)
      return {
        name: response.trigger.name || '',
        order: response.trigger.order || '',
        flowId: response.trigger.flowId || '',
        flowType: response.trigger.flowType || '',
        urlMatchers: response.trigger.urlMatchers || [''],
      }
    },
  })
)(TriggerForm)
