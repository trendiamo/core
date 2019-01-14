import React from 'react'
import withScripedChatsForm from './with-scripted-chats-form'
import { compose, withHandlers, withProps } from 'recompose'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const ChatStepSelect = ({
  destinationChatStep,
  disabled,
  hasNewDestinationChatStep,
  persistedChatSteps,
  selectDestinationChatStep,
  selectValue,
}) => (
  <FormControl disabled={disabled || hasNewDestinationChatStep} fullWidth margin="normal">
    <InputLabel shrink>{'Next Step *'}</InputLabel>
    <Select disabled={disabled} displayEmpty onChange={selectDestinationChatStep} value={selectValue}>
      <MenuItem disabled value="">
        {'Choose the next step...'}
      </MenuItem>
      {persistedChatSteps.map(chatStep => (
        <MenuItem key={chatStep.__index} value={chatStep.__index}>{`Step #${chatStep.__index + 1}`}</MenuItem>
      ))}
      {hasNewDestinationChatStep && (
        <MenuItem
          key={destinationChatStep.__index}
          value={destinationChatStep.__index}
        >{`Step #${destinationChatStep.__index + 1}`}</MenuItem>
      )}
      <MenuItem value="newChatStep">{'Add step...'}</MenuItem>
    </Select>
  </FormControl>
)

export default compose(
  withScripedChatsForm.consumer,
  withProps(({ chatOption }) => ({
    destinationChatStep: chatOption.destinationChatStepAttributes,
  })),
  withProps(({ destinationChatStep }) => ({
    hasNewDestinationChatStep: destinationChatStep && !destinationChatStep.id,
  })),
  withProps(({ chatOption, hasNewDestinationChatStep, destinationChatStep, persistedChatSteps }) => ({
    selectValue: chatOption.destinationChatStepId
      ? persistedChatSteps.find(e => e.id === chatOption.destinationChatStepId)['__index']
      : hasNewDestinationChatStep
      ? destinationChatStep.__index
      : '',
  })),
  withHandlers({
    getNewChatStep: ({ chatOption, addNewChatStep }) => () => {
      const newChatOption = {
        ...chatOption,
        destinationChatStepAttributes: addNewChatStep(),
      }
      delete newChatOption.destinationChatStepId
      return newChatOption
    },
    getPersistedChatStep: ({ chatOption, persistedChatSteps }) => chatStepIndex => {
      const chatStep = { ...persistedChatSteps[chatStepIndex] }
      const newChatOption = {
        ...chatOption,
        destinationChatStepId: chatStep.id,
      }
      delete newChatOption.destinationChatStepAttributes
      return newChatOption
    },
  }),
  withHandlers({
    selectDestinationChatStep: ({ index, onChange, getNewChatStep, getPersistedChatStep }) => (_i, { props }) => {
      const newChatOption = props.value === 'newChatStep' ? getNewChatStep() : getPersistedChatStep(props.value)
      onChange(newChatOption, index)
    },
  })
)(ChatStepSelect)
