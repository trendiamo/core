import React, { memo } from 'react'
import SimpleChatStep from './simple-chat-step'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSimpleChatStep = SortableElement(SimpleChatStep)

const SimpleChatSteps = ({
  allowDelete,
  isCropping,
  onChange,
  onToggleContent,
  setIsCropping,
  setSimpleChatMessagesPictures,
  simpleChatMessagesPictures,
  simpleChatSteps,
}) => (
  <div>
    <SimpleChatStep
      allowDelete={false}
      isCropping={isCropping}
      onChange={onChange}
      onToggleContent={onToggleContent}
      setIsCropping={setIsCropping}
      setSimpleChatMessagesPictures={setSimpleChatMessagesPictures}
      simpleChatMessagesPictures={simpleChatMessagesPictures}
      simpleChatStep={simpleChatSteps[0]}
      simpleChatStepIndex={0}
    />
    {simpleChatSteps
      .slice(1)
      .map((simpleChatStep, index) =>
        simpleChatStep._destroy ? null : (
          <SortableSimpleChatStep
            allowDelete={allowDelete}
            index={index + 1}
            isCropping={isCropping}
            key={simpleChatStep.id || simpleChatStep.__key}
            onChange={onChange}
            onToggleContent={onToggleContent}
            setIsCropping={setIsCropping}
            setSimpleChatMessagesPictures={setSimpleChatMessagesPictures}
            simpleChatMessagesPictures={simpleChatMessagesPictures}
            simpleChatStep={simpleChatStep}
            simpleChatStepIndex={index + 1}
          />
        )
      )}
  </div>
)

export default memo(SortableContainer(SimpleChatSteps))
