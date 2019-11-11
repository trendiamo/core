import auth from 'auth'
import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, PreviewModal } from 'shared/form-elements'
import { apiRequest, apiSimpleChatSubmit } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { formObjectTransformer } from './data-utils'
import { Grid } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'

const SimpleChatForm = ({ backRoute, loadFormObject, saveFormObject, title }) => {
  const history = useHistory()
  const location = useLocation()

  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'simpleChats', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const { enqueueSnackbar } = useSnackbar()

  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)
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
  } = useForm({ formObjectTransformer, loadFormObject, saveFormObject })

  const [simpleChatSectionsCounter, setSimpleChatSectionsCounter] = useState(
    form.simpleChatSectionsAttributes ? form.simpleChatSectionsAttributes.length : 0
  )

  const onPreviewClick = useCallback(() => {
    setIsPreviewModalOpened(!isPreviewModalOpened)
  }, [isPreviewModalOpened])

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result || result.error || result.errors) return
      if (location.pathname !== routes.simpleChatEdit(result.id)) history.push(routes.simpleChatEdit(result.id))
      return result
    },
    [history, location.pathname, onFormSubmit]
  )

  const onSubmitClick = useCallback(async () => {
    setIsSubmitting(true)
    const { json, errors, requestError } = await apiRequest(apiSimpleChatSubmit, [form.id, { simpleChat: form }])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
    if (!errors && !requestError) {
      history.push(routes.simpleChatsList())
      enqueueSnackbar(`Simple chat successfully submitted to ${form.__brand.name}`, { variant: 'success' })
    } else {
      setIsSubmitting(false)
    }
    return json
  }, [enqueueSnackbar, form, history])

  const addSimpleChatSection = useCallback(() => {
    mergeFormCallback(form => {
      return {
        ...form,
        simpleChatSectionsAttributes: [
          ...form.simpleChatSectionsAttributes,
          {
            key: '',
            __key: `new-${simpleChatSectionsCounter + 1}`,
            simpleChatMessagesAttributes: [{ type: 'SimpleChatTextMessage', html: '', __key: 'new-0' }],
          },
        ],
      }
    })
    setSimpleChatSectionsCounter(simpleChatSectionsCounter + 1)
  }, [mergeFormCallback, simpleChatSectionsCounter])

  const setSimpleChatSectionsForm = useCallback(
    (simpleChatSection, simpleChatSectionIndex) => {
      mergeFormCallback(form => {
        const newsimpleChatSectionsAttributes = [...form.simpleChatSectionsAttributes]
        if (simpleChatSection.id || !simpleChatSection._destroy) {
          newsimpleChatSectionsAttributes[simpleChatSectionIndex] = simpleChatSection
        } else {
          newsimpleChatSectionsAttributes.splice(simpleChatSectionIndex, 1)
        }
        return { ...form, simpleChatSectionsAttributes: newsimpleChatSectionsAttributes }
      })
    },
    [mergeFormCallback]
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      mergeFormCallback(form => {
        const orderedSimpleChatSections = arrayMove(form.simpleChatSectionsAttributes, oldIndex, newIndex)
        return { ...form, simpleChatSectionsAttributes: orderedSimpleChatSections }
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

  const tooltipTextSubmit = useMemo(
    () =>
      form.__brand && isFormPristine ? `Submit this chat to ${form.__brand.name}` : 'Save the chat before submitting',
    [form.__brand, isFormPristine]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          isSubmitting={isSubmitting}
          onFormSubmit={newOnFormSubmit}
          onPreviewClick={onPreviewClick}
          onSubmitClick={onSubmitClick}
          previewEnabled={!auth.isSeller() && !!form.id}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine || isUploaderLoading}
          submitEnabled={auth.isSeller() && !!form.id}
          tooltipEnabled
          tooltipText="No changes to save"
          tooltipTextSubmit={tooltipTextSubmit}
        />
      ),
      backRoute,
      title,
    }),
    [
      backRoute,
      form.id,
      isFormLoading,
      isFormPristine,
      isFormSubmitting,
      isSubmitting,
      isUploaderLoading,
      newOnFormSubmit,
      onPreviewClick,
      onSubmitClick,
      title,
      tooltipTextSubmit,
    ]
  )
  useAppBarContent(appBarContent)

  const module = useMemo(() => ({ id: form.id, type: 'simple-chat', triggerIds: form.triggerIds }), [form])

  useEffect(() => {
    if (isFormLoading) return
    if (form.simpleChatSectionsAttributes && simpleChatSectionsCounter === 0)
      setSimpleChatSectionsCounter(form.simpleChatSectionsAttributes.length)
  }, [form.simpleChatSectionsAttributes, isFormLoading, simpleChatSectionsCounter])

  if (isFormLoading) return <CircularProgress />

  return (
    <>
      {form.id && <PreviewModal module={module} open={isPreviewModalOpened} setOpen={setIsPreviewModalOpened} />}
      <Grid container spacing={24}>
        <Grid item md={6} xs={12}>
          <FormContainer
            addSimpleChatSection={addSimpleChatSection}
            backRoute={backRoute}
            form={form}
            formRef={formRef}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            isFormPristine={isFormPristine}
            isFormSubmitting={isFormSubmitting}
            isUploaderLoading={isUploaderLoading}
            mergeForm={mergeForm}
            onFormSubmit={newOnFormSubmit}
            onSortEnd={onSortEnd}
            onToggleContent={onToggleContent}
            setFieldValue={setFieldValue}
            setIsCropping={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
            setSimpleChatSectionsForm={setSimpleChatSectionsForm}
            title={title}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <PluginPreview form={form} onToggleContent={onToggleContent} showingContent={showingContent} />
        </Grid>
      </Grid>
    </>
  )
}

export default SimpleChatForm
