import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Button from '@material-ui/core/Button'
import Cancel from '@material-ui/icons/Cancel'
import CircularProgress from 'shared/circular-progress'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { apiFlowsList } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { camelize, singularize } from 'inflected'
import { Prompt } from 'react-router'
import { withRouter } from 'react-router'

const Actions = ({ isFormLoading, onFormSubmit }) => (
  <Button color="primary" disabled={isFormLoading} onClick={onFormSubmit} type="submit" variant="contained">
    <SaveIcon />
    {'Save'}
  </Button>
)

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
const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`
const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const AddUrlButton = ({ disabled, addUrlSelect }) => (
  <Button disabled={disabled} onClick={addUrlSelect} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Url'}</StyledTypography>
  </Button>
)

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
  deleteUrl,
  editUrlValue,
  flows,
  form,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  selectFlow,
  setFieldValue,
}) => (
  <PaperContainer>
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={errors} />
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Name"
        margin="normal"
        name="name"
        onChange={setFieldValue}
        required
        value={form.name}
      />
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Order"
        margin="normal"
        name="order"
        onChange={setFieldValue}
        required
        value={form.order}
      />
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
                  <Cancel disabled={isFormLoading} index={index} onClick={deleteUrl} />
                </IconButton>
              )}
            </FlexDiv>
          ))
        )}
        <AddUrlButton addUrlSelect={addUrlSelect} disabled={isFormLoading} />{' '}
      </div>
    </form>
  </PaperContainer>
)

export default compose(
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
    name: '',
    order: '',
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
    deleteUrl: ({ form, setForm }) => index => {
      let newUrlMatchers = [...form.urlMatchers]
      newUrlMatchers.splice(index, 1)
      setForm({ ...form, urlMatchers: newUrlMatchers })
    },
  }),
  withRouter,
  withHandlers({
    onFormSubmit: ({ history, onFormSubmit }) => async event => {
      const result = await onFormSubmit(event)
      result && history.push(routes.triggersList())
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
    Actions: <Actions isFormLoading={isFormLoading} onFormSubmit={onFormSubmit} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(TriggerForm)
