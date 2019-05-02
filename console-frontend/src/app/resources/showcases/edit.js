import React from 'react'
import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseShow, apiShowcaseUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { useSnackbar } from 'notistack'

const ShowcaseForm1 = compose(
  withProps({
    backRoute: routes.showcasesList(),
    title: 'Edit Showcase',
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async form => {
      const id = match.params.showcaseId
      const { json, errors, requestError } = await apiRequest(apiShowcaseUpdate, [id, { showcase: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Successfully updated showcase', { variant: 'success' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
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

const ShowcaseForm2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <ShowcaseForm1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default ShowcaseForm2
