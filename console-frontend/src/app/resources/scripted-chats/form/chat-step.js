import ChatMessage from './chat-message'
import ChatOption from './chat-option'
import React from 'react'
import Section from 'shared/section'
import { AddItemButton, FormSection } from 'shared/form-elements'
import { compose, withHandlers } from 'recompose'

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
  chatStepType,
  addAction,
}) => (
  <Section>
    <FormSection foldable folded hideTop title={`Step #${index + 1}`}>
      <div style={{ marginTop: '-1px' }}>
        <FormSection foldable title="Messages">
          {chatStep.chatMessagesAttributes.map((chatMessage, chatMessageIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={chatMessageIndex}>
              <ChatMessage
                allowDelete={chatStep.chatMessagesAttributes.length > 1}
                chatMessage={chatMessage}
                chatStepType={chatStepType}
                index={chatMessageIndex}
                isFormLoading={isFormLoading}
                onChange={setChatMessageForm}
              />
            </React.Fragment>
          ))}
          <AddItemButton disabled={isFormLoading} message="Add Message" onClick={addChatMessage} />
        </FormSection>
      </div>
      {chatStep.chatOptionsAttributes && (
        <div style={{ marginTop: '24px' }}>
          <FormSection foldable title="Options">
            {chatStep.chatOptionsAttributes.map((chatOption, chatOptionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={chatOptionIndex}>
                <ChatOption
                  addAction={addAction}
                  addChatMessage={addChatMessage}
                  chatOption={chatOption}
                  chatStepType={chatStepType}
                  deleteAction={deleteAction}
                  editChatStepAttribute={onChange}
                  index={chatOptionIndex}
                  isFormLoading={isFormLoading}
                  onChange={setChatOptionForm}
                />
              </React.Fragment>
            ))}
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
  })
)(ChatStep)
