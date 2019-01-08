import React from 'react'
import Select from 'shared/select'
import styled from 'styled-components'
import { AddCircleOutline, Close } from '@material-ui/icons'
import { apiPersonasAutocomplete } from 'utils'
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { Form } from 'shared/form-elements'

const Option = styled.div`
  margin: 12px 0px;
  border-radius: 4px;
  justify-content: left;
`

const StyledSelect = styled(Select)`
  margin-top: 0px;
  margin-bottom: 0px;
`

const AddButton = styled(Button)`
  display: flex;
  padding: 7px 0px;
  justify-content: left;
  text-transform: none;
`

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const AddOptionButton = ({ option, optionLabel, disabled, showOption }) => (
  <AddButton color="primary" disabled={disabled} fullWidth onClick={() => showOption(option)} size="small">
    <AddCircleOutline />
    <StyledTypography color="primary" variant="subtitle1">
      {optionLabel}
    </StyledTypography>
  </AddButton>
)

const UrlTextField = ({ form, resetUrl, setFieldValue }) => (
  <FormControl style={{ display: 'flex' }}>
    <InputLabel shrink>{'Page URL'}</InputLabel>
    <Input
      autoFocus
      endAdornment={
        <InputAdornment position="end">
          {form.url && (
            <IconButton aria-label="Clear url" onClick={resetUrl} style={{ padding: '4px' }}>
              <Close fontSize="small" />
            </IconButton>
          )}
        </InputAdornment>
      }
      name="url"
      onChange={setFieldValue}
      placeholder="Paste Page URL"
      value={form.url}
    />
  </FormControl>
)

const UrlGeneratorForm = ({
  showPersonaSelector,
  showPathSelector,
  formRef,
  onFormSubmit,
  selectPersona,
  resetUrl,
  form,
  setFieldValue,
  toggleAutoOpen,
  showOption,
  isDisabled,
}) => (
  <React.Fragment>
    <Form formRef={formRef} onSubmit={onFormSubmit}>
      <Option>
        <UrlTextField form={form} resetUrl={resetUrl} setFieldValue={setFieldValue} />
      </Option>
      <Option>
        {showPathSelector ? (
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Path"
            name="moduleId"
            onChange={setFieldValue}
            placeholder="Choose a Module"
            value={form.moduleId}
          />
        ) : (
          <AddOptionButton option="path" optionLabel="Add Path" showOption={showOption} />
        )}
      </Option>
      <Option>
        {showPersonaSelector ? (
          <StyledSelect
            autocomplete={apiPersonasAutocomplete}
            defaultValue={form.personaId}
            label="Persona"
            name="personaId"
            noMargin
            onChange={selectPersona}
            placeholder="Choose a Persona"
          />
        ) : (
          <AddOptionButton option="persona" optionLabel="Add Persona" showOption={showOption} />
        )}
      </Option>
      <Option style={{ paddingLeft: '6px' }}>
        <FormControlLabel
          control={<Switch color="primary" name="autoOpen" onChange={toggleAutoOpen} value={form.autoOpen} />}
          label="Auto Open"
        />
      </Option>
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Button color="primary" disabled={isDisabled} style={{ width: '50%' }} type="submit" variant="contained">
          {'Create Url'}
        </Button>
      </div>
    </Form>
  </React.Fragment>
)

const generateUrl = form => {
  const fragments = []
  if (form.autoOpen) fragments.push('open:1')
  if (form.moduleId) fragments.push(`path:${form.moduleId}`)
  if (form.personaId) fragments.push(`persona:${form.personaId}`)
  return `${form.url}#trnd:${fragments.join(',')}`
}

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('form', 'setForm', { personaId: '', url: '', autoOpen: false, moduleId: '' }),
  withState('showPathSelector', 'setShowPathSelector', false),
  withState('showPersonaSelector', 'setShowPersonaSelector', false),
  withProps(({ form }) => ({
    isDisabled: !(form.url && (form.autoOpen || form.moduleId || form.personaId)),
  })),
  withHandlers({
    showOption: ({ setShowPathSelector, setShowPersonaSelector }) => option => {
      if (option === 'path') setShowPathSelector(true)
      if (option === 'persona') setShowPersonaSelector(true)
    },
    resetUrl: ({ form, setForm }) => () => {
      setForm({
        ...form,
        url: '',
      })
    },
    selectPersona: ({ form, setForm }) => ({ value }) => {
      setForm({
        ...form,
        personaId: value.id,
      })
    },
    toggleAutoOpen: ({ form, setForm }) => () => {
      setForm({ ...form, autoOpen: !form.autoOpen })
    },
    setFieldValue: ({ form, setForm }) => event => {
      setForm({ ...form, [event.target.name]: event.target.value })
    },
    onFormSubmit: ({ setIsModalOpened, setGeneratedUrl, form, formRef }) => event => {
      event.preventDefault()
      if (!formRef.current.reportValidity()) return
      setGeneratedUrl(generateUrl(form))
      setIsModalOpened(true)
    },
  })
)(UrlGeneratorForm)
