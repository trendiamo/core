import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import Section from 'shared/section'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose'
import { Cancel, Field, FormSection, HelperText } from 'shared/form-elements'

const NavigationItem = ({
  allowDelete,
  deleteNavigationItem,
  editNavigationItemValue,
  isCropping,
  isFormLoading,
  index,
  folded,
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
      dragHandle
      ellipsize
      foldable
      folded={folded}
      hideTop
      title={navigationItem.id ? navigationItem.text : 'New Navigation Item'}
    >
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Url"
        margin="normal"
        name="navigationItem_url"
        onChange={editNavigationItemValue}
        required
        type="URL"
        value={navigationItem.url}
      />
      <HelperText>
        {
          'Use the whole url, eg: https://www.example.com/page1 - you can test it by clicking on the item in the preview.'
        }
      </HelperText>
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
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
      onChange(Object.assign({}, navigationItem, { [name]: event.target.value }), index)
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
