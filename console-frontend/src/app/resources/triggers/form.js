import auth from 'auth'
import Autocomplete from 'shared/autocomplete'
import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemButton, Cancel, Form, HelperText } from 'shared/form-elements'
import { apiFlowsAutocomplete, apiRequest, apiWebsiteShow, refreshRoute } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormControl, Grid, InputAdornment, InputLabel, TextField, Typography } from '@material-ui/core'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const pathPattern = '/[^?#]*'
const pathAndSearchPattern = '/[^#]*'

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
          <Typography style={{ whiteSpace: 'nowrap' }}>
            {hostnames.length > 1 ? 'https://yourwebsite.com' : hostnames[0]}
          </Typography>
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
  isFormLoading,
  hostnames,
  isFormPristine,
  onFormSubmit,
  title,
  selectFlow,
}) => (
  <Section title={title}>
    <Grid item sm={6}>
      <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
        <Autocomplete
          autocomplete={apiFlowsAutocomplete}
          defaultPlaceholder="Choose a Module"
          disabled={isFormLoading}
          fullWidth
          initialSelectedItem={form.flowId && { value: form.flowId, label: form.flowLabel }}
          initialValueFormatMismatch
          label="Module"
          onChange={selectFlow}
          options={{ suggestionItem: 'withModuleIcon' }}
          required
        />
        <HelperText>{'Choose between Showcases, Navigations, etc.'}</HelperText>
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
        <HelperText>{'⚠️ Use only the part of the url after your domain name, eg: /my/page'}</HelperText>
        <HelperText>
          {'ℹ️ You can use a matching pattern such as /products/:id to match all urls in that form.'}
        </HelperText>
      </Form>
    </Grid>
  </Section>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'triggers', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('hostnames', 'setHostnames', []),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        flowId: json.flowId || '',
        flowType: json.flowType || '',
        urlMatchers: json.urlMatchers || [''],
        flowLabel: (json.flow && json.flow.name) || '',
      }
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
    onFormSubmit: ({ formRef, history, location, onFormSubmit, setIsFormSubmitting }) => async (event, action) => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      if (action === 'Save & New') {
        location.pathname === routes.triggerCreate()
          ? refreshRoute(history, routes.triggerCreate())
          : history.push(routes.triggerCreate())
      } else {
        if (location.pathname !== routes.triggerEdit(result.id)) history.push(routes.triggerEdit(result.id))
      }
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
  withAppBarContent(({ backRoute, title, isFormLoading, isFormSubmitting, onFormSubmit, isFormPristine }) => ({
    Actions: (
      <Actions
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        onFormSubmit={onFormSubmit}
        saveAndCreateNewEnabled
        saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
        tooltipEnabled
        tooltipText="No changes to save"
      />
    ),
    backRoute,
    title,
  })),
  lifecycle({
    async componentDidMount() {
      const { setHostnames, enqueueSnackbar } = this.props
      const { json, requestError } = await apiRequest(apiWebsiteShow, [
        auth.isAdmin() ? auth.getAdminSessionAccount().websitesAttributes[0].id : auth.getUser().account.websiteIds[0],
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      setHostnames(json.hostnames)
    },
  })
)(TriggerForm)
