import routes from 'app/routes'
import TriggerForm from './form'
import { apiRequest, apiTriggerCreate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.triggersList(),
    title: 'Create Trigger',
  }),
  withSnackbar,
  withHandlers({
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
