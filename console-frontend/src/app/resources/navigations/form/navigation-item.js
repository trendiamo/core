import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { FormHelperText, TextField } from '@material-ui/core'
import { Reorder as ReorderIcon } from '@material-ui/icons'
import { SortableHandle } from 'react-sortable-hoc'

const StyledReorderIcon = styled(ReorderIcon)`
  cursor: ns-resize;
  color: rgba(0, 0, 0, 0.54);
  margin-right: 1rem;
`

const DragHandle = SortableHandle(() => <StyledReorderIcon />)

const NavigationItem = ({
  allowDelete,
  deleteNavigationItem,
  editNavigationItemValue,
  isCropping,
  isFormLoading,
  index,
  navigationItem,
  progress,
  setPictureUrl,
  setPicture,
  setIsCropping,
}) => (
  <Section>
    <FormSection
      actions={
        allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteNavigationItem} />
      }
      dragHandle={<DragHandle />}
      foldable
      folded
      hideTop
      title={`Navigation Item #${index + 1}`}
    >
      <TextField
        disabled={isCropping || isFormLoading}
        fullWidth
        label="Url"
        margin="normal"
        name="navigationItem_url"
        onChange={editNavigationItemValue}
        required
        value={navigationItem.url}
      />
      <FormHelperText>
        {
          'Use the whole url, eg: https://www.example.com/page1 - you can test it by clicking on the item in the preview.'
        }
      </FormHelperText>
      <TextField
        disabled={isCropping || isFormLoading}
        fullWidth
        label="Text"
        margin="normal"
        name="navigationItem_text"
        onChange={editNavigationItemValue}
        required
        value={navigationItem.text}
      />
      <PictureUploader
        disabled={isCropping}
        label="Picture"
        onChange={setPictureUrl}
        required
        setDisabled={setIsCropping}
        setPic={setPicture}
        square
        value={navigationItem.picUrl}
      />
      {progress && <ProgressBar progress={progress} />}
    </FormSection>
  </Section>
)

export default compose(
  branch(({ navigationItem }) => navigationItem._destroy, renderNothing),
  withState('progress', 'setProgress', null),
  withHandlers({
    editNavigationItemValue: ({ navigationItem, index, onChange }) => event => {
      const name = event.target.name.replace('navigationItem_', '')
      navigationItem[name] = event.target.value
      onChange(navigationItem, index)
    },
    deleteNavigationItem: ({ navigationItem, index, onChange }) => () => {
      onChange(
        {
          id: navigationItem.id,
          _destroy: true,
        },
        index
      )
    },
    setPictureUrl: ({ index, navigationItem, onChange }) => picUrl => {
      onChange({ ...navigationItem, picUrl }, index)
    },
    setPicture: ({ index, setPicture, setProgress }) => blob => {
      setPicture(index, blob, setProgress)
    },
  })
)(NavigationItem)
