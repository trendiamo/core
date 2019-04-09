import React from 'react'
import Section from 'shared/section'
import SimpleChatMessage from './simple-chat-message'
import { AddItemButton, Cancel, Field, FormSection } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderNothing, shallowEqual, shouldUpdate, withHandlers } from 'recompose'
import { isEqual, omit } from 'lodash'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSimpleChatMessage = compose(
  shouldUpdate((props, nextProps) => {
    return (
      props.isFormLoading !== nextProps.isFormLoading ||
      props.index !== nextProps.index ||
      props.allowDelete !== nextProps.allowDelete ||
      !shallowEqual(props.simpleChatMessage, nextProps.simpleChatMessage)
    )
  })
)(SortableElement(SimpleChatMessage))

const SimpleChatMessages = ({ allowDelete, simpleChatMessages, onChange, onFocus }) => (
  <div>
    {simpleChatMessages.map((simpleChatMessage, index) => (
      <SortableSimpleChatMessage
        allowDelete={allowDelete}
        index={index}
        key={simpleChatMessage.id || `simple-chat-message${index}`}
        onChange={onChange}
        onFocus={onFocus}
        simpleChatMessage={simpleChatMessage}
        simpleChatMessageIndex={index}
      />
    ))}
  </div>
)

const SimpleChatMessagesContainer = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onSortEnd', 'onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  })
)(SortableContainer(SimpleChatMessages))

const SimpleChatStep = ({
  addSimpleChatMessage,
  allowDelete,
  collapseOtherSimpleChatSteps,
  deleteSimpleChatStep,
  editSimpleChatStepValue,
  isFormLoading,
  folded,
  simpleChatStepIndex,
  setSimpleChatMessagesForm,
  simpleChatStep,
  onSimpleChatMessagesSortEnd,
}) => (
  <Section>
    <FormSection
      actions={
        allowDelete && <Cancel disabled={isFormLoading} index={simpleChatStepIndex} onClick={deleteSimpleChatStep} />
      }
      dragHandle
      ellipsize
      foldable
      folded={folded}
      hideTop
      title={
        simpleChatStepIndex === 0 ? 'Initial Step' : simpleChatStep.id ? `Step: ${simpleChatStep.key}` : 'New Option'
      }
    >
      <>
        {simpleChatStep.key !== 'default' && (
          <Field
            disabled={isFormLoading}
            fullWidth
            inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
            label="Option"
            margin="normal"
            name="simpleChatStep_key"
            onChange={editSimpleChatStepValue}
            onFocus={collapseOtherSimpleChatSteps}
            required
            value={simpleChatStep.key}
          />
        )}
        {simpleChatStep.simpleChatMessagesAttributes && (
          <SimpleChatMessagesContainer
            allowDelete={simpleChatStep.simpleChatMessagesAttributes.length > 1}
            helperClass="sortable-element"
            isFormLoading={isFormLoading}
            onChange={setSimpleChatMessagesForm}
            onFocus={collapseOtherSimpleChatSteps}
            onSortEnd={onSimpleChatMessagesSortEnd}
            simpleChatMessages={simpleChatStep.simpleChatMessagesAttributes}
            useDragHandle
          />
        )}
        <AddItemButton disabled={isFormLoading} message="Add Message" onClick={addSimpleChatMessage} />
      </>
    </FormSection>
  </Section>
)

export default compose(
  branch(({ simpleChatStep }) => simpleChatStep._destroy, renderNothing),
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
  withHandlers({
    editSimpleChatStepValue: ({ simpleChatStep, simpleChatStepIndex, onChange }) => event => {
      const name = event.target.name.replace('simpleChatStep_', '')
      onChange(Object.assign({ ...simpleChatStep }, { [name]: event.target.value }), simpleChatStepIndex)
    },
    setSimpleChatMessagesForm: ({ simpleChatStep, simpleChatStepIndex, onChange }) => (
      simpleChatMessage,
      simpleChatMessageIndex
    ) => {
      let newSimpleChatMessagesAttributes = [...simpleChatStep.simpleChatMessagesAttributes]
      newSimpleChatMessagesAttributes[simpleChatMessageIndex] = simpleChatMessage
      onChange(
        { ...simpleChatStep, simpleChatMessagesAttributes: newSimpleChatMessagesAttributes },
        simpleChatStepIndex
      )
    },
    addSimpleChatMessage: ({ onChange, simpleChatStepIndex, simpleChatStep }) => () => {
      onChange(
        {
          ...simpleChatStep,
          simpleChatMessagesAttributes: simpleChatStep.simpleChatMessagesAttributes
            ? [...simpleChatStep.simpleChatMessagesAttributes, { text: '' }]
            : [{ text: '' }],
        },
        simpleChatStepIndex
      )
    },
    deleteSimpleChatStep: ({ onChange, simpleChatStepIndex, simpleChatStep }) => () => {
      onChange(
        {
          id: simpleChatStep.id,
          _destroy: true,
        },
        simpleChatStepIndex
      )
    },
    onSimpleChatMessagesSortEnd: ({ onChange, simpleChatStepIndex, simpleChatStep }) => ({ oldIndex, newIndex }) => {
      const orderedSimpleChatMessages = arrayMove(simpleChatStep.simpleChatMessagesAttributes, oldIndex, newIndex)
      onChange({ ...simpleChatStep, simpleChatMessagesAttributes: orderedSimpleChatMessages }, simpleChatStepIndex)
    },
  })
)(SimpleChatStep)
