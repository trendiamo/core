import isEqual from 'lodash.isequal'
import omit from 'lodash.omit'
import React from 'react'
import SimpleChatStep from './simple-chat-step'
import { compose, shallowEqual, shouldUpdate } from 'recompose'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const SortableSimpleChatStep = compose(
  shouldUpdate((props, nextProps) => {
    return !shallowEqual(props, nextProps) || !shallowEqual(props.simpleChatStep, nextProps.simpleChatStep)
  })
)(SortableElement(SimpleChatStep))

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

const SimpleChatStepsContainer = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onSortEnd', 'onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  })
)(SortableContainer(SimpleChatSteps))

export default SimpleChatStepsContainer
