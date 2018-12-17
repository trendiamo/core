import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import Spotlight from './spotlight'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Cancel, Form, FormSection } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Grid, TextField } from '@material-ui/core'
import { uploadImage } from 'shared/picture-uploader'
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
  deleteSpotlight,
  editSpotlightValue,
  addSpotlight,
  productPicksPictures,
  setProductPicksPictures,
  setForm,
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
    {form.spotlightsAttributes.map(
      (spotlight, index) =>
        !spotlight._destroy && (
          // eslint-disable-next-line react/no-array-index-key
          <Section key={index}>
            <FormSection
              actions={
                form.spotlightsAttributes.length > 1 && (
                  <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteSpotlight} />
                )
              }
              foldable
              hideTop
              title={`Spotlight #${index + 1}`}
            >
              <Spotlight
                deleteSpotlight={deleteSpotlight}
                form={form}
                index={index}
                isCropping={isCropping}
                isFormLoading={isFormLoading}
                onChange={editSpotlightValue}
                personas={personas}
                productPicksPictures={productPicksPictures}
                setForm={setForm}
                setIsCropping={setIsCropping}
                setProductPicksPictures={setProductPicksPictures}
              />
            </FormSection>
          </Section>
        )
    )}
    <AddItemContainer disabled={isCropping || isFormLoading} message="Add new spotlight" onClick={addSpotlight} />
  </Form>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('productPicksPictures', 'setProductPicksPictures', []),
  withHandlers({
    saveFormObject: ({ saveFormObject, setErrors, productPicksPictures }) => async form => {
      await Promise.all(
        productPicksPictures.map(async productPicksPicture => {
          const productPickPhotoUrl = await uploadImage({
            blob: productPicksPicture.blob,
            setProgress: productPicksPicture.setProgress,
            type: 'products-pics',
            defaultValue:
              form.spotlightsAttributes[productPicksPicture.spotlightIndex].productPicksAttributes[
                productPicksPicture.productPickIndex
              ],
          })
          form.spotlightsAttributes[productPicksPicture.spotlightIndex].productPicksAttributes[
            productPicksPicture.productPickIndex
          ] = {
            ...form.spotlightsAttributes[productPicksPicture.spotlightIndex].productPicksAttributes[
              productPicksPicture.productPickIndex
            ],
            picUrl: productPickPhotoUrl,
          }
        })
      )
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
    editSpotlightValue: ({ form, setForm }) => (index, newValue) => {
      const newSpotlights = [...form.spotlightsAttributes]
      newSpotlights[index][newValue.name] = newValue.value
      setForm({ ...form, spotlightsAttributes: newSpotlights })
    },
    deleteSpotlight: ({ form, setForm }) => index => {
      const spotlightToDelete = {
        id: form.spotlightsAttributes[index].id,
        _destroy: true,
      }
      let newSpotlights = [...form.spotlightsAttributes]
      newSpotlights[index] = spotlightToDelete
      setForm({ ...form, spotlightsAttributes: newSpotlights })
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
