import auth from 'auth'
import Autocomplete from 'shared/autocomplete'
import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemButton, Cancel, Form } from 'shared/form-elements'
import { apiFlowsAutocomplete, apiRequest, apiWebsiteShow } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormControl, FormHelperText, Grid, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const pathPattern = '/[^?#]*'

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const UrlTextField = compose(
  withHandlers({
    editUrlValue: ({ index, onChange }) => event => {
      onChange(index, event.target.value)
    },
  })
)(({ editUrlValue, value, hostnames, ...props }) => (
  <TextField
    {...props}
    InputProps={{
      startAdornment: (
        <InputAdornment>
          <Typography>{hostnames.length > 1 ? 'https://yourwebsite.com' : hostnames[0]}</Typography>
        </InputAdornment>
      ),
    }}
    onChange={editUrlValue}
    value={value}
  />
))

const StyledUrlTextField = styled(UrlTextField)`
  flex: 1;
  margin: 8px 0;
`

const TriggerForm = ({
  addUrlSelect,
  deleteUrlMatcher,
  editUrlValue,
  form,
  formRef,
  errors,
  isFormLoading,
  hostnames,
  isFormPristine,
  onFormSubmit,
  title,
  selectFlow,
}) => (
  <Section title={title}>
    <Grid item sm={6}>
      <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
        <Autocomplete
          autocomplete={apiFlowsAutocomplete}
          defaultPlaceholder="Choose a Trigger"
          disabled={isFormLoading}
          fullWidth
          initialSelectedItem={form.flowId && { value: form.flowId, label: form.flowLabel }}
          label="Flow"
          onChange={selectFlow}
          options={{ suggestionItem: 'withModuleIcon' }}
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
                  autoComplete="transaction-amount"
                  disabled={isFormLoading}
                  hostnames={hostnames}
                  index={index}
                  inputProps={{ pattern: pathPattern }}
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

export default compose(
  withOnboardingHelp({ single: true, stepName: 'triggers', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('hostnames', 'setHostnames', []),
  withState('errors', 'setErrors', null),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        flowId: json.flowId || '',
        flowType: json.flowType || '',
        urlMatchers: json.urlMatchers || [''],
        flowLabel: (json.flow && json.flow.name) || '',
      }
    },
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    flowId: '',
    flowType: '',
    urlMatchers: [''],
  }),
  withHandlers({
    addUrlSelect: ({ form, setForm }) => () => {
      setForm({ ...form, urlMatchers: [...form.urlMatchers, ''] })
    },
    editUrlValue: ({ form, setForm }) => (index, newValue) => {
      const newUrlMatchers = [...form.urlMatchers]
      newUrlMatchers[index] = newValue
      setForm({ ...form, urlMatchers: newUrlMatchers })
    },
    deleteUrlMatcher: ({ form, setForm }) => index => {
      let newUrlMatchers = [...form.urlMatchers]
      newUrlMatchers.splice(index, 1)
      setForm({ ...form, urlMatchers: newUrlMatchers })
    },
  }),
  withRouter,
  withHandlers({
    onFormSubmit: ({ formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.triggersList())
      setIsFormSubmitting(false)
      return result
    },
    selectFlow: ({ form, setForm }) => selected => {
      selected &&
        setForm({
          ...form,
          flowId: selected.value.id,
          flowType: selected.value.type,
        })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormSubmitting || isFormLoading} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  })),
  lifecycle({
    async componentDidMount() {
      const { setHostnames, enqueueSnackbar } = this.props
      const { json, requestError } = await apiRequest(apiWebsiteShow, [auth.getUser().account.websiteIds[0]])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      setHostnames(json.hostnames)
    },
  })
)(TriggerForm)
