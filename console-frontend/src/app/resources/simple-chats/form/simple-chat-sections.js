import React, { memo } from 'react'
import SimpleChatSection from './simple-chat-section'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSimpleChatSection = SortableElement(SimpleChatSection)

const SimpleChatSections = ({
  allowDelete,
  isCropping,
  isUploaderLoading,
  onChange,
  onToggleContent,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatSections,
}) => (
  <div>
    <SimpleChatSection
      allowDelete={false}
      isCropping={isCropping}
      isUploaderLoading={isUploaderLoading}
      onChange={onChange}
      onToggleContent={onToggleContent}
      setIsCropping={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      simpleChatSection={simpleChatSections[0]}
      simpleChatSectionIndex={0}
    />
    {simpleChatSections
      .slice(1)
      .map((simpleChatSection, index) =>
        simpleChatSection._destroy ? null : (
          <SortableSimpleChatSection
            allowDelete={allowDelete}
            index={index + 1}
            isCropping={isCropping}
            isUploaderLoading={isUploaderLoading}
            key={simpleChatSection.id || simpleChatSection.__key}
            onChange={onChange}
            onToggleContent={onToggleContent}
            setIsCropping={setIsCropping}
            setIsUploaderLoading={setIsUploaderLoading}
            simpleChatSection={simpleChatSection}
            simpleChatSectionIndex={index + 1}
          />
        )
      )}
  </div>
)

export default memo(SortableContainer(SimpleChatSections))
