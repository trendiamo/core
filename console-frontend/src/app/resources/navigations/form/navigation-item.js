import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { Cancel, Field, FormSection } from 'shared/form-elements'
import { FormHelperText } from '@material-ui/core'

const NavigationItem = ({
  allowDelete,
  isCropping,
  isFormLoading,
  index,
  onChange,
  folded,
  navigationItem,
  setIsCropping,
}) => {
  const [progress, setProgress] = useState(null)

  const editNavigationItemValue = useCallback(
    event => {
      const name = event.target.name.replace('navigationItem_', '')
      onChange(Object.assign({}, navigationItem, { [name]: event.target.value }), index)
    },
    [index, navigationItem, onChange]
  )

  const deleteNavigationItem = useCallback(
    () => {
      onChange(
        {
          id: navigationItem.id,
          _destroy: true,
        },
        index
      )
    },
    [index, navigationItem.id, onChange]
  )

  const setPictureUrl = useCallback(
    picUrl => {
      onChange({ ...navigationItem, picUrl }, index)
    },
    [index, navigationItem, onChange]
  )

  const setPicture = useCallback(
    blob => {
      setPicture(index, blob, setProgress)
    },
    [index]
  )

  if (navigationItem._destroy) return null

  return (
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
        <FormHelperText>
          {
            'Use the whole url, eg: https://www.example.com/page1 - you can test it by clicking on the item in the preview.'
          }
        </FormHelperText>
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
}

export default NavigationItem
