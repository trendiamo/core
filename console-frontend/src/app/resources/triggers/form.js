import CircularProgress from 'shared/circular-progress'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemButton, Cancel, Form } from 'shared/form-elements'
import { apiFlowsList } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { camelize, singularize } from 'inflected'
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

const selectValue = (form, flows) => {
  if (form.flowType === '') return ''
  if (form.flowType === 'scriptedChats' || form.flowType === 'ScriptedChat')
    return `Scripted Chat: ${flows['scriptedChats'].find(scriptedChat => scriptedChat.id === form.flowId).id}`
  if (form.flowType === 'outros' || form.flowType === 'Outro')
    return `Outro: ${flows['outros'].find(outro => outro.id === form.flowId).id}`
  if (form.flowType === 'curations' || form.flowType === 'Curation')
    return `Curation: ${flows['curations'].find(curation => curation.id === form.flowId).id}`
}

const TriggerForm = ({
  addUrlSelect,
  deleteUrlMatcher,
  editUrlValue,
  flows,
  form,
  formRef,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  title,
  selectFlow,
}) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
    <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <FormControl disabled={isFormLoading} fullWidth>
        <InputLabel htmlFor="flow-label-placeholder" shrink>
          {'Flow'}
        </InputLabel>
        <Select
          displayEmpty
          input={<Input id="flow-label-placeholder" name="flow" />}
          name="flow"
          onChange={selectFlow}
          value={selectValue(form, flows)}
        >
          {flows.scriptedChats.map(flow => (
            <MenuItem
              id={flow.id}
              key={`scriptedChat-${flow.id}`}
              type="scriptedChats"
              value={`Scripted Chat: ${flow.id}`}
            >
              {`Scripted Chat: ${flow.id}`}
            </MenuItem>
          ))}
          {flows.outros.map(flow => (
            <MenuItem id={flow.id} key={`outro-${flow.id}`} type="outros" value={`Outro: ${flow.id}`}>
              {`Outro: ${flow.id}`}
            </MenuItem>
          ))}
          {flows.curations.map(flow => (
            <MenuItem id={flow.id} key={`curation-${flow.id}`} type="curations" value={`Curation: ${flow.id}`}>
              {`Curation: ${flow.id}`}
            </MenuItem>
          ))}
        </Select>
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
              <StyledUrlTextField disabled={isFormLoading} index={index} onChange={editUrlValue} required value={url} />
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
  </PaperContainer>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('flows', 'setFlows', { scriptedChats: [], outros: [], curations: [] }),
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
    selectFlow: ({ form, setForm }) => (index, newValue) => {
      setForm({
        ...form,
        flowId: newValue.props.id,
        flowType: camelize(singularize(newValue.props.type)),
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
