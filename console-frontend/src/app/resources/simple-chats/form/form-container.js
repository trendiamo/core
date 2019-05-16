import MainForm from './main-form'
import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import SimpleChatStepsContainer from './simple-chat-steps'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Actions, AddItemContainer, Form } from 'shared/form-elements'

const FormContainer = ({
  addSimpleChatStep,
  backRoute,
  form,
  formRef,
  isFormLoading,
  isFormPristine,
  isFormSubmitting,
  onFormSubmit,
  onSortEnd,
  selectPersona,
  setFieldValue,
  setSimpleChatStepsForm,
  title,
  onToggleContent,
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

  return (
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <MainForm
        form={omit(form, ['simpleChatStepsAttributes'])}
        isFormLoading={isFormLoading}
        onToggleContent={onToggleContent}
        selectPersona={selectPersona}
        setFieldValue={setFieldValue}
        title={title}
      />
      <SimpleChatStepsContainer
        allowDelete={form.simpleChatStepsAttributes.length > 1}
        helperClass="sortable-element"
        isFormLoading={isFormLoading}
        onChange={setSimpleChatStepsForm}
        onSortEnd={onSortEnd}
        onToggleContent={onToggleContent}
        simpleChatSteps={form.simpleChatStepsAttributes}
        useDragHandle
      />
      <AddItemContainer disabled={isFormLoading} message="Add Option" onClick={addSimpleChatStep} />
    </Form>
  )
}

export default FormContainer
