import React from 'react'
import TextMessageFields from './text-message-fields'
import VideoMessageField from './video-message-field'
import { branch, compose, lifecycle, renderNothing, shouldUpdate, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { extractJson, extractYoutubeId } from 'plugin-base'
import { isEqual, omit } from 'lodash'

const SimpleChatMessage = ({
  allowDelete,
  deleteSimpleChatMessage,
  index,
  isFormLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  messageType,
  onChange,
  onFocus,
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
    {messageType === 'video' ? (
      <VideoMessageField
        isFormLoading={isFormLoading}
        name="simpleChatMessage_text"
        onChange={onChange}
        onFocus={onFocus}
        simpleChatMessage={simpleChatMessage}
        simpleChatMessageIndex={simpleChatMessageIndex}
      />
    ) : (
      <TextMessageFields
        disabled={isFormLoading}
        name="simpleChatMessage_text"
        onChange={onChange}
        simpleChatMessage={simpleChatMessage}
        simpleChatMessageIndex={simpleChatMessageIndex}
      />
    )}
  </FormSection>
)

export default compose(
  withState('messageType', 'setMessageType', null),
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
  }),
  lifecycle({
    componentDidMount() {
      const { simpleChatMessage, simpleChatMessageType, setMessageType } = this.props
      if (simpleChatMessageType) return setMessageType(simpleChatMessageType)
      const videoData = extractYoutubeId(simpleChatMessage.text)
      const productData = !videoData && extractJson(simpleChatMessage.text)
      setMessageType(videoData ? 'video' : productData ? 'product' : 'text')
    },
  })
)(SimpleChatMessage)
