import routes from 'app/routes'
import TriggerForm from './form'
import { apiTriggerShow, apiTriggerUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withRouter } from 'react-router'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Triggers', route: routes.triggersList() }, { text: 'Edit Trigger' }],
  }),
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
        name: response.name || '',
        flowId: response.flowId || '',
        flowType: response.flowType || '',
        urlMatchers: response.urlMatchers || [''],
      }
    },
  })
)(TriggerForm)
