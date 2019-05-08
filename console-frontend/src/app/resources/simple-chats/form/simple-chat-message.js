import React from 'react'
import TextMessageFields from './text-message-fields'
import { branch, compose, renderNothing, shouldUpdate, withHandlers } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { isEqual, omit } from 'lodash'
import { InputLabel as Label } from '@material-ui/core'

const SimpleChatMessage = ({
  allowDelete,
  deleteSimpleChatMessage,
  index,
  isFormLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  onChange,
}) => (
  <FormSection
    actions={
      allowDelete && (
        <Cancel disabled={isFormLoading} index={simpleChatMessageIndex} onClick={deleteSimpleChatMessage} />
      )
    }
    backgroundColor="#fff"
    dragHandle
    ellipsize
    foldable
    hideBottom
    hideTop={index === 0}
    title={simpleChatMessage.id ? simpleChatMessage.text : 'New Message'}
  >
    <Label required style={{ fontSize: '12px' }}>
      {'Message'}
    </Label>
    <TextMessageFields
      disabled={isFormLoading}
      name="simpleChatMessage_text"
      onChange={onChange}
      simpleChatMessage={simpleChatMessage}
      simpleChatMessageIndex={simpleChatMessageIndex}
    />
  </FormSection>
)

export default compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
  branch(({ simpleChatMessage }) => simpleChatMessage._destroy, renderNothing),
  withHandlers({
    deleteSimpleChatMessage: ({ simpleChatMessage, simpleChatMessageIndex, onChange }) => () => {
      onChange(
        {
          id: simpleChatMessage.id,
          _destroy: true,
        },
        simpleChatMessageIndex
      )
    },
  })
)(SimpleChatMessage)
