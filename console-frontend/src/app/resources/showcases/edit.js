import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseShow, apiShowcaseUpdate } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Showcases', route: routes.showcasesList() }, { text: 'Edit Showcase' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.showcaseId
      const { json, errors, requestError } = await apiRequest(apiShowcaseUpdate, [id, { showcase: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      return json
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.showcaseId
      const { json, requestError } = await apiRequest(apiShowcaseShow, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return {
        name: json.name || '',
        personaId: json.persona.id || '',
        title: json.title || '',
        subtitle: json.subtitle || '',
        __persona: json.persona,
        spotlightsAttributes: json.spotlightsAttributes.map(spotlight => ({
          id: spotlight.id || '',
          text: spotlight.text || '',
          personaId: spotlight.persona.id || '',
          __persona: spotlight.persona,
          productPicksAttributes: spotlight.productPicksAttributes
            ? spotlight.productPicksAttributes.map(productPick => ({
                id: productPick.id || '',
                url: productPick.url || '',
                name: productPick.name || '',
                description: productPick.description || '',
                displayPrice: productPick.displayPrice || '',
                picUrl: productPick.picUrl || '',
              }))
            : [
                {
                  url: '',
                  name: '',
                  description: '',
                  displayPrice: '',
                  picUrl: '',
                },
              ],
        })),
      }
    },
  })
)(ShowcaseForm)
