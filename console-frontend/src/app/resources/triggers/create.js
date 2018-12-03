import routes from 'app/routes'
import TriggerForm from './form'
import { apiTriggerCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Triggers', route: routes.triggersList() }, { text: 'Create Trigger' }],
  }),
  withHandlers({
    saveFormObject: () => async (form, { setErrors }) => {
      const response = await apiTriggerCreate({ trigger: form })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        name: '',
        flowId: '',
        flowType: '',
        urlMatchers: [''],
      }
    },
  })
)(TriggerForm)
