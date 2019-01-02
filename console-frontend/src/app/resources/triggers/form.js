import CircularProgress from 'shared/circular-progress'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemButton, Cancel, Form } from 'shared/form-elements'
import { apiFlowsAutocomplete } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { FormControl, FormHelperText, Grid, InputLabel, TextField } from '@material-ui/core'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

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
)(({ editUrlValue, value, ...props }) => <TextField {...props} onChange={editUrlValue} value={value} />)

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
  isFormPristine,
  onFormSubmit,
  title,
  selectFlow,
}) => (
  <Section title={title}>
    <Grid item sm={6}>
      <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
        <Select
          autocomplete={apiFlowsAutocomplete}
          defaultValue={form.flowId ? { value: form.flowId, label: form.flowLabel } : null}
          disabled={isFormLoading}
          label="Flow"
          onChange={selectFlow}
          placeholder="Choose a flow..."
          required
        />
        <FormHelperText>{'Choose between Showcases, Navigations, etc.'}</FormHelperText>
        <FormControl fullWidth margin="normal">
          <InputLabel shrink>{'Url Matchers'}</InputLabel>
          <div style={{ marginTop: '11px' }}>
            {form.urlMatchers.length === 0 ? (
              <FlexDiv>
                <StyledUrlTextField
                  disabled={isFormLoading}
                  index={0}
                  onChange={editUrlValue}
                  required
                  value={form.urlMatchers[0]}
                />
              </FlexDiv>
            ) : (
              form.urlMatchers.map((url, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <FlexDiv key={index}>
                  <StyledUrlTextField
                    disabled={isFormLoading}
                    index={index}
                    onChange={editUrlValue}
                    required
                    value={url}
                  />
                  {form.urlMatchers.length > 1 && (
                    <Cancel disabled={isFormLoading} index={index} onClick={deleteUrlMatcher} />
                  )}
                </FlexDiv>
              ))
            )}
          </div>
          <AddItemButton disabled={isFormLoading} message="Add Another Url" onClick={addUrlSelect} />{' '}
        </FormControl>
        <FormHelperText>{'⚠️ Use only the part of the url after your domain name, eg: /my/page'}</FormHelperText>
      </Form>
    </Grid>
  </Section>
)

export default compose(
  withOnboardingHelp({ single: true, stepName: 'triggers', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('flows', 'setFlows', []),
  withHandlers({
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
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.triggersList())
      return result
    },
    selectFlow: ({ form, setForm }) => ({ value }) => {
      setForm({
        ...form,
        flowId: value.id,
        flowType: value.type,
      })
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
)(TriggerForm)
