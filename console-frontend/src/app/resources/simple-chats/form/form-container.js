import MainForm from './main-form'
import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import SimpleChatSections from './simple-chat-sections'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Actions, AddItemContainer, Form } from 'shared/form-elements'

const FormContainer = ({
  addSimpleChatSection,
  backRoute,
  form,
  formRef,
  isCropping,
  isFormLoading,
  isFormPristine,
  isFormSubmitting,
  isUploaderLoading,
  mergeForm,
  onFormSubmit,
  onSortEnd,
  onToggleContent,
  setFieldValue,
  setIsCropping,
  setIsUploaderLoading,
  setSimpleChatSectionsForm,
  title,
}) => {
  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={onFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine || isUploaderLoading}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, isUploaderLoading, onFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  const mainForm = useMemo(() => omit(form, ['simpleChatSectionsAttributes']), [form])

  return (
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <MainForm
        form={mainForm}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        isUploaderLoading={isUploaderLoading}
        mergeForm={mergeForm}
        onToggleContent={onToggleContent}
        setFieldValue={setFieldValue}
        title={title}
      />
      <SimpleChatSections
        allowDelete={form.simpleChatSectionsAttributes.length > 1}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        isUploaderLoading={isUploaderLoading}
        onChange={setSimpleChatSectionsForm}
        onSortEnd={onSortEnd}
        onToggleContent={onToggleContent}
        setIsCropping={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
        simpleChatSections={form.simpleChatSectionsAttributes}
      />
      <AddItemContainer disabled={isCropping || isFormLoading} message="Add Section" onClick={addSimpleChatSection} />
    </Form>
  )
}

export default FormContainer
