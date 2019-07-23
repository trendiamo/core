import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, PreviewModal } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { formObjectTransformer } from './data-utils'
import { Grid } from '@material-ui/core'
import { history as pluginHistory, routes as pluginRoutes } from 'plugin-base'
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
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)
  const [showingContent, setShowingContent] = useState(false)

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    onFormSubmit,
    setFieldValue,
    mergeForm,
    mergeFormCallback,
  } = useForm({ formObjectTransformer, saveFormObject, loadFormObject })

  useEffect(
    () => {
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
    [form.id]
  )

  const onPreviewClick = useCallback(
    () => {
      setIsPreviewModalOpened(!isPreviewModalOpened)
    },
    [isPreviewModalOpened]
  )

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result || result.error || result.errors) return
      pluginHistory.replace(pluginRoutes.showcase(result.id))
      if (location.pathname !== routes.showcaseEdit(result.id)) history.push(routes.showcaseEdit(result.id))
      return result
    },
    [history, location.pathname, onFormSubmit]
  )

  const addSpotlight = useCallback(
    () => {
      mergeFormCallback(form => ({
        spotlightsAttributes: [
          ...form.spotlightsAttributes,
          {
            personaId: '',
            usePersonaAnimation: false,
            productPicksAttributes: [
              {
                url: '',
                name: '',
                description: '',
                displayPrice: '',
                picture: { url: '' },
                picRect: {},
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
        const spotlight = mergeSpotlightCallback(newSpotlightsAttributes[index])
        if (spotlight.id || !spotlight._destroy) {
          newSpotlightsAttributes[index] = spotlight
        } else {
          newSpotlightsAttributes.splice(index, 1)
        }
        return { spotlightsAttributes: newSpotlightsAttributes }
      })
    },
    [mergeFormCallback]
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
          onPreviewClick={onPreviewClick}
          previewEnabled={!!form.id}
          saveDisabled={isFormSubmitting || isCropping || isFormLoading || isFormPristine || isUploaderLoading}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [
      backRoute,
      form.id,
      isCropping,
      isFormLoading,
      isFormPristine,
      isFormSubmitting,
      isUploaderLoading,
      newOnFormSubmit,
      onPreviewClick,
      title,
    ]
  )
  useAppBarContent(appBarContent)

  const previewCallbacks = useMemo(
    () => ({
      onSpotlightClick,
      onProductClick,
    }),
    [onSpotlightClick]
  )

  const module = useMemo(() => ({ id: form.id, type: 'showcase', triggerIds: form.triggerIds }), [form])

  if (isFormLoading) return <CircularProgress />

  return (
    <>
      {form.id && <PreviewModal module={module} open={isPreviewModalOpened} setOpen={setIsPreviewModalOpened} />}
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <FormContainer
            addSpotlight={addSpotlight}
            form={form}
            formRef={formRef}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            isFormPristine={isFormPristine}
            isUploaderLoading={isUploaderLoading}
            mergeForm={mergeForm}
            onBackClick={onBackClick}
            onFormSubmit={newOnFormSubmit}
            onSortEnd={onSortEnd}
            onSpotlightClick={onSpotlightClick}
            onToggleContent={onToggleContent}
            setFieldValue={setFieldValue}
            setIsCropping={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
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
    </>
  )
}

export default withRouter(ShowcaseForm)
