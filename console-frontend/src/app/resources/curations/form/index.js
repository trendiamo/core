import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import Spotlight from './spotlight'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Grid, TextField } from '@material-ui/core'
import { uploadImage } from 'shared/picture-uploader'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const CurationForm = ({
  selectPersona,
  personas,
  form,
  formRef,
  errors,
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
  title,
}) => (
  <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <Section title={title}>
      <Grid item sm={6}>
        <TextField
          autoFocus
          disabled={isCropping || isFormLoading}
          fullWidth
          label="Name"
          margin="normal"
          name="name"
          onChange={setFieldValue}
          required
          value={form.name}
        />
        <Select
          autocomplete={apiPersonasAutocomplete}
          defaultValue={form.__persona && { value: form.__persona.id, label: form.__persona.name }}
          isDisabled={isCropping || isFormLoading}
          onChange={selectPersona}
          placeholder="Persona *"
        />
        <TextField
          disabled={isCropping || isFormLoading}
          fullWidth
          label="Title"
          margin="normal"
          name="title"
          onChange={setFieldValue}
          required
          value={form.title}
        />
        <TextField
          disabled={isCropping || isFormLoading}
          fullWidth
          label="Subtitle"
          margin="normal"
          name="subtitle"
          onChange={setFieldValue}
          required
          value={form.subtitle}
        />
      </Grid>
    </Section>
    {form.spotlightsAttributes.map((spotlight, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={index}>
        <Spotlight
          allowDelete={form.spotlightsAttributes.length > 1}
          index={index}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          onChange={setSpotlightForm}
          personas={personas}
          productPicksPictures={productPicksPictures}
          setIsCropping={setIsCropping}
          setProductPicksPictures={setProductPicksPictures}
          spotlight={spotlight}
        />
      </React.Fragment>
    ))}
    <AddItemContainer disabled={isCropping || isFormLoading} message="Add new spotlight" onClick={addSpotlight} />
  </Form>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withOnboardingHelp({ single: true, stepName: 'curations', stageName: 'initial' }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('productPicksPictures', 'setProductPicksPictures', []),
  withHandlers({
    uploadSubImage: () => async ({ blob, setProgress, subform }) => {
      const productPickPhotoUrl = await uploadImage({
        blob,
        setProgress,
        type: 'products-pics',
        defaultValue: subform.picUrl,
      })
      return {
        ...subform,
        picUrl: productPickPhotoUrl,
      }
    },
  }),
  withHandlers({
    uploadSubImages: ({ productPicksPictures, uploadSubImage }) => form => {
      return productPicksPictures.map(async ({ blob, productPickIndex, setProgress, spotlightIndex }) => {
        const { productPicksAttributes } = form.spotlightsAttributes[spotlightIndex]
        productPicksAttributes[productPickIndex] = await uploadSubImage({
          subform: productPicksAttributes[productPickIndex],
          blob,
          setProgress,
        })
      })
    },
  }),
  withHandlers({
    saveFormObject: ({ saveFormObject, setErrors, uploadSubImages }) => async form => {
      await Promise.all(uploadSubImages(form))
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    personaId: '',
    title: '',
    subtitle: '',
    spotlightsAttributes: [
      {
        text: '',
        personaId: '',
        productPicksAttributes: [
          {
            url: '',
            name: '',
            description: '',
            displayPrice: '',
            picUrl: '',
          },
        ],
      },
    ],
  }),
  withHandlers({
    addSpotlight: ({ form, setForm }) => () => {
      setForm({
        ...form,
        spotlightsAttributes: [
          ...form.spotlightsAttributes,
          {
            text: '',
            personaId: '',
            productPicksAttributes: [
              {
                url: '',
                name: '',
                description: '',
                displayPrice: '',
                picUrl: '',
              },
            ],
          },
        ],
      })
    },
    setSpotlightForm: ({ form, setForm }) => (spotlight, index) => {
      const newSpotlightsAttributes = [...form.spotlightsAttributes]
      newSpotlightsAttributes[index] = spotlight
      setForm({ ...form, spotlightsAttributes: newSpotlightsAttributes })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => ({ value }) => {
      setForm({
        ...form,
        personaId: value.id,
      })
    },
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.curationsList())
      return result
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isFormLoading, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormLoading} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(CurationForm)
