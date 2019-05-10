import auth from 'auth'
import Autocomplete from 'shared/autocomplete'
import CircularProgress from 'shared/circular-progress'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, AddItemButton, Cancel, Form } from 'shared/form-elements'
import { apiFlowsAutocomplete, apiRequest, apiWebsiteShow, refreshRoute } from 'utils'
import { FormControl, FormHelperText, Grid, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const pathPattern = '/[^?#]*'
const pathAndSearchPattern = '/[^#]*'

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const UrlTextField = ({ index, onChange, value, hostnames, ...props }) => {
  const editUrlValue = useCallback(
    event => {
      onChange(index, event.target.value)
    },
    [index, onChange]
  )

  return (
    <TextField
      {...props}
      InputProps={{
        startAdornment: (
          <InputAdornment>
            <Typography style={{ whiteSpace: 'nowrap' }}>
              {hostnames.length > 1 ? 'https://yourwebsite.com' : hostnames[0]}
            </Typography>
          </InputAdornment>
        ),
      }}
      onChange={editUrlValue}
      value={value}
    />
  )
}

const StyledUrlTextField = styled(UrlTextField)`
  flex: 1;
  margin: 8px 0;
`

const options = { suggestionItem: 'withModuleIcon' }

const defaultForm = {
  flowId: '',
  flowType: '',
  urlMatchers: [''],
}

const formObjectTransformer = json => {
  return {
    id: json.id,
    flowId: json.flowId || '',
    flowType: json.flowType || '',
    urlMatchers: json.urlMatchers || [''],
    flowLabel: (json.flow && json.flow.name) || '',
  }
}

const TriggerForm = ({ history, backRoute, location, title, loadFormObject, saveFormObject, enqueueSnackbar }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'triggers', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef()
  const [hostnames, setHostnames] = useState([])

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setForm, setIsFormSubmitting } = useForm(
    { formObjectTransformer, defaultForm, loadFormObject, saveFormObject }
  )

  const addUrlSelect = useCallback(
    () => {
      setForm({ ...form, urlMatchers: [...form.urlMatchers, ''] })
    },
    [form, setForm]
  )

  const editUrlValue = useCallback(
    (index, newValue) => {
      const newUrlMatchers = [...form.urlMatchers]
      newUrlMatchers[index] = newValue
      setForm({ ...form, urlMatchers: newUrlMatchers })
    },
    [form, setForm]
  )

  const deleteUrlMatcher = useCallback(
    index => {
      let newUrlMatchers = [...form.urlMatchers]
      newUrlMatchers.splice(index, 1)
      setForm({ ...form, urlMatchers: newUrlMatchers })
    },
    [form, setForm]
  )

  const newOnFormSubmit = useCallback(
    async (event, action) => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      setIsFormSubmitting(false)
      if (result.error || result.errors) return
      if (action === 'Save & New') {
        location.pathname === routes.triggerCreate()
          ? refreshRoute(history, routes.triggerCreate())
          : history.push(routes.triggerCreate())
      } else {
        if (location.pathname !== routes.triggerEdit(result.id)) history.push(routes.triggerEdit(result.id))
      }
      return result
    },
    [history, location.pathname, onFormSubmit, setIsFormSubmitting]
  )

  const selectFlow = useCallback(
    selected => {
      selected &&
        setForm({
          ...form,
          flowId: selected.value.id,
          flowType: selected.value.type,
        })
    },
    [form, setForm]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveAndCreateNewEnabled
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiWebsiteShow, [
          auth.isAdmin()
            ? auth.getAdminSessionAccount().websitesAttributes[0].id
            : auth.getUser().account.websiteIds[0],
        ])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        setHostnames(json.hostnames)
      })()
    },
    [enqueueSnackbar]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title={title}>
      <Grid item sm={6}>
        <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={newOnFormSubmit}>
          <Autocomplete
            autocomplete={apiFlowsAutocomplete}
            defaultPlaceholder="Choose a Module"
            disabled={isFormLoading}
            fullWidth
            initialSelectedItem={
              form.flowId && { value: { id: form.flowId, type: form.flowType }, label: form.flowLabel }
            }
            initialValueFormatMismatch
            label="Module"
            onChange={selectFlow}
            options={options}
            required
          />
          <FormHelperText>{'Choose between Showcases, Navigations, etc.'}</FormHelperText>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>{'Url Matchers'}</InputLabel>
            <div style={{ marginTop: '11px' }}>
              {form.urlMatchers.map((url, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <FlexDiv key={index}>
                  <StyledUrlTextField
                    disabled={isFormLoading}
                    hostnames={hostnames}
                    index={index}
                    inputProps={{
                      pattern: hostnames.includes('www.pionier-workwear.com') ? pathAndSearchPattern : pathPattern,
                    }}
                    onChange={editUrlValue}
                    required
                    value={url}
                  />
                  {form.urlMatchers.length > 1 && (
                    <Cancel disabled={isFormLoading} index={index} onClick={deleteUrlMatcher} />
                  )}
                </FlexDiv>
              ))}
            </div>
            <AddItemButton disabled={isFormLoading} message="Add Another Url" onClick={addUrlSelect} />{' '}
          </FormControl>
          <FormHelperText>{'⚠️ Use only the part of the url after your domain name, eg: /my/page'}</FormHelperText>
          <FormHelperText>
            {'ℹ️ You can use a matching pattern such as /products/:id to match all urls in that form.'}
          </FormHelperText>
        </Form>
      </Grid>
    </Section>
  )
}

export default withRouter(TriggerForm)
