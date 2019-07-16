import MainForm from './main-form'
import omit from 'lodash.omit'
import React from 'react'
import Spotlights from './spotlights'
import { AddItemContainer, Form } from 'shared/form-elements'

const FormContainer = ({
  addSpotlight,
  form,
  formRef,
  isCropping,
  isFormLoading,
  isFormPristine,
  isUploaderLoading,
  onBackClick,
  onFormSubmit,
  onSortEnd,
  onToggleContent,
  onSpotlightClick,
  personas,
  selectPersona,
  setFieldValue,
  setIsCropping,
  setIsUploaderLoading,
  setSpotlightForm,
  title,
}) => (
  <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <MainForm
      form={omit(form, ['spotlightsAttributes'])}
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      isUploaderLoading={isUploaderLoading}
      onBackClick={onBackClick}
      onToggleContent={onToggleContent}
      selectPersona={selectPersona}
      setFieldValue={setFieldValue}
      title={title}
    />
    <Spotlights
      helperClass="sortable-element"
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      isUploaderLoading={isUploaderLoading}
      onSortEnd={onSortEnd}
      onSpotlightClick={onSpotlightClick}
      onToggleContent={onToggleContent}
      personas={personas}
      setIsCropping={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      setSpotlightForm={setSpotlightForm}
      spotlightsAttributes={form.spotlightsAttributes}
      useDragHandle
    />
    <AddItemContainer
      disabled={isCropping || isFormLoading || isUploaderLoading}
      message="Add new spotlight"
      onClick={addSpotlight}
    />
  </Form>
)

export default FormContainer
