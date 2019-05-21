import Autocomplete from 'shared/autocomplete'
import Button from 'shared/button'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { AddCircleOutline, Close } from '@material-ui/icons'
import { apiGeneratedUrlCreate, apiPathAutocomplete, apiPersonasAutocomplete, apiRequest } from 'utils'
import { Form } from 'shared/form-elements'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Button as MUIButton,
  Switch,
  Typography,
} from '@material-ui/core'
import { useSnackbar } from 'notistack'

const generateUrl = form => {
  const fragments = []
  if (form.autoOpen) fragments.push('open:1')
  if (form.step) fragments.push(`path:${form.step}`)
  if (form.personaId) fragments.push(`persona:${form.personaId}`)
  return `${form.url}#trnd:${fragments.join(',')}`
}

const Option = styled.div`
  margin: 12px 0px;
  border-radius: 4px;
  justify-content: left;
`

const StyledAutocomplete = styled(Autocomplete)`
  margin-top: 0px;
  margin-bottom: 0px;
`

const AddButton = styled(MUIButton)`
  display: flex;
  padding: 7px 0px;
  justify-content: left;
  text-transform: none;
`

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const AddOptionButton = ({ option, optionLabel, disabled, showOption }) => {
  const onClick = useCallback(() => showOption(option), [option, showOption])

  return (
    <AddButton color="primary" disabled={disabled} fullWidth onClick={onClick} size="small">
      <AddCircleOutline />
      <StyledTypography color="primary" variant="subtitle1">
        {optionLabel}
      </StyledTypography>
    </AddButton>
  )
}

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

const options = {}
const autocompleteOptions = { suggestionItem: 'withAvatar' }

const UrlGeneratorForm = ({ setGeneratedUrl, setIsModalOpened, setUrlHistory, urlHistory }) => {
  const { enqueueSnackbar } = useSnackbar()

  const formRef = useRef()
  const [form, setForm] = useState({
    personaId: '',
    url: '',
    autoOpen: false,
    step: '',
  })
  const [showStep, setShowStep] = useState(false)
  const [showPersona, setShowPersona] = useState(false)
  const isDisabled = useMemo(() => !(form.url && (form.autoOpen || form.step || form.personaId)), [form])

  const showOption = useCallback(option => {
    if (option === 'step') setShowStep(true)
    if (option === 'persona') setShowPersona(true)
  }, [])

  const resetUrl = useCallback(
    () => {
      setForm({
        ...form,
        url: '',
      })
    },
    [form]
  )

  const selectPersona = useCallback(
    selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
        })
    },
    [form]
  )

  const selectStep = useCallback(
    selected => {
      selected &&
        setForm({
          ...form,
          step: selected.value.path,
        })
    },
    [form]
  )

  const toggleAutoOpen = useCallback(
    () => {
      setForm({ ...form, autoOpen: !form.autoOpen })
    },
    [form]
  )

  const setFieldValue = useCallback(
    event => {
      setForm({ ...form, [event.target.name]: event.target.value })
    },
    [form]
  )

  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      const url = generateUrl(form)
      const { json, requestError } = await apiRequest(apiGeneratedUrlCreate, [{ url }])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setUrlHistory([json, ...urlHistory])
      if (!formRef.current.reportValidity()) return
      setGeneratedUrl(url)
      setIsModalOpened(true)
    },
    [enqueueSnackbar, form, setGeneratedUrl, setIsModalOpened, setUrlHistory, urlHistory]
  )

  return (
    <Form formRef={formRef} isFormPristine onSubmit={onFormSubmit}>
      <Option>
        <UrlTextField form={form} resetUrl={resetUrl} setFieldValue={setFieldValue} />
      </Option>
      <Option>
        {showStep ? (
          <>
            <Autocomplete
              autocomplete={apiPathAutocomplete}
              defaultPlaceholder="Choose a step"
              label="Step"
              noMargin
              onChange={selectStep}
              options={options}
            />
            <FormHelperText>{'Show a specific step of a module.'}</FormHelperText>
          </>
        ) : (
          <AddOptionButton option="step" optionLabel="Set Step" showOption={showOption} />
        )}
      </Option>

      <Option>
        {showPersona ? (
          <StyledAutocomplete
            autocomplete={apiPersonasAutocomplete}
            defaultPlaceholder="Choose a persona"
            label="Persona"
            noMargin
            onChange={selectPersona}
            options={autocompleteOptions}
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
        <Button centered color="primaryGradient" disabled={isDisabled} type="submit" variant="contained" width="160px">
          {'Create Url'}
        </Button>
      </div>
    </Form>
  )
}

export default UrlGeneratorForm
