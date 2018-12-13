import React from 'react'
import { compose, withHandlers } from 'recompose'
import { ListItem, TextField, Typography } from '@material-ui/core'

const ChatStepMessage = ({ chatStepType, index, isFormLoading, form, editChatMessageAttribute }) => (
  <React.Fragment>
    <ListItem>
      <Typography variant="subtitle1">{`Message #${index + 1}`}</Typography>
    </ListItem>
    <ListItem>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Delay"
        margin="normal"
        name="delay"
        onChange={editChatMessageAttribute}
        required
        value={form[chatStepType].chatMessagesAttributes[index].delay}
      />
    </ListItem>
    <ListItem>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Text"
        margin="normal"
        name="text"
        onChange={editChatMessageAttribute}
        required
        value={form[chatStepType].chatMessagesAttributes[index].text}
      />
    </ListItem>
  </React.Fragment>
)

export default compose(
  withHandlers({
    editChatMessageAttribute: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
  })
)(ChatStepMessage)
