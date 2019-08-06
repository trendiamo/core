import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, PreviewModal } from 'shared/form-elements'
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
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false)
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
      if (location.pathname !== routes.simpleChatEdit(result.id)) history.push(routes.simpleChatEdit(result.id))
      return result
    },
    [history, location.pathname, onFormSubmit]
  )

  const addSimpleChatSection = useCallback(
    () => {
      mergeFormCallback(form => {
        return {
          ...form,
          simpleChatSectionsAttributes: [
            ...form.simpleChatSectionsAttributes,
            {
              key: '',
              __key: `new-${form.simpleChatSectionsAttributes.length}`,
              simpleChatMessagesAttributes: [{ type: 'SimpleChatTextMessage', html: '', __key: 'new-0' }],
            },
          ],
        }
      })
    },
    [mergeFormCallback]
  )

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

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          onPreviewClick={onPreviewClick}
          previewEnabled={!!form.id}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine || isUploaderLoading}
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

  const module = useMemo(() => ({ id: form.id, type: 'simple-chat', triggerIds: form.triggerIds }), [form])

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

export default withRouter(SimpleChatForm)
