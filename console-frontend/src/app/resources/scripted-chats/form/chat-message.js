import React from 'react'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { DragHandle } from 'shared/sortable-elements'
import { FormHelperText, Grid, TextField } from '@material-ui/core'

const ChatStepMessage = ({
  allowDelete,
  deleteChatMessage,
  index,
  isFormLoading,
  chatMessage,
  onFocus,
  editChatMessageValue,
}) => (
  <FormSection
    actions={allowDelete && <Cancel disabled={isFormLoading} index={index} onClick={deleteChatMessage} />}
    backgroundColor="#fff"
    dragHandle={<DragHandle />}
    ellipsize
    foldable
    hideBottom
    hideTop={index === 0}
    title={chatMessage.id ? chatMessage.text : 'New Message'}
  >
    <Grid item sm={6}>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Text"
        margin="normal"
        multiline
        name="chatMessage_text"
        onChange={editChatMessageValue}
        onFocus={onFocus}
        required
        value={chatMessage.text}
      />
      <FormHelperText>
        {'ℹ️ You can format text using '}
        <a href="https://www.markdownguide.org/cheat-sheet" rel="noopener noreferrer" target="_blank">
          {'markdown'}
        </a>
        {'. If you just paste a youtube link, the video will be shown.'}
      </FormHelperText>
    </Grid>
  </FormSection>
)

export default compose(
  branch(({ chatMessage }) => chatMessage._destroy, renderNothing),
  withHandlers({
    editChatMessageValue: ({ chatMessage, index, onChange }) => event => {
      const name = event.target.name.replace('chatMessage_', '')
      chatMessage[name] = event.target.value
      onChange(chatMessage, index)
    },
    deleteChatMessage: ({ chatMessage, index, onChange }) => () => {
      onChange(
        {
          id: chatMessage.id,
          _destroy: true,
        },
        index
      )
    },
  })
)(ChatStepMessage)
