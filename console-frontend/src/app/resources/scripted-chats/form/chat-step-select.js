import DeleteIcon from '@material-ui/icons/FindInPage'
import React from 'react'
import styled from 'styled-components'
import withScripedChatsForm from './with-scripted-chats-form'
import { compose, withHandlers, withProps } from 'recompose'
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core'

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`

const ChatStepSelect = ({
  destinationChatStep,
  disabled,
  hasNewDestinationChatStep,
  persistedChatSteps,
  selectDestinationChatStep,
  selectValue,
  scrollToStep,
}) => (
  <SelectContainer>
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
    {destinationChatStep && (
      <IconButton aria-label="Find" onClick={() => scrollToStep(destinationChatStep)}>
        <DeleteIcon />
      </IconButton>
    )}
  </SelectContainer>
)

export default compose(
  withScripedChatsForm.consumer,
  withProps(({ chatOption }) => ({
    destinationChatStep: chatOption.destinationChatStepAttributes,
  })),
  withProps(({ destinationChatStep }) => ({
    hasNewDestinationChatStep: destinationChatStep && !destinationChatStep.id,
  })),
  withProps(({ chatOption, hasNewDestinationChatStep, destinationChatStep, persistedChatSteps }) => {
    const chatStep = chatOption.destinationChatStepId
      ? persistedChatSteps.find(e => e.id === chatOption.destinationChatStepId)
      : undefined
    return {
      selectValue: chatStep ? chatStep['__index'] : hasNewDestinationChatStep ? destinationChatStep.__index : '',
    }
  }),
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
