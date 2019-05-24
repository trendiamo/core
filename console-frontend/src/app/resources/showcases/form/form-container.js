import MainForm from './main-form'
import omit from 'lodash.omit'
import React from 'react'
import Spotlights from './spotlights'
import { AddItemContainer, Form } from 'shared/form-elements'

const FormContainer = ({
  selectPersona,
  onSpotlightClick,
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
    <Spotlights
      helperClass="sortable-element"
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      onSortEnd={onSortEnd}
      onSpotlightClick={onSpotlightClick}
      onToggleContent={onToggleContent}
      personas={personas}
      productPicksPictures={productPicksPictures}
      setIsCropping={setIsCropping}
      setProductPicksPictures={setProductPicksPictures}
      setSpotlightForm={setSpotlightForm}
      spotlightsAttributes={form.spotlightsAttributes}
      useDragHandle
    />
    <AddItemContainer disabled={isCropping || isFormLoading} message="Add new spotlight" onClick={addSpotlight} />
  </Form>
)

export default FormContainer
