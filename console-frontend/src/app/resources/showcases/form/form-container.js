import MainForm from './main-form'
import React from 'react'
import SpotlightsContainer from './spotlights-container'
import { AddItemContainer, Form } from 'shared/form-elements'
import { omit } from 'lodash'

const FormContainer = ({
  selectPersona,
  onSpotlightClickFactory,
  form,
  formRef,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  setFieldValue,
  setSpotlightForm,
  addSpotlight,
  productPicksPictures,
  setProductPicksPictures,
  isCropping,
  setIsCropping,
  onBackClick,
  title,
  onSortEnd,
  personas,
  onToggleContent,
}) => (
  <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <MainForm
      form={omit(form, ['spotlightsAttributes'])}
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      onBackClick={onBackClick}
      onToggleContent={onToggleContent}
      selectPersona={selectPersona}
      setFieldValue={setFieldValue}
      title={title}
    />
    <SpotlightsContainer
      form={form}
      helperClass="sortable-element"
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      onSortEnd={onSortEnd}
      onSpotlightClickFactory={onSpotlightClickFactory}
      onToggleContent={onToggleContent}
      personas={personas}
      productPicksPictures={productPicksPictures}
      setIsCropping={setIsCropping}
      setProductPicksPictures={setProductPicksPictures}
      setSpotlightForm={setSpotlightForm}
      useDragHandle
    />
    <AddItemContainer disabled={isCropping || isFormLoading} message="Add new spotlight" onClick={addSpotlight} />
  </Form>
)

export default FormContainer
