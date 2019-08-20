import React from 'react'
import SimpleChatMessage from './simple-chat-message'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSimpleChatMessage = SortableElement(SimpleChatMessage)

const SimpleChatMessages = ({
  activeSimpleChatMessages,
  allowDelete,
  isCropping,
  isUploaderLoading,
  onChange,
  onFocus,
  onSortEnd,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatSection,
}) => (
  <SortableContainer onSortEnd={onSortEnd}>
    {simpleChatSection.simpleChatMessagesAttributes.map((simpleChatMessage, index) =>
      simpleChatMessage._destroy ? null : (
        <SortableSimpleChatMessage
          activeSimpleChatMessages={activeSimpleChatMessages}
          allowDelete={allowDelete}
          index={index}
          isCropping={isCropping}
          isUploaderLoading={isUploaderLoading}
          key={simpleChatMessage.id || simpleChatMessage.__key}
          onChange={onChange}
          onFocus={onFocus}
          setIsCropping={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={index}
          simpleChatSection={simpleChatSection}
        />
      )
    )}
  </SortableContainer>
)

export default SimpleChatMessages
