import TriggerForm from './form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiTriggerCreate } from 'utils'
import { compose, withHandlers } from 'recompose'
import { extractErrors } from 'utils/shared'

export default compose(
  withRaTitle('Create Trigger'),
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
        order: '',
        flowId: '',
        flowType: '',
        urlMatchers: [''],
      }
    },
  })
)(TriggerForm)
