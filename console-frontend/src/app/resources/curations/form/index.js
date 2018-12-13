import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Select from 'shared/select'
import Spotlight from './spotlight'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Cancel, Card, Form, Section } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Grid, TextField } from '@material-ui/core'
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
  setForm,
  title,
}) => (
  <>
    <Card title={title}>
      <Grid item sm={6}>
        <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
          <TextField
            autoFocus
            disabled={isFormLoading}
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
            onChange={selectPersona}
            placeholder="Persona *"
          />
          <TextField
            disabled={isFormLoading}
            fullWidth
            label="Curation Title"
            margin="normal"
            name="title"
            onChange={setFieldValue}
            required
            value={form.title}
          />
          <TextField
            disabled={isFormLoading}
            fullWidth
            label="Curation Subtitle"
            margin="normal"
            name="subtitle"
            onChange={setFieldValue}
            required
            value={form.subtitle}
          />
        </Form>
      </Grid>
    </Card>
    <div>
      {form.spotlightsAttributes.map(
        (spotlight, index) =>
          !spotlight._destroy && (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index}>
              <Section
                actions={
                  form.spotlightsAttributes.length > 1 && (
                    <Cancel disabled={isFormLoading} index={index} onClick={deleteSpotlight} />
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
                  isFormLoading={isFormLoading}
                  onChange={editSpotlightValue}
                  personas={personas}
                  setForm={setForm}
                />
              </Section>
            </Card>
          )
      )}
      <AddItemContainer disabled={isFormLoading} message="Add new spotlight" onClick={addSpotlight} />{' '}
    </div>
  </>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withHandlers({
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
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
