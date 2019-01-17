import routes from 'app/routes'
import TriggerForm from './form'
import { apiRequest, apiTriggerCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Triggers', route: routes.triggersList() }, { text: 'Create Trigger' }],
  }),
  withSnackbar,
  withHandlers({
    formObjectTransformer: () => json => json,
    saveFormObject: ({ enqueueSnackbar }) => async (form, { setErrors }) => {
      const { json, errors, requestError } = await apiRequest(apiTriggerCreate, [{ trigger: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      return json
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        flowId: '',
        flowType: '',
        urlMatchers: [''],
      }
    },
  })
)(TriggerForm)
