import CircularProgress from 'shared/circular-progress'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import Select from 'shared/select'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete, apiPersonaSimpleList } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Grid } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { withRouter } from 'react-router'

const OutroForm = ({
  formRef,
  form,
  setFieldValue,
  selectPersona,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  personas,
  setPersonas,
  title,
}) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
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
      </Form>
      <Select
        autocomplete={apiPersonasAutocomplete}
        defaultOptions={personas}
        list={apiPersonaSimpleList}
        onChange={selectPersona}
        placeholder="Persona *"
        setOptions={setPersonas}
      />
    </Grid>
  </PaperContainer>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('personas', 'setPersonas', []),
  withHandlers({
    loadFormObject: ({ loadFormObject, setPersonas }) => async () => {
      const personas = await apiPersonaSimpleList()
      setPersonas(personas)
      return loadFormObject()
    },
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    personaId: '',
    name: '',
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      setForm({
        ...form,
        personaId: selected.value.id,
      })
    },
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.outrosList())
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
)(OutroForm)
