import React from 'react'
import SimpleChatStep from './simple-chat-step'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSimpleChatStep = SortableElement(SimpleChatStep)

const SimpleChatSteps = ({ allowDelete, simpleChatSteps, onChange, onToggleContent }) => (
  <div>
    <SimpleChatStep
      allowDelete={false}
      onChange={onChange}
      onToggleContent={onToggleContent}
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
            key={simpleChatStep.id || simpleChatStep.__key}
            onChange={onChange}
            onToggleContent={onToggleContent}
            simpleChatStep={simpleChatStep}
            simpleChatStepIndex={index + 1}
          />
        )
      )}
  </div>
)

const SimpleChatStepsContainer = SortableContainer(SimpleChatSteps)

export default SimpleChatStepsContainer
