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
import SaveIcon from '@material-ui/icons/Save'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withForm from 'ext/recompose/with-form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiFlowsList, apiTriggerShow, apiTriggerUpdate } from 'utils'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'
import { withRouter } from 'react-router'

const LabelContainer = styled.div`
  margin-top: 1rem;
`

const MultiFormControl = styled.div`
  margin-top: 0;
`

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const EnhancedCancel = compose(
  withHandlers({
    deleteUrl: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(({ deleteUrl, ...props }) => <Cancel {...props} onClick={deleteUrl} />)

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
  if (form.flowType === 'scriptedChats' || form.flowType === 'ScriptedChat')
    return flows['scriptedChats'].find(scriptedChat => scriptedChat.id === form.flowId).title
  if (form.flowType === 'outros' || form.flowType === 'Outro')
    return flows['outros'].find(outro => outro.id === form.flowId).id
  if (form.flowType === 'curations' || form.flowType === 'Curation')
    return flows['curations'].find(curation => curation.id === form.flowId).title
}

const TriggerEdit = ({
  deleteUrl,
  editUrlValue,
  addUrlSelect,
  form,
  flows,
  info,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  setFieldValue,
  selectFlow,
}) => (
  <PaperContainer>
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={info} />
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
      <FormControl disabled={isFormLoading}>
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
          {flows.scriptedChats.map((flow, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} type="scriptedChats" value={flow.title}>
              {`Scripted Chat: ${flow.title}`}
            </MenuItem>
          ))}
          {flows.outros.map((flow, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} type="outros" value={flow.id}>
              {`Outro: ${flow.id}`}
            </MenuItem>
          ))}
          {flows.curations.map((flow, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MenuItem key={index} type="curations" value={flow.title}>
              {`Curation: ${flow.title}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LabelContainer>
        <InputLabel>{'Url Matchers'}</InputLabel>
      </LabelContainer>
      <MultiFormControl margin="normal">
        {form.urlMatchers.map((url, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <FlexDiv key={index}>
            <StyledUrlTextField disabled={isFormLoading} index={index} onChange={editUrlValue} required value={url} />
            <IconButton>
              <EnhancedCancel disabled={isFormLoading} index={index} onClick={deleteUrl} />
            </IconButton>
          </FlexDiv>
        ))}
        <AddUrlButton addUrlSelect={addUrlSelect} disabled={isFormLoading} />{' '}
      </MultiFormControl>
      <Button color="primary" disabled={isFormLoading} type="submit" variant="contained">
        <SaveIcon />
        {'Save'}
      </Button>
    </form>
  </PaperContainer>
)

export default compose(
  withRaTitle('Edit Trigger'),
  withState('info', 'setInfo', null),
  withState('flows', 'setFlows', []),
  withRouter,
  withHandlers({
    saveFormObject: ({ setInfo, match }) => async form => {
      const id = match.params.triggerId
      const trigger = await apiTriggerUpdate(id, { trigger: form }, setInfo)
      return trigger
    },
    afterSave: ({ history }) => result => {
      result && history.push('/triggers')
    },
  }),
  withHandlers({
    loadFormObject: ({ setInfo, match, setFlows }) => async () => {
      const flows = await apiFlowsList(setInfo)
      setFlows(flows)
      const id = match.params.triggerId
      const triggerJson = await apiTriggerShow(id, setInfo)
      return {
        order: triggerJson.trigger.order || '',
        flowId: triggerJson.trigger.flowId || '',
        flowType: triggerJson.trigger.flowType || '',
        urlMatchers: triggerJson.trigger.urlMatchers || [''],
      }
    },
  }),
  withForm({
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
      const newUrls = [...form.urlMatchers]
      newUrls[index] = newValue
      setForm({ ...form, urlMatchers: newUrls })
    },
    deleteUrl: ({ form, setForm }) => index => {
      let newUrls = [...form.urlMatchers]
      newUrls.splice(index, 1)
      setForm({ ...form, urlMatchers: newUrls })
    },
  }),
  withHandlers({
    selectFlow: ({ flows, form, setForm }) => (index, newValue) => {
      setForm({ ...form, flowId: flows[newValue.props.type][newValue.key].id, flowType: newValue.props.type })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(TriggerEdit)
