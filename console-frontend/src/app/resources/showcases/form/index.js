import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { formObjectTransformer } from './data-utils'
import { Grid } from '@material-ui/core'
import { history as pluginHistory, routes as pluginRoutes } from 'plugin-base'
import { uploadPicture } from 'shared/picture-uploader'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const onProductClick = product => {
  window.open(product.url, '_blank')
}

const ShowcaseForm = ({ backRoute, history, loadFormObject, location, saveFormObject, title }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'showcases', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [productPicksPictures, setProductPicksPictures] = useState([])
  const [showingContent, setShowingContent] = useState(false)

  const uploadSubPicture = useCallback(async ({ blob, setProgress, subform }) => {
    if (blob) {
      const productPickPhotoUrl = await uploadPicture({
        blob,
        setProgress,
      })
      return {
        ...subform,
        picUrl: productPickPhotoUrl,
      }
    } else {
      return {
        ...subform,
        picUrl: '',
      }
    }
  }, [])

  const uploadSubPictures = useCallback(
    form => {
      return productPicksPictures.map(async ({ blob, productPickIndex, setProgress, spotlightIndex }) => {
        const { productPicksAttributes } = form.spotlightsAttributes[spotlightIndex]
        productPicksAttributes[productPickIndex] = await uploadSubPicture({
          subform: productPicksAttributes[productPickIndex],
          blob,
          setProgress,
        })
      })
    },
    [productPicksPictures, uploadSubPicture]
  )

  const newSaveFormObject = useCallback(
    async form => {
      await Promise.all(uploadSubPictures(form))
      setProductPicksPictures([])
      return saveFormObject(form)
    },
    [saveFormObject, uploadSubPictures]
  )

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    onFormSubmit,
    setFieldValue,
    mergeForm,
    mergeFormCallback,
    setIsFormSubmitting,
  } = useForm({ formObjectTransformer, saveFormObject: newSaveFormObject, loadFormObject })

  useEffect(
    () => {
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
    [form.id]
  )

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      setIsFormSubmitting(false)
      if (!result || result.error || result.errors) return
      pluginHistory.replace(pluginRoutes.showcase(result.id))
      if (location.pathname !== routes.showcaseEdit(result.id)) history.push(routes.showcaseEdit(result.id))
      return result
    },
    [history, location.pathname, onFormSubmit, setIsFormSubmitting]
  )

  const addSpotlight = useCallback(
    () => {
      mergeFormCallback(form => ({
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
                __key: 'new-0',
              },
            ],
            __key: `new-${form.spotlightsAttributes.length}`,
          },
        ],
      }))
    },
    [mergeFormCallback]
  )

  const setSpotlightForm = useCallback(
    (mergeSpotlightCallback, index) => {
      mergeFormCallback(form => {
        const newSpotlightsAttributes = [...form.spotlightsAttributes]
        newSpotlightsAttributes[index] = mergeSpotlightCallback(newSpotlightsAttributes[index])
        return { spotlightsAttributes: newSpotlightsAttributes }
      })
    },
    [mergeFormCallback]
  )

  const selectPersona = useCallback(
    selected => {
      if (!selected) return
      mergeForm({
        personaId: selected.value.id,
        personaProfilePic: selected.value.profilePicUrl,
      })
    },
    [mergeForm]
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      mergeFormCallback(form => {
        const orderedSpotlights = arrayMove(form.spotlightsAttributes, oldIndex, newIndex)
        return { spotlightsAttributes: orderedSpotlights }
      })
    },
    [mergeFormCallback]
  )

  const routeToShowcase = useCallback(() => pluginHistory.replace(pluginRoutes.showcase(form.id)), [form.id])

  const routeToSpotlight = useCallback(
    spotlightId => pluginHistory.replace(pluginRoutes.spotlight(form.id, spotlightId)),
    [form.id]
  )

  const onToggleContent = useCallback(
    value => {
      setShowingContent(value !== undefined ? value : !showingContent)
    },
    [showingContent]
  )

  const onBackClick = useCallback(
    () => {
      onToggleContent(true)
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
    [form.id, onToggleContent]
  )

  const onSpotlightClick = useCallback(
    ({ id }) => {
      onToggleContent(true)
      routeToSpotlight(id)
    },
    [onToggleContent, routeToSpotlight]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isCropping || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isCropping, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  const previewCallbacks = useMemo(
    () => ({
      onSpotlightClick,
      onProductClick,
    }),
    [onSpotlightClick]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Grid container spacing={24}>
      <Grid item md={6} xs={12}>
        <FormContainer
          addSpotlight={addSpotlight}
          form={form}
          formRef={formRef}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          isFormPristine={isFormPristine}
          onBackClick={onBackClick}
          onFormSubmit={newOnFormSubmit}
          onSortEnd={onSortEnd}
          onSpotlightClick={onSpotlightClick}
          onToggleContent={onToggleContent}
          productPicksPictures={productPicksPictures}
          selectPersona={selectPersona}
          setFieldValue={setFieldValue}
          setIsCropping={setIsCropping}
          setProductPicksPictures={setProductPicksPictures}
          setSpotlightForm={setSpotlightForm}
          title={title}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <PluginPreview
          form={form}
          onToggleContent={onToggleContent}
          previewCallbacks={previewCallbacks}
          routeToShowcase={routeToShowcase}
          routeToSpotlight={routeToSpotlight}
          showingContent={showingContent}
        />
      </Grid>
    </Grid>
  )
}

export default withRouter(ShowcaseForm)
