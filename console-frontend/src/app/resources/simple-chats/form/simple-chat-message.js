import React from 'react'
import { branch, compose, renderNothing, withHandlers } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { DragHandle } from 'shared/sortable-elements'
import { FormHelperText, Grid, TextField } from '@material-ui/core'

const SimpleChatMessage = ({
  allowDelete,
  deleteSimpleChatMessage,
  index,
  isFormLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  onFocus,
  editSimpleChatMessageValue,
}) => (
  <FormSection
    actions={
      allowDelete && (
        <Cancel disabled={isFormLoading} index={simpleChatMessageIndex} onClick={deleteSimpleChatMessage} />
      )
    }
    backgroundColor="#fff"
    dragHandle={<DragHandle />}
    ellipsize
    foldable
    hideBottom
    hideTop={index === 0}
    title={simpleChatMessage.id ? simpleChatMessage.text : 'New Message'}
  >
    <Grid item sm={6}>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Message"
        margin="normal"
        name="simpleChatMessage_text"
        onChange={editSimpleChatMessageValue}
        onFocus={onFocus}
        required
        value={simpleChatMessage.text}
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
  branch(({ simpleChatMessage }) => simpleChatMessage._destroy, renderNothing),
  withHandlers({
    editSimpleChatMessageValue: ({ simpleChatMessage, simpleChatMessageIndex, onChange }) => event => {
      const name = event.target.name.replace('simpleChatMessage_', '')
      simpleChatMessage[name] = event.target.value
      onChange(simpleChatMessage, simpleChatMessageIndex)
    },
    deleteSimpleChatMessage: ({ simpleChatMessage, simpleChatMessageIndex, onChange }) => () => {
      onChange(
        {
          id: simpleChatMessage.id,
          _destroy: true,
        },
        simpleChatMessageIndex
      )
    },
  })
)(SimpleChatMessage)
