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
  mergeForm,
  onBackClick,
  onFormSubmit,
  onSortEnd,
  onSpotlightClick,
  onToggleContent,
  sellers,
  selectSeller,
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
      mergeForm={mergeForm}
      onBackClick={onBackClick}
      onToggleContent={onToggleContent}
      selectSeller={selectSeller}
      setFieldValue={setFieldValue}
      title={title}
    />
    <Spotlights
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      isUploaderLoading={isUploaderLoading}
      onSortEnd={onSortEnd}
      onSpotlightClick={onSpotlightClick}
      sellers={sellers}
      setIsCropping={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      setSpotlightForm={setSpotlightForm}
      spotlightsAttributes={form.spotlightsAttributes}
    />
    <AddItemContainer
      disabled={isCropping || isFormLoading || isUploaderLoading}
      message="Add new spotlight"
      onClick={addSpotlight}
    />
  </Form>
)

export default FormContainer
