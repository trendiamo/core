import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { formObjectTransformer } from './data-utils'
import { Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const SimpleChatForm = ({ backRoute, history, location, loadFormObject, saveFormObject, title }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'simpleChats', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [showingContent, setShowingContent] = useState(false)

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    mergeForm,
    mergeFormCallback,
    onFormSubmit,
    setFieldValue,
    setIsFormSubmitting,
  } = useForm({ formObjectTransformer, loadFormObject, saveFormObject })

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      setIsFormSubmitting(false)
      if (!result || result.error || result.errors) return
      if (location.pathname !== routes.simpleChatEdit(result.id)) history.push(routes.simpleChatEdit(result.id))
      return result
    },
    [history, location.pathname, onFormSubmit, setIsFormSubmitting]
  )

  const addSimpleChatStep = useCallback(
    () => {
      mergeFormCallback(form => {
        return {
          ...form,
          simpleChatStepsAttributes: [
            ...form.simpleChatStepsAttributes,
            {
              key: '',
              __key: `new-${form.simpleChatStepsAttributes.length}`,
              simpleChatMessagesAttributes: [{ type: 'SimpleChatTextMessage', html: '', __key: 'new-0' }],
            },
          ],
        }
      })
    },
    [mergeFormCallback]
  )

  const setSimpleChatStepsForm = useCallback(
    (simpleChatStep, simpleChatStepIndex) => {
      mergeFormCallback(form => {
        let newsimpleChatStepsAttributes = [...form.simpleChatStepsAttributes]
        newsimpleChatStepsAttributes[simpleChatStepIndex] = simpleChatStep
        return { ...form, simpleChatStepsAttributes: newsimpleChatStepsAttributes }
      })
    },
    [mergeFormCallback]
  )

  const selectPersona = useCallback(
    selected => {
      selected &&
        mergeForm({
          personaId: selected.value.id,
          __persona: selected.value,
        })
    },
    [mergeForm]
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      mergeFormCallback(form => {
        const orderedSimpleChatSteps = arrayMove(form.simpleChatStepsAttributes, oldIndex, newIndex)
        return { ...form, simpleChatStepsAttributes: orderedSimpleChatSteps }
      })
    },
    [mergeFormCallback]
  )

  const onToggleContent = useCallback(
    value => {
      setShowingContent(value !== undefined ? value : !showingContent)
    },
    [showingContent]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Grid container spacing={24}>
      <Grid item md={6} xs={12}>
        <FormContainer
          addSimpleChatStep={addSimpleChatStep}
          backRoute={backRoute}
          form={form}
          formRef={formRef}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          onSortEnd={onSortEnd}
          onToggleContent={onToggleContent}
          selectPersona={selectPersona}
          setFieldValue={setFieldValue}
          setIsCropping={setIsCropping}
          setSimpleChatStepsForm={setSimpleChatStepsForm}
          title={title}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <PluginPreview form={form} onToggleContent={onToggleContent} showingContent={showingContent} />
      </Grid>
    </Grid>
  )
}

export default withRouter(SimpleChatForm)
