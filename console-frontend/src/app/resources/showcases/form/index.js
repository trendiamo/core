import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useMemo } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { formObject, formObjectTransformer } from './data-utils'
import { Grid } from '@material-ui/core'
import { history as pluginHistory, routes as pluginRoutes } from 'plugin-base'
import { uploadPicture } from 'shared/picture-uploader'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const Showcase = props => {
  const { backRoute, title, isCropping, isFormLoading, isFormSubmitting, onFormSubmit, isFormPristine } = props
  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={onFormSubmit}
          saveDisabled={isFormSubmitting || isCropping || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isCropping, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  return (
    <Grid container spacing={24}>
      <Grid item md={6} xs={12}>
        <FormContainer {...props} />
      </Grid>
      <Grid item md={6} xs={12}>
        <PluginPreview {...props} />
      </Grid>
    </Grid>
  )
}

const Showcase1 = compose(
  withHandlers({
    addSpotlight: ({ form, setForm }) => () => {
      setForm({
        ...form,
        spotlightsAttributes: [
          ...form.spotlightsAttributes,
          {
            personaId: '',
            productPicksAttributes: [
              {
                url: '',
                name: '',
                description: '',
                displayPrice: '',
                picUrl: '',
              },
            ],
          },
        ],
      })
    },
    setSpotlightForm: ({ form, setForm }) => (spotlight, index) => {
      const newSpotlightsAttributes = [...form.spotlightsAttributes]
      newSpotlightsAttributes[index] = spotlight
      setForm({ ...form, spotlightsAttributes: newSpotlightsAttributes })
    },
  }),
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
          personaProfilePic: selected.value.profilePicUrl,
        })
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      pluginHistory.replace(pluginRoutes.showcase(result.id))
      if (location.pathname !== routes.showcaseEdit(result.id)) history.push(routes.showcaseEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
    onSortEnd: ({ setForm, form }) => ({ oldIndex, newIndex }) => {
      const filteredSpotlights = form.spotlightsAttributes.filter(spotlight => !spotlight._destroy)
      const orderedSpotlights = arrayMove(filteredSpotlights, oldIndex, newIndex)
      setForm({ ...form, spotlightsAttributes: orderedSpotlights })
    },
    routeToShowcase: ({ form }) => () => pluginHistory.replace(pluginRoutes.showcase(form.id)),
    routeToSpotlight: ({ form }) => spotlight => pluginHistory.replace(pluginRoutes.spotlight(form.id, spotlight.id)),
    onToggleContent: ({ setShowingContent, showingContent }) => value => {
      setShowingContent(value !== undefined ? value : !showingContent)
    },
  }),
  withHandlers({
    onBackClick: ({ form, onToggleContent }) => () => {
      onToggleContent(true)
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
    onSpotlightClick: ({ routeToSpotlight, onToggleContent }) => ({ spotlight }) => () => {
      onToggleContent(true)
      if (spotlight.personaId) routeToSpotlight(spotlight)
    },
    onProductClick: () => ({ product }) => () => {
      window.open(product.url, '_blank')
    },
  }),
  withProps(({ onSpotlightClick, onProductClick }) => ({
    previewCallbacks: {
      onSpotlightClick,
      onProductClick,
    },
  })),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  lifecycle({
    componentDidMount() {
      const { form } = this.props
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
  })
)(Showcase)

const Showcase2 = props => {
  const formProps = useForm({ ...props, defaultForm: formObject })
  return <Showcase1 {...props} {...formProps} />
}

const Showcase3 = compose(
  withProps({ formRef: React.createRef() }),
  withState('isCropping', 'setIsCropping', false),
  withState('productPicksPictures', 'setProductPicksPictures', []),
  withState('showingContent', 'setShowingContent', false),
  withHandlers({
    uploadSubPicture: () => async ({ blob, setProgress, subform }) => {
      if (blob) {
        const productPickPhotoUrl = await uploadPicture({
          blob,
          setProgress,
        })
        return {
          ...subform,
          picUrl: productPickPhotoUrl,
        }
      }
    },
  }),
  withHandlers({
    uploadSubPictures: ({ productPicksPictures, uploadSubPicture }) => form => {
      return productPicksPictures.map(async ({ blob, productPickIndex, setProgress, spotlightIndex }) => {
        const { productPicksAttributes } = form.spotlightsAttributes[spotlightIndex]
        productPicksAttributes[productPickIndex] = await uploadSubPicture({
          subform: productPicksAttributes[productPickIndex],
          blob,
          setProgress,
        })
      })
    },
  }),
  withHandlers({
    formObjectTransformer,
    saveFormObject: ({ saveFormObject, uploadSubPictures, setProductPicksPictures }) => async form => {
      await Promise.all(uploadSubPictures(form))
      setProductPicksPictures([])
      return saveFormObject(form)
    },
  })
)(Showcase2)

const Showcase4 = ({ location, ...props }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'showcases', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)
  return <Showcase3 {...props} location={location} />
}

export default withRouter(Showcase4)
