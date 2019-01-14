import ChatStep from './chat-step'
import ChatStepSelect from './chat-step-select'
import React from 'react'
import ReactDOM from 'react-dom'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { FormHelperText, Grid, TextField } from '@material-ui/core'

const ChatStepPortal = compose(branch(({ target }) => !target || !target.current, renderNothing))(
  ({ children, target }) => ReactDOM.createPortal(children, target.current)
)

const ChatStepOption = ({
  chatOption,
  chatStep,
  deleteChatOption,
  editChatOptionValue,
  index,
  isFormLoading,
  onChange,
  setChatStepForm,
}) => (
  <FormSection
    actions={<Cancel disabled={isFormLoading} index={index} onClick={deleteChatOption} />}
    hideBottom
    hideTop={index === 0}
    title={`Option #${index + 1}`}
  >
    <Grid item sm={6}>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Text"
        margin="normal"
        name="chatOption_text"
        onChange={editChatOptionValue}
        required
        value={chatOption.text}
      />
      <ChatStepSelect chatOption={chatOption} disabled={isFormLoading} index={index} onChange={onChange} />
      <FormHelperText>{'How this chat proceeds after someone clicks this option.'}</FormHelperText>
      {chatStep && (
        <ChatStepPortal target={chatStep.__ref}>
          <ChatStep chatStep={chatStep} index={chatStep.__index} onChange={setChatStepForm} />
        </ChatStepPortal>
      )}
    </Grid>
  </FormSection>
)

export default compose(
  branch(({ chatOption }) => chatOption._destroy, renderNothing),
  withProps(({ chatOption }) => ({
    chatStep: chatOption.destinationChatStepAttributes,
  })),
  withHandlers({
    editChatOptionValue: ({ chatOption, index, onChange }) => event => {
      const name = event.target.name.replace('chatOption_', '')
      chatOption[name] = event.target.value
      onChange(chatOption, index)
    },
    deleteChatOption: ({ chatOption, index, onChange }) => () => {
      onChange(
        {
          id: chatOption.id,
          _destroy: true,
        },
        index
      )
    },
  }),
  withHandlers({
    setChatStepForm: ({ chatOption, index, onChange }) => chatStep => {
      onChange({ ...chatOption, destinationChatStepAttributes: chatStep }, index)
    },
  })
)(ChatStepOption)
