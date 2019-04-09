import React from 'react'
import { branch, compose, renderNothing, shouldUpdate, withHandlers } from 'recompose'
import { Cancel, Field, FormSection, HelperText } from 'shared/form-elements'
import { isEqual, omit } from 'lodash'

const SimpleChatMessage = ({
  allowDelete,
  deleteSimpleChatMessage,
  index,
  isFormLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  onFocus,
  editSimpleChatMessageValue,
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
    <Field
      disabled={isFormLoading}
      fullWidth
      inputProps={{ pattern: '.*\\S+.*' }}
      label="Message"
      margin="normal"
      name="simpleChatMessage_text"
      onChange={editSimpleChatMessageValue}
      onFocus={onFocus}
      required
      value={simpleChatMessage.text}
    />
    <HelperText>
      {'ℹ️ You can format text using '}
      <a href="https://www.markdownguide.org/cheat-sheet" rel="noopener noreferrer" target="_blank">
        {'markdown'}
      </a>
      {'. If you just paste a youtube link, the video will be shown.'}
    </HelperText>
  </FormSection>
)

export default compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
  branch(({ simpleChatMessage }) => simpleChatMessage._destroy, renderNothing),
  withHandlers({
    editSimpleChatMessageValue: ({ simpleChatMessage, simpleChatMessageIndex, onChange }) => event => {
      const name = event.target.name.replace('simpleChatMessage_', '')
      onChange(Object.assign({}, simpleChatMessage, { [name]: event.target.value }), simpleChatMessageIndex)
    },
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
