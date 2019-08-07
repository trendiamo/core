import omit from 'lodash.omit'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import SimpleChatMessagesContainer from './simple-chat-messages'
import styled from 'styled-components'
import { AddItemButton, Cancel, Field, FormSection } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { atLeastOneNonBlankCharInputProps } from 'utils'
import { Menu, MenuItem as MUIMenuItem } from '@material-ui/core'
import { MessageOutlined, OndemandVideo, PhotoLibrary, Redeem } from '@material-ui/icons'

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

const ImageIcon = styled(PhotoLibrary)`
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

const SimpleChatSection = ({
  allowDelete,
  collapseOtherSimpleChatSections,
  folded,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onChange,
  onToggleContent,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatSection,
  simpleChatSectionIndex,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const deleteSimpleChatSection = useCallback(
    () => onChange({ id: simpleChatSection.id, _destroy: true }, simpleChatSectionIndex),
    [onChange, simpleChatSection.id, simpleChatSectionIndex]
  )

  const editSimpleChatSectionValue = useCallback(
    event => {
      const name = event.target.name.replace('simpleChatSection_', '')
      onChange(Object.assign({ ...simpleChatSection }, { [name]: event.target.value }), simpleChatSectionIndex)
    },
    [onChange, simpleChatSection, simpleChatSectionIndex]
  )

  const activeSimpleChatMessages = useMemo(
    () =>
      simpleChatSection.simpleChatMessagesAttributes &&
      simpleChatSection.simpleChatMessagesAttributes.filter(simpleChatMessage => !simpleChatMessage._destroy),
    [simpleChatSection.simpleChatMessagesAttributes]
  )

  const onAddMessageClick = useCallback(event => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onSimpleChatMessagesSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const orderedSimpleChatMessages = arrayMove(simpleChatSection.simpleChatMessagesAttributes, oldIndex, newIndex)
      onChange(
        { ...simpleChatSection, simpleChatMessagesAttributes: orderedSimpleChatMessages },
        simpleChatSectionIndex
      )
    },
    [onChange, simpleChatSection, simpleChatSectionIndex]
  )

  const setSimpleChatMessagesForm = useCallback(
    (simpleChatMessage, simpleChatMessageIndex) => {
      const newSimpleChatMessagesAttributes = [...simpleChatSection.simpleChatMessagesAttributes]
      if (simpleChatMessage.id || !simpleChatMessage._destroy) {
        newSimpleChatMessagesAttributes[simpleChatMessageIndex] = simpleChatMessage
      } else {
        newSimpleChatMessagesAttributes.splice(simpleChatMessageIndex, 1)
      }

      onChange(
        { ...simpleChatSection, simpleChatMessagesAttributes: newSimpleChatMessagesAttributes },
        simpleChatSectionIndex
      )
    },
    [onChange, simpleChatSection, simpleChatSectionIndex]
  )

  const addSimpleChatMessage = useCallback(
    messageType => {
      closeMenu()
      const simpleChatMessageObject =
        messageType === 'SimpleChatTextMessage'
          ? { html: '' }
          : messageType === 'SimpleChatProductMessage'
          ? { title: '', img: { url: '' }, imgRect: {}, url: '', displayPrice: '', groupWithAdjacent: false }
          : messageType === 'SimpleChatVideoMessage'
          ? { videoUrl: '' }
          : { img: { url: '' }, imgRect: {}, groupWithAdjacent: false }
      onChange(
        {
          ...simpleChatSection,
          simpleChatMessagesAttributes: [
            ...simpleChatSection.simpleChatMessagesAttributes,
            {
              ...simpleChatMessageObject,
              type: messageType,
              __key: `new-${simpleChatSection.simpleChatMessagesAttributes.length}`,
            },
          ],
        },
        simpleChatSectionIndex
      )
    },
    [closeMenu, onChange, simpleChatSection, simpleChatSectionIndex]
  )

  const onFocus = useCallback(() => onToggleContent(true) && collapseOtherSimpleChatSections, [
    collapseOtherSimpleChatSections,
    onToggleContent,
  ])

  if (simpleChatSection._destroy) return null

  return (
    <Section>
      <FormSection
        actions={
          allowDelete && (
            <Cancel
              disabled={isCropping || isFormLoading || isUploaderLoading}
              index={simpleChatSectionIndex}
              onClick={deleteSimpleChatSection}
            />
          )
        }
        dragHandle
        ellipsize
        foldable
        folded={folded}
        hideTop
        title={
          simpleChatSectionIndex === 0
            ? 'Starting Section'
            : simpleChatSection.id
            ? `Section: ${simpleChatSection.key}`
            : 'New Section'
        }
      >
        <>
          {simpleChatSection.key !== 'default' && (
            <Field
              autoFocus={simpleChatSectionIndex > 0 && !simpleChatSection.id}
              disabled={isCropping || isFormLoading || isUploaderLoading}
              fullWidth
              inputProps={atLeastOneNonBlankCharInputProps}
              label="Button Text"
              margin="normal"
              name="simpleChatSection_key"
              onChange={editSimpleChatSectionValue}
              onFocus={onFocus}
              required
              value={simpleChatSection.key}
            />
          )}
          {simpleChatSection.simpleChatMessagesAttributes && (
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
              simpleChatSection={simpleChatSection}
              useDragHandle
            />
          )}
          <StyledAddItemButton
            adjustMargin={
              !simpleChatSection.simpleChatMessagesAttributes ||
              simpleChatSection.simpleChatMessagesAttributes.every(message => message._destroy)
            }
            aria-haspopup="true"
            aria-owns={anchorEl ? 'new-message-menu' : undefined}
            disabled={isFormLoading || isUploaderLoading}
            message="Add Item"
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
              {'Message'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatProductMessage">
              <ProductIcon />
              {'Product'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatImageMessage">
              <ImageIcon />
              {'Image'}
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

export default SimpleChatSection
