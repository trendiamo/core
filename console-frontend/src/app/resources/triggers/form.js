import CircularProgress from 'shared/circular-progress'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import Select from 'shared/select'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemButton, Cancel, Form } from 'shared/form-elements'
import { apiFlowsAutocomplete, apiFlowsList } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { withRouter } from 'react-router'

const LabelContainer = styled.div`
  margin-top: 1rem;
`

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
  flows,
  form,
  formRef,
  setFlows,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  title,
  selectFlow,
}) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
    <Grid item sm={6}>
      <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
        <FormControl disabled={isFormLoading} fullWidth>
          <InputLabel htmlFor="flow-label-placeholder" shrink>
            {'Flow'}
          </InputLabel>
          <Select
            autocomplete={apiFlowsAutocomplete}
            defaultOptions={flows}
            list={apiFlowsList}
            onChange={selectFlow}
            placeholder="Flow *"
            setOptions={setFlows}
          />
        </FormControl>
        <div>
          <LabelContainer>
            <InputLabel>{'Url Matchers'}</InputLabel>
          </LabelContainer>
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
                  <IconButton>
                    <Cancel disabled={isFormLoading} index={index} onClick={deleteUrlMatcher} />
                  </IconButton>
                )}
              </FlexDiv>
            ))
          )}
          <AddItemButton disabled={isFormLoading} message="Add Another Url" onClick={addUrlSelect} />{' '}
        </div>
      </Form>
    </Grid>
  </PaperContainer>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('flows', 'setFlows', []),
  withHandlers({
    loadFormObject: ({ loadFormObject, setFlows }) => async () => {
      const flows = await apiFlowsList()
      setFlows(flows)
      return loadFormObject()
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
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.triggersList())
      return result
    },
    selectFlow: ({ form, setForm }) => selected => {
      setForm({
        ...form,
        flowId: selected.value.id,
        flowType: selected.value.type,
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
