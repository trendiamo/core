import auth from 'auth'
import Autocomplete from 'shared/autocomplete'
import CircularProgress from 'shared/circular-progress'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, AddItemButton, Cancel, Form, FormHelperText } from 'shared/form-elements'
import { apiFlowsAutocomplete, apiRequest, apiWebsiteShow, refreshRoute } from 'utils'
import { FormControl, Grid, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core'
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

const formObjectTransformer = json => {
  return {
    id: json.id,
    flowId: json.flowId || '',
    flowType: json.flowType || '',
    urlMatchers: json.urlMatchers || [''],
    flowLabel: (json.flow && json.flow.name) || '',
    lockVersion: json.lockVersion,
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

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, mergeForm, mergeFormCallback } = useForm(
    { formObjectTransformer, loadFormObject, saveFormObject }
  )

  const addUrlSelect = useCallback(
    () => {
      mergeFormCallback(form => ({ urlMatchers: [...form.urlMatchers, ''] }))
    },
    [mergeFormCallback]
  )

  const editUrlValue = useCallback(
    (index, newValue) => {
      mergeFormCallback(form => {
        const newUrlMatchers = [...form.urlMatchers]
        newUrlMatchers[index] = newValue
        return { urlMatchers: newUrlMatchers }
      })
    },
    [mergeFormCallback]
  )

  const deleteUrlMatcher = useCallback(
    index => {
      mergeFormCallback(form => {
        const newUrlMatchers = [...form.urlMatchers]
        newUrlMatchers.splice(index, 1)
        return { urlMatchers: newUrlMatchers }
      })
    },
    [mergeFormCallback]
  )

  const newOnFormSubmit = useCallback(
    async (event, action) => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result || result.error || result.errors) return
      if (action === 'Save & New') {
        location.pathname === routes.triggerCreate()
          ? refreshRoute(history, routes.triggerCreate())
          : history.push(routes.triggerCreate())
      } else {
        if (location.pathname !== routes.triggerEdit(result.id)) history.push(routes.triggerEdit(result.id))
      }
      return result
    },
    [history, location.pathname, onFormSubmit]
  )

  const selectFlow = useCallback(
    selected => {
      selected &&
        mergeForm({
          flowId: selected.value.id,
          flowType: selected.value.type,
        })
    },
    [mergeForm]
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

  const inputProps = useMemo(
    () => ({
      pattern: hostnames.includes('www.pionier-workwear.com') ? pathAndSearchPattern : pathPattern,
    }),
    [hostnames]
  )

  const initialSelectedItem = useMemo(
    () => form.flowId && { value: { id: form.flowId, type: form.flowType }, label: form.flowLabel },
    [form.flowId, form.flowLabel, form.flowType]
  )

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiWebsiteShow, [auth.getAccount().websitesAttributes[0].id])
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
            autoFocus
            defaultPlaceholder="Choose a Module"
            disabled={isFormLoading}
            fullWidth
            initialSelectedItem={initialSelectedItem}
            initialValueFormatMismatch
            label="Module"
            name="Module"
            onChange={selectFlow}
            options={options}
            required
          />
          <FormHelperText>{'Choose between Showcases, Chats, etc.'}</FormHelperText>
          <FormControl fullWidth margin="normal">
            <InputLabel shrink>{'URL Matchers'}</InputLabel>
            <div style={{ marginTop: '11px' }}>
              {form.urlMatchers.map((url, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <FlexDiv key={index}>
                  <StyledUrlTextField
                    disabled={isFormLoading}
                    hostnames={hostnames}
                    index={index}
                    inputProps={inputProps}
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
            <AddItemButton disabled={isFormLoading} message="Add Another URL" onClick={addUrlSelect} />{' '}
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
