import CurationForm from './form'
import routes from 'app/routes'
import { apiCurationShow, apiCurationUpdate, apiRequest } from 'utils'
import { compose, withHandlers, withProps } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

export default compose(
  withProps({
    breadcrumbs: [{ text: 'Curations', route: routes.curationsList() }, { text: 'Edit Curation' }],
  }),
  withSnackbar,
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, match }) => async (form, { setErrors }) => {
      const id = match.params.curationId
      const response = await apiRequest(apiCurationUpdate, [id, { curation: form }], {
        enqueueSnackbar,
      })
      const errors = extractErrors(response)
      if (errors) setErrors(errors)
      return response
    },
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar, match }) => async () => {
      const id = match.params.curationId
      const response = await apiRequest(apiCurationShow, [id], {
        enqueueSnackbar,
      })
      return {
        name: response.name || '',
        personaId: response.persona.id || '',
        title: response.title || '',
        subtitle: response.subtitle || '',
        __persona: response.persona,
        spotlightsAttributes: response.spotlightsAttributes.map(spotlight => ({
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
)(CurationForm)
