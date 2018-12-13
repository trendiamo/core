import ChatStep from './chat-step'
import React from 'react'
import sanitizeProps from 'shared/sanitize-props'
import { compose, withHandlers, withState } from 'recompose'
import { FormControl, Input, InputLabel, ListItem, MenuItem, Select, TextField, Typography } from '@material-ui/core'

const ChatStepOption = ({
  editChatStepAttribute,
  selectDestinationStep,
  index,
  editChatOptionAttribute,
  isFormLoading,
  form,
  showNewChatStep,
  setForm,
  chatStepIndex,
  chatStepType,
  addAction,
  deleteAction,
  showChildSteps,
}) => (
  <React.Fragment>
    <ListItem>
      <Typography variant="subtitle1">{`Option #${index + 1}`}</Typography>
    </ListItem>
    <ListItem>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Text"
        margin="normal"
        name="text"
        onChange={editChatOptionAttribute}
        required
        value={form[chatStepType].chatOptionsAttributes[index].text}
      />
    </ListItem>
    <ListItem>
      <FormControl disabled={isFormLoading} fullWidth>
        <InputLabel htmlFor="destination-step-label-placeholder" shrink>
          {'Destination Step'}
        </InputLabel>
        <Select
          displayEmpty
          input={<Input id="destination-step-placeholder" name="destinationStep" />}
          name="id"
          onChange={selectDestinationStep}
          value={
            form[chatStepType].chatOptionsAttributes[index].destinationChatStepId === form[chatStepType].id
              ? form[chatStepType].chatOptionsAttributes[index].destinationChatStepId
              : 'selectPlaceholder'
          }
        >
          <MenuItem disabled value="selectPlaceholder">
            {'Choose a destination Chat Step'}
          </MenuItem>
          <MenuItem name="destinationChatStepId" value={form[chatStepType].id}>
            {form[chatStepType].id}
          </MenuItem>
          <MenuItem value="newChatStep">{'Add destination chat step'}</MenuItem>
        </Select>
      </FormControl>
    </ListItem>
    {(showNewChatStep || showChildSteps) &&
      (form[chatStepType].chatOptionsAttributes[index].destinationChatStepAttributes &&
        form[chatStepType].id !== form[chatStepType].chatOptionsAttributes[index].destinationChatStepId && (
          <ListItem>
            <ChatStep
              addAction={addAction}
              chatOptionIndex={index}
              chatStepType="destinationChatStepAttributes"
              deleteAction={deleteAction}
              form={form[chatStepType].chatOptionsAttributes[index]}
              index={chatStepIndex + 1}
              onChange={editChatStepAttribute}
              setForm={setForm}
              showChildSteps={showChildSteps}
            />
          </ListItem>
        ))}
  </React.Fragment>
)

export default compose(
  withState('showNewChatStep', 'setShowNewChatStep', false),
  withHandlers({
    editChatOptionAttribute: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
  }),
  withHandlers({
    selectDestinationStep: ({ addAction, chatStepType, onChange, setShowNewChatStep, index, form }) => (
      _index,
      newValue
    ) => {
      if (newValue.props.value === 'newChatStep') {
        // we need to add a destinationChatStepAttributes object with a new message and clean destinationChatStepId
        // if it was already there
        form[chatStepType].chatOptionsAttributes[index].destinationChatStepAttributes = {
          chatMessagesAttributes: [],
        }
        addAction(
          {
            delay: '',
            text: '',
          },
          'chatMessagesAttributes',
          form[chatStepType].chatOptionsAttributes[index],
          'destinationChatStepAttributes'
        )
        onChange(index, { name: 'destinationChatStepId', value: '' })
        setShowNewChatStep(true)
      } else {
        setShowNewChatStep(false)
        // we need to go back to a "pristine" state if the user adds a destinationChatStep and later decides
        // to choose the parent chatstep option on the select, removing the destinationChatStepAttributes hash
        if (form[chatStepType].chatOptionsAttributes[index].destinationChatStepAttributes) {
          const filteredObject = form[chatStepType].chatOptionsAttributes[index]
          const newObject = sanitizeProps(filteredObject, ['destinationChatStepAttributes'])
          form[chatStepType].chatOptionsAttributes[index] = newObject
        }
        onChange(index, newValue.props)
      }
    },
  })
)(ChatStepOption)
