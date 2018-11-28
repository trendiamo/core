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
import withForm from 'ext/recompose/with-form'
import { apiPersonaSimpleList } from 'utils'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'
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

const StyledButton = styled(Button)`
  margin-top: 1rem;
`

const selectValue = (form, personas) => {
  if (form.personaId === '') return ''
  const personaIndex = personas.findIndex(persona => persona.id === form.personaId)
  return `Persona ${personaIndex}: ${personas[personaIndex].name}`
}

const TriggerForm = ({ personas, form, info, isFormLoading, isFormPristine, onFormSubmit, selectPersona }) => (
  <PaperContainer>
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={info} />
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
      <StyledButton color="primary" disabled={isFormLoading} type="submit" variant="contained">
        <SaveIcon />
        {'Save'}
      </StyledButton>
    </form>
  </PaperContainer>
)

export default compose(
  withState('info', 'setInfo', null),
  withState('personas', 'setPersonas', []),
  withHandlers({
    loadFormObject: ({ loadFormObject, setInfo, setPersonas }) => async () => {
      const personas = await apiPersonaSimpleList(setInfo)
      setPersonas(personas)
      return loadFormObject({ setInfo })
    },
    saveFormObject: ({ saveFormObject, setInfo }) => form => {
      return saveFormObject(form, { setInfo })
    },
  }),
  withForm({
    personaId: '',
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => (index, newValue) => {
      setForm({
        ...form,
        personaId: newValue.props.id,
      })
    },
    onFormSubmit: ({ history, onFormSubmit }) => async event => {
      const result = await onFormSubmit(event)
      result && history.push(routes.outrosList())
      return result
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(TriggerForm)
