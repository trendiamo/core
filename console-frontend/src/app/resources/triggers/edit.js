import TriggerForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiTriggerShow, apiTriggerUpdate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router'

export default compose(
  withRaTitle('Edit Trigger'),
  withRouter,
  withHandlers({
    saveFormObject: ({ match }) => async (form, { setInfo }) => {
      const id = match.params.triggerId
      return await apiTriggerUpdate(id, { trigger: form }, setInfo)
    },
  }),
  withHandlers({
    loadFormObject: ({ match }) => async ({ setInfo }) => {
      const id = match.params.triggerId
      const response = await apiTriggerShow(id, setInfo)
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
