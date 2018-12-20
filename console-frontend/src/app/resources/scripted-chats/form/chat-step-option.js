import ChatStep from './chat-step'
import React from 'react'
import sanitizeProps from 'shared/sanitize-props'
import Select from 'shared/select'
import Switch from '@material-ui/core/Switch'
import { apiChatStepsAutocomplete } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { FormControl, InputLabel, ListItem, TextField, Typography } from '@material-ui/core'

const ChatStepOption = ({
  editChatStepAttribute,
  selectDestinationStep,
  index,
  editChatOptionAttribute,
  isFormLoading,
  form,
  isNewChatStep,
  showNewChatStep,
  setForm,
  handleChatStepSwitch,
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
      <Switch onChange={handleChatStepSwitch} />
      <FormControl disabled={isFormLoading} fullWidth>
        <InputLabel htmlFor="destination-step-label-placeholder" shrink>
          {'Destination Step'}
        </InputLabel>
        {isNewChatStep ? (
          <React.Fragment>
            {(showNewChatStep || showChildSteps) &&
              (form[chatStepType].chatOptionsAttributes[index].destinationChatStepAttributes && (
                // form[chatStepType].id !== form[chatStepType].chatOptionsAttributes[index].destinationChatStepId &&
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
        ) : (
          <Select
            autocomplete={apiChatStepsAutocomplete}
            // defaultValue={
            //   form[chatStepType].chatOptionsAttributes[index] && {
            //     value: form[chatStepType].chatOptionsAttributes[index].destinationChatStepId,
            //     label: form[chatStepType].chatOptionsAttributes[index].destinationChatStepAttributes.label,
            //   }
            // }
            name="destinationChatStepId"
            onChange={selectDestinationStep}
            placeholder="Chat-Step *"
          />
        )}
      </FormControl>
    </ListItem>
  </React.Fragment>
)

export default compose(
  withState('showNewChatStep', 'setShowNewChatStep', false),
  withState('isNewChatStep', 'setIsNewChatStep', false),
  withHandlers({
    editChatOptionAttribute: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
  }),
  withHandlers({
    handleChatStepSwitch: ({ setIsNewChatStep, addAction, chatStepType, onChange, index, form }) => (
      event,
      checked
    ) => {
      setIsNewChatStep(checked)
      if (checked) {
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
      }
    },
    selectDestinationStep: ({ chatStepType, onChange, setShowNewChatStep, index, form }) => selected => {
      setShowNewChatStep(false)
      // we need to go back to a "pristine" state if the user adds a destinationChatStep and later decides
      // to choose the parent chatstep option on the select, removing the destinationChatStepAttributes hash
      if (form[chatStepType].chatOptionsAttributes[index].destinationChatStepAttributes) {
        const filteredObject = form[chatStepType].chatOptionsAttributes[index]
        const newObject = sanitizeProps(filteredObject, ['destinationChatStepAttributes'])
        form[chatStepType].chatOptionsAttributes[index] = newObject
      }
      onChange(index, { name: selected.name, value: selected.value.id })
    },
  })
)(ChatStepOption)
