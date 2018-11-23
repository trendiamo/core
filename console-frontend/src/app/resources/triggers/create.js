import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Button from '@material-ui/core/Button'
import Cancel from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withForm from 'ext/recompose/with-form'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiTriggerCreate } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
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

const TriggerCreate = ({
  deleteUrl,
  editUrlValue,
  addUrlSelect,
  form,
  info,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  setFieldValue,
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
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Flow Type"
        margin="normal"
        name="flow"
        value="Last ScriptedChat in db"
      />
      <LabelContainer>
        <InputLabel>{'Url Matchers'}</InputLabel>
      </LabelContainer>
      <MultiFormControl margin="normal">
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
              <IconButton>
                <EnhancedCancel disabled={isFormLoading} index={index} onClick={deleteUrl} />
              </IconButton>
            </FlexDiv>
          ))
        )}
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
  withRaTitle('Create Trigger'),
  withState('info', 'setInfo', null),
  withRouter,
  withHandlers({
    saveFormObject: ({ setInfo }) => async form => {
      const trigger = await apiTriggerCreate({ trigger: form }, setInfo)
      return trigger
    },
    afterSave: ({ history }) => result => {
      result && history.push('/triggers')
    },
  }),
  withHandlers({
    loadFormObject: () => () => {
      return {
        order: '',
        flow: '',
        urlMatchers: [''],
      }
    },
  }),
  withForm({
    order: '',
    flow: '',
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
  })
)(TriggerCreate)
