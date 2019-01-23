import Autocomplete from 'shared/autocomplete'
import React from 'react'
import styled from 'styled-components'
import { AddCircleOutline, Close } from '@material-ui/icons'
import { apiGeneratedUrlCreate, apiPathAutocomplete, apiPersonasAutocomplete, apiRequest } from 'utils'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Switch,
  Typography,
} from '@material-ui/core'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { Form } from 'shared/form-elements'
import { withSnackbar } from 'notistack'

const Option = styled.div`
  margin: 12px 0px;
  border-radius: 4px;
  justify-content: left;
`

const StyledAutocomplete = styled(Autocomplete)`
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
      type="URL"
      value={form.url}
    />
  </FormControl>
)

const UrlGeneratorForm = ({
  showPersona,
  showStep,
  formRef,
  onFormSubmit,
  selectPersona,
  resetUrl,
  form,
  setFieldValue,
  toggleAutoOpen,
  showOption,
  isDisabled,
  selectStep,
}) => (
  <React.Fragment>
    <Form formRef={formRef} isFormPristine onSubmit={onFormSubmit}>
      <Option>
        <UrlTextField form={form} resetUrl={resetUrl} setFieldValue={setFieldValue} />
      </Option>
      <Option>
        {showStep ? (
          <React.Fragment>
            <Autocomplete
              autocomplete={apiPathAutocomplete}
              defaultValue=""
              label="Step"
              onChange={selectStep}
              placeholder="Choose a step..."
            />
            <FormHelperText>{'Show a specific step of a module.'}</FormHelperText>
          </React.Fragment>
        ) : (
          <AddOptionButton option="step" optionLabel="Set Step" showOption={showOption} />
        )}
      </Option>

      <Option>
        {showPersona ? (
          <StyledAutocomplete
            autocomplete={apiPersonasAutocomplete}
            defaultValue={form.personaId}
            label="Persona"
            name="personaId"
            noMargin
            onChange={selectPersona}
            placeholder="Choose a Persona"
          />
        ) : (
          <AddOptionButton option="persona" optionLabel="Set Persona" showOption={showOption} />
        )}
      </Option>
      <Option style={{ paddingLeft: '6px' }}>
        <FormControlLabel
          control={<Switch color="primary" name="autoOpen" onChange={toggleAutoOpen} value={form.autoOpen} />}
          label="Auto Open"
        />
        <FormHelperText>{'Whether the plugin should auto-open when the generated url is clicked.'}</FormHelperText>
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
  if (form.step) fragments.push(`path:${form.step}`)
  if (form.personaId) fragments.push(`persona:${form.personaId}`)
  return `${form.url}#trnd:${fragments.join(',')}`
}

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('form', 'setForm', {
    personaId: '',
    url: '',
    autoOpen: false,
    step: '',
  }),
  withState('showStep', 'setShowStep', false),
  withState('showPersona', 'setShowPersona', false),
  withProps(({ form }) => ({
    isDisabled: !(form.url && (form.autoOpen || form.step || form.personaId)),
  })),
  withSnackbar,
  withHandlers({
    showOption: ({ setShowStep, setShowPersona }) => option => {
      if (option === 'step') setShowStep(true)
      if (option === 'persona') setShowPersona(true)
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
    selectStep: ({ form, setForm }) => ({ value }) => {
      setForm({
        ...form,
        step: value.path,
      })
    },
    toggleAutoOpen: ({ form, setForm }) => () => {
      setForm({ ...form, autoOpen: !form.autoOpen })
    },
    setFieldValue: ({ form, setForm }) => event => {
      setForm({ ...form, [event.target.name]: event.target.value })
    },
    onFormSubmit: ({
      setIsModalOpened,
      setGeneratedUrl,
      form,
      formRef,
      urlHistory,
      setUrlHistory,
      enqueueSnackbar,
    }) => async event => {
      event.preventDefault()
      const url = generateUrl(form)
      const { json, requestError } = await apiRequest(apiGeneratedUrlCreate, [{ url }])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setUrlHistory([json, ...urlHistory])
      if (!formRef.current.reportValidity()) return
      setGeneratedUrl(url)
      setIsModalOpened(true)
    },
  })
)(UrlGeneratorForm)
