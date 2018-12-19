import Label from 'shared/label'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import Section from 'shared/section'
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { Grid, TextField } from '@material-ui/core'

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
      foldable
      hideTop
      title={`Navigation Item #${index + 1}`}
    >
      <Grid item sm={6}>
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
        <Label>{'Picture'}</Label>
        <PictureUploader
          disabled={isCropping}
          onChange={setPictureUrl}
          setDisabled={setIsCropping}
          setPic={setPicture}
          square
          value={navigationItem.picUrl}
        />
        {progress && <ProgressBar progress={progress} />}
      </Grid>
    </FormSection>
  </Section>
)

export default compose(
  branch(({ navigationItem }) => navigationItem._destroy, renderNothing),
  withState('progress', 'setProgress', null),
  withHandlers({
    editProductPickValue: ({ navigationItem, index, onChange }) => event => {
      const name = event.target.name.replace('navigationItem_', '')
      navigationItem[name] = event.target.value
      onChange(navigationItem, index)
    },
    deleteProductPick: ({ navigationItem, index, onChange }) => () => {
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
