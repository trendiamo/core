import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { apiPersonaSimpleList } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Prompt } from 'react-router'
import { TextField } from '@material-ui/core'
import { withRouter } from 'react-router'

const StyledAvatar = styled(Avatar)`
  display: inline-block;
`

const StyledTypography = styled(Typography)`
  display: inline-block;
  margin-left: 20px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
`

const Actions = ({ isFormLoading, onFormSubmit }) => (
  <Button color="primary" disabled={isFormLoading} onClick={onFormSubmit} type="submit" variant="contained">
    <SaveIcon />
    {'Save'}
  </Button>
)

const selectValue = (form, personas) => {
  if (form.personaId === '') return ''
  const personaIndex = personas.findIndex(persona => persona.id === form.personaId)
  return `Persona ${personaIndex}: ${personas[personaIndex].name}`
}

const OutroForm = ({
  personas,
  form,
  formRef,
  setFieldValue,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  selectPersona,
  title,
}) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
    <form onSubmit={onFormSubmit} ref={formRef}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={errors} />
      <FormControl disabled={isFormLoading} fullWidth>
        <InputLabel htmlFor="persona-label-placeholder" shrink>
          {'Persona'}
        </InputLabel>
        <Select
          displayEmpty
          input={<Input id="persona-label-placeholder" name="persona" />}
          name="persona"
          onChange={selectPersona}
          value={selectValue(form, personas)}
        >
          {personas.map((persona, index) => (
            <MenuItem id={persona.id} key={`persona-${persona.id}`} value={`Persona ${index}: ${persona.name}`}>
              <Item>
                <StyledAvatar alt={persona.name} src={persona.profilePicUrl} />
                <StyledTypography>{persona.name}</StyledTypography>
              </Item>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Name"
        margin="normal"
        name="name"
        onChange={setFieldValue}
        required
        value={form.name}
      />
    </form>
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
    selectPersona: ({ form, setForm }) => (index, newValue) => {
      setForm({
        ...form,
        personaId: newValue.props.id,
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
    Actions: <Actions isFormLoading={isFormLoading} onFormSubmit={onFormSubmit} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(OutroForm)
