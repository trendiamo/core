import omit from 'lodash.omit'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import SimpleChatMessage from './simple-chat-message'
import styled from 'styled-components'
import { AddItemButton, Cancel, Field, FormSection } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { atLeastOneNonBlankCharInputProps } from 'utils'
import { Menu, MenuItem as MUIMenuItem } from '@material-ui/core'
import { MessageOutlined, OndemandVideo, PhotoLibrary, Redeem } from '@material-ui/icons'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const StyledAddItemButton = styled(props => <AddItemButton {...omit(props, ['adjustMargin'])} />)`
  margin-bottom: -16px;
  ${({ adjustMargin }) => adjustMargin && 'margin-top: 16px;'}
`

const MessageIcon = styled(MessageOutlined)`
  font-size: 18px;
  margin-right: 6px;
`

const ProductIcon = styled(Redeem)`
  font-size: 18px;
  margin-right: 6px;
`

const PictureIcon = styled(PhotoLibrary)`
  font-size: 18px;
  margin-right: 6px;
`

const VideoIcon = styled(OndemandVideo)`
  font-size: 18px;
  margin-right: 6px;
`

const MenuItem = ({ children, onClick, value, ...props }) => {
  const addSimpleChatMessage = useCallback(() => onClick(value), [onClick, value])

  return (
    <MUIMenuItem {...props} onClick={addSimpleChatMessage}>
      {children}
    </MUIMenuItem>
  )
}

const StyledMenu = styled(Menu)`
  div:last-child {
    margin-top: 48px;
    width: 160px;
    transform-origin: top center !important;
    li {
      color: rgba(0, 0, 0, 0.8);
      font-size: 15px;
    }
  }
`

const SortableSimpleChatMessage = SortableElement(SimpleChatMessage)

const SimpleChatMessages = ({
  activeSimpleChatMessages,
  allowDelete,
  isCropping,
  isUploaderLoading,
  onChange,
  onFocus,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatMessages,
}) => (
  <div>
    {simpleChatMessages.map((simpleChatMessage, index) =>
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
        />
      )
    )}
  </div>
)

const SimpleChatMessagesContainer = SortableContainer(SimpleChatMessages)

const SimpleChatStep = ({
  allowDelete,
  collapseOtherSimpleChatSteps,
  folded,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onChange,
  onToggleContent,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatStep,
  simpleChatStepIndex,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const deleteSimpleChatStep = useCallback(
    () => onChange({ id: simpleChatStep.id, _destroy: true }, simpleChatStepIndex),
    [onChange, simpleChatStep.id, simpleChatStepIndex]
  )

  const editSimpleChatStepValue = useCallback(
    event => {
      const name = event.target.name.replace('simpleChatStep_', '')
      onChange(Object.assign({ ...simpleChatStep }, { [name]: event.target.value }), simpleChatStepIndex)
    },
    [onChange, simpleChatStep, simpleChatStepIndex]
  )

  const activeSimpleChatMessages = useMemo(
    () =>
      simpleChatStep.simpleChatMessagesAttributes &&
      simpleChatStep.simpleChatMessagesAttributes.filter(simpleChatMessage => !simpleChatMessage._destroy),
    [simpleChatStep.simpleChatMessagesAttributes]
  )

  const onAddMessageClick = useCallback(event => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onSimpleChatMessagesSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const orderedSimpleChatMessages = arrayMove(simpleChatStep.simpleChatMessagesAttributes, oldIndex, newIndex)
      onChange({ ...simpleChatStep, simpleChatMessagesAttributes: orderedSimpleChatMessages }, simpleChatStepIndex)
    },
    [onChange, simpleChatStep, simpleChatStepIndex]
  )

  const setSimpleChatMessagesForm = useCallback(
    (simpleChatMessage, simpleChatMessageIndex) => {
      const newSimpleChatMessagesAttributes = [...simpleChatStep.simpleChatMessagesAttributes]
      newSimpleChatMessagesAttributes[simpleChatMessageIndex] = simpleChatMessage
      onChange(
        { ...simpleChatStep, simpleChatMessagesAttributes: newSimpleChatMessagesAttributes },
        simpleChatStepIndex
      )
    },
    [onChange, simpleChatStep, simpleChatStepIndex]
  )

  const addSimpleChatMessage = useCallback(
    messageType => {
      closeMenu()
      const simpleChatMessageObject =
        messageType === 'SimpleChatTextMessage'
          ? { html: '' }
          : messageType === 'SimpleChatProductMessage'
          ? { title: '', picture: { url: '' }, picRect: {}, url: '', displayPrice: '', groupWithAdjacent: false }
          : messageType === 'SimpleChatVideoMessage'
          ? { videoUrl: '' }
          : { picture: { url: '' }, picRect: {}, groupWithAdjacent: false }
      onChange(
        {
          ...simpleChatStep,
          simpleChatMessagesAttributes: [
            ...simpleChatStep.simpleChatMessagesAttributes,
            {
              ...simpleChatMessageObject,
              type: messageType,
              __key: `new-${simpleChatStep.simpleChatMessagesAttributes.length}`,
            },
          ],
        },
        simpleChatStepIndex
      )
    },
    [closeMenu, onChange, simpleChatStep, simpleChatStepIndex]
  )

  const onFocus = useCallback(() => onToggleContent(true) && collapseOtherSimpleChatSteps, [
    collapseOtherSimpleChatSteps,
    onToggleContent,
  ])

  if (simpleChatStep._destroy) return null

  return (
    <Section>
      <FormSection
        actions={
          allowDelete && (
            <Cancel
              disabled={isCropping || isFormLoading || isUploaderLoading}
              index={simpleChatStepIndex}
              onClick={deleteSimpleChatStep}
            />
          )
        }
        dragHandle
        ellipsize
        foldable
        folded={folded}
        hideTop
        title={
          simpleChatStepIndex === 0 ? 'Initial Step' : simpleChatStep.id ? `Step: ${simpleChatStep.key}` : 'New Option'
        }
      >
        <>
          {simpleChatStep.key !== 'default' && (
            <Field
              disabled={isCropping || isFormLoading || isUploaderLoading}
              fullWidth
              inputProps={atLeastOneNonBlankCharInputProps}
              label="Option"
              margin="normal"
              name="simpleChatStep_key"
              onChange={editSimpleChatStepValue}
              onFocus={onFocus}
              required
              value={simpleChatStep.key}
            />
          )}
          {simpleChatStep.simpleChatMessagesAttributes && (
            <SimpleChatMessagesContainer
              activeSimpleChatMessages={activeSimpleChatMessages}
              allowDelete={activeSimpleChatMessages.length > 1}
              helperClass="sortable-element"
              isCropping={isCropping}
              isFormLoading={isFormLoading}
              isUploaderLoading={isUploaderLoading}
              onChange={setSimpleChatMessagesForm}
              onFocus={onFocus}
              onSortEnd={onSimpleChatMessagesSortEnd}
              setIsCropping={setIsCropping}
              setIsUploaderLoading={setIsUploaderLoading}
              simpleChatMessages={simpleChatStep.simpleChatMessagesAttributes}
              useDragHandle
            />
          )}
          <StyledAddItemButton
            adjustMargin={
              !simpleChatStep.simpleChatMessagesAttributes ||
              simpleChatStep.simpleChatMessagesAttributes.every(message => message._destroy)
            }
            aria-haspopup="true"
            aria-owns={anchorEl ? 'new-message-menu' : undefined}
            disabled={isFormLoading || isUploaderLoading}
            message="Add Message"
            onClick={onAddMessageClick}
          />
          <StyledMenu
            anchorEl={anchorEl}
            disableAutoFocusItem
            id="new-message-menu"
            onClose={closeMenu}
            open={Boolean(anchorEl)}
            transitionDuration={150}
          >
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatTextMessage">
              <MessageIcon />
              {'Text'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatProductMessage">
              <ProductIcon />
              {'Product'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatPictureMessage">
              <PictureIcon />
              {'Picture'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatVideoMessage">
              <VideoIcon />
              {'Video'}
            </MenuItem>
          </StyledMenu>
        </>
      </FormSection>
    </Section>
  )
}

export default SimpleChatStep
