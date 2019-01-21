import ChatMessage from './chat-message'
import ChatOption from './chat-option'
import React from 'react'
import Section from 'shared/section'
import { AddItemButton, FormSection } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { compose, withHandlers } from 'recompose'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableChatMessage = SortableElement(ChatMessage)
const ChatMessages = ({ isFormLoading, chatStep, chatStepType, setChatMessageForm }) => (
  <div>
    {chatStep.chatMessagesAttributes.map((chatMessage, index) => (
      <SortableChatMessage
        allowDelete={chatStep.chatMessagesAttributes.length > 1}
        chatMessage={chatMessage}
        chatStepType={chatStepType}
        index={index}
        isFormLoading={isFormLoading}
        key={chatMessage.id || `new-${index}`}
        onChange={setChatMessageForm}
        sortIndex={index}
      />
    ))}
  </div>
)
const ChatMessagesContainer = SortableContainer(ChatMessages)

const SortableChatOption = SortableElement(ChatOption)
const ChatOptions = ({
  chatStep,
  addAction,
  addChatMessage,
  chatStepType,
  deleteAction,
  onChange,
  isFormLoading,
  setChatOptionForm,
}) => (
  <div>
    {chatStep.chatOptionsAttributes.map((chatOption, index) => (
      <SortableChatOption
        addAction={addAction}
        addChatMessage={addChatMessage}
        chatOption={chatOption}
        chatStepType={chatStepType}
        deleteAction={deleteAction}
        editChatStepAttribute={onChange}
        folded={chatOption.id}
        index={index}
        isFormLoading={isFormLoading}
        key={chatOption.id || `new-${index}`}
        onChange={setChatOptionForm}
        sortIndex={index}
      />
    ))}
  </div>
)
const ChatOptionsContainer = SortableContainer(ChatOptions)

const ChatStep = ({
  addChatMessage,
  deleteAction,
  index,
  isFormLoading,
  addChatOption,
  chatStep,
  setChatMessageForm,
  setChatOptionForm,
  onChange,
  onChatMessagesSortEnd,
  onChatOptionsSortEnd,
  chatStepType,
  addAction,
}) => (
  <Section>
    <FormSection foldable folded={chatStep.id} hideTop title={`Step #${index + 1}`}>
      <div style={{ marginTop: '-1px' }}>
        <FormSection foldable title="Messages">
          {chatStep.chatMessagesAttributes && (
            <ChatMessagesContainer
              chatStep={chatStep}
              chatStepType={chatStepType}
              helperClass="sortable-element"
              onSortEnd={onChatMessagesSortEnd}
              setChatMessageForm={setChatMessageForm}
              useDragHandle
            />
          )}
          <AddItemButton disabled={isFormLoading} message="Add Message" onClick={addChatMessage} />
        </FormSection>
      </div>
      {chatStep.chatOptionsAttributes && (
        <div style={{ marginTop: '24px' }}>
          <FormSection foldable title="Options">
            {chatStep.chatOptionsAttributes && (
              <ChatOptionsContainer
                addAction={addAction}
                chatStep={chatStep}
                chatStepType={chatStepType}
                deleteAction={deleteAction}
                helperClass="sortable-element"
                onChange={onChange}
                onSortEnd={onChatOptionsSortEnd}
                setChatOptionForm={setChatOptionForm}
                useDragHandle
              />
            )}
            <AddItemButton disabled={isFormLoading} message="Add Option" onClick={addChatOption} />
          </FormSection>
        </div>
      )}
    </FormSection>
  </Section>
)

export default compose(
  withHandlers({
    setChatMessageForm: ({ onChange, chatStep }) => (chatMessage, chatMessageIndex) => {
      let newChatMessagesAttributes = [...chatStep.chatMessagesAttributes]
      newChatMessagesAttributes[chatMessageIndex] = chatMessage
      onChange({ ...chatStep, chatMessagesAttributes: newChatMessagesAttributes })
    },
    addChatMessage: ({ onChange, chatStep }) => () => {
      onChange({
        ...chatStep,
        chatMessagesAttributes: [
          ...chatStep.chatMessagesAttributes,
          {
            text: '',
          },
        ],
      })
    },
    addChatOption: ({ onChange, chatStep }) => () => {
      onChange({
        ...chatStep,
        chatOptionsAttributes: [
          ...chatStep.chatOptionsAttributes,
          {
            text: '',
            destinationChatStepId: '',
          },
        ],
      })
    },
    setChatOptionForm: ({ onChange, chatStep }) => (chatOption, chatOptionIndex) => {
      let newChatOptionsAttributes = [...chatStep.chatOptionsAttributes]
      newChatOptionsAttributes[chatOptionIndex] = chatOption
      onChange({ ...chatStep, chatOptionsAttributes: newChatOptionsAttributes })
    },
    onChatMessagesSortEnd: ({ onChange, index, chatStep }) => ({ oldIndex, newIndex }) => {
      const orderedChatMessages = arrayMove(chatStep.chatMessagesAttributes, oldIndex, newIndex)
      onChange({ ...chatStep, chatMessagesAttributes: orderedChatMessages }, index)
    },
    onChatOptionsSortEnd: ({ onChange, index, chatStep }) => ({ oldIndex, newIndex }) => {
      const orderedChatOptions = arrayMove(chatStep.chatOptionsAttributes, oldIndex, newIndex)
      onChange({ ...chatStep, chatOptionsAttributes: orderedChatOptions }, index)
    },
  })
)(ChatStep)
