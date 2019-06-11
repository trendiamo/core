import MainForm from './main-form'
import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import SimpleChatSteps from './simple-chat-steps'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Actions, AddItemContainer, Form } from 'shared/form-elements'

const FormContainer = ({
  addSimpleChatStep,
  backRoute,
  form,
  formRef,
  isCropping,
  isFormLoading,
  isFormPristine,
  isFormSubmitting,
  onFormSubmit,
  onSortEnd,
  onToggleContent,
  selectPersona,
  setFieldValue,
  setIsCropping,
  setSimpleChatStepsForm,
  title,
}) => {
  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={onFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  const mainForm = useMemo(() => omit(form, ['simpleChatStepsAttributes']), [form])

  return (
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <MainForm
        form={mainForm}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        onToggleContent={onToggleContent}
        selectPersona={selectPersona}
        setFieldValue={setFieldValue}
        title={title}
      />
      <SimpleChatSteps
        allowDelete={form.simpleChatStepsAttributes.length > 1}
        helperClass="sortable-element"
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        onChange={setSimpleChatStepsForm}
        onSortEnd={onSortEnd}
        onToggleContent={onToggleContent}
        setIsCropping={setIsCropping}
        simpleChatSteps={form.simpleChatStepsAttributes}
        useDragHandle
      />
      <AddItemContainer disabled={isCropping || isFormLoading} message="Add Option" onClick={addSimpleChatStep} />
    </Form>
  )
}

export default FormContainer
