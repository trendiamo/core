import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseShow, apiShowcaseUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    backRoute: routes.showcasesList(),
    title: 'Edit Showcase',
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.showcaseId
      const { json, errors, requestError } = await apiRequest(apiShowcaseUpdate, [id, { showcase: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated showcase', { variant: 'success' })
      if (errors) setErrors(errors)
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.showcaseId
      const { json, requestError } = await apiRequest(apiShowcaseShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    },
  })
)(ShowcaseForm)
