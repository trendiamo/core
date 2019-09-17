import Button from 'shared/button'
import CircularProgress from 'app/layout/loading'
import Dialog from 'shared/dialog'
import FileUploader from 'shared/file-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { DialogActionsContainer, StyledButton } from './shared'
import { Input } from '@material-ui/core'
import { Link as LinkIcon } from '@material-ui/icons'
import { showUpToUsBranding } from 'utils'

const UrlInputContainer = styled.div`
  margin: 1.5rem 6rem;
  border-radius: 3px;
  background-color: ${showUpToUsBranding() ? '#e7ecef' : '#f5f5f5'};
  display: flex;
  overflow: hidden;
  height: 56px;
  transition: all 200ms;
  border: 2px solid ${({ isFocused }) => (isFocused ? (showUpToUsBranding() ? '#0f7173' : '#ff6641') : 'transparent')};
`

const UrlInput = styled(Input)`
  border-radius: 4px;
  padding-left: 16px;
  width: 100%;
`

const UrlIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 56px;
`

const UrlIcon = styled(LinkIcon)`
  width: 24px;
  height: 24px;
`

const DialogContentUrlUpload = ({ isImageLoading, resource, setImageUrl }) => {
  const [isFocused, setIsFocused] = useState(null)

  const onChange = useCallback(
    event => {
      setImageUrl(event.target.value)
    },
    [setImageUrl]
  )

  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  return (
    <>
      <UrlInputContainer isFocused={isFocused}>
        <UrlInput
          autoFocus
          disableUnderline
          fullWidth
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={`Paste the URL of the ${resource} to upload:`}
        />
        <UrlIconContainer>
          <UrlIcon />
        </UrlIconContainer>
      </UrlInputContainer>
      {isImageLoading && <CircularProgress />}
    </>
  )
}

const DialogActionsUrlUpload = ({ handleClose, onCancelUrlUpload, onDoneUrlUpload, onFileUpload }) => (
  <DialogActionsContainer style={{ justifyContent: 'space-between' }}>
    <div style={{ display: 'flex' }}>
      <StyledButton color="secondaryText" onClick={onCancelUrlUpload}>
        {'Back to gallery'}
      </StyledButton>
      <StyledButton color="secondaryText" onClick={handleClose} withUploader>
        <FileUploader accept="image/*" content="Upload from device" name="file-uploader" onChange={onFileUpload} />
      </StyledButton>
    </div>
    <Button color="primaryGradient" onClick={onDoneUrlUpload}>
      {'Done'}
    </Button>
  </DialogActionsContainer>
)

const UrlUploadDialog = ({
  handleClose,
  isImageLoading,
  onCancelUrlUpload,
  onDoneUrlUpload,
  onFileUpload,
  onKeyUp,
  open,
  setImageUrl,
  type,
}) => {
  const resource = useMemo(() => (type === 'animationsModal' ? 'animation' : 'image'), [type])

  return (
    <Dialog
      content={<DialogContentUrlUpload isImageLoading={isImageLoading} resource={resource} setImageUrl={setImageUrl} />}
      dialogActions={
        <DialogActionsUrlUpload
          onCancelUrlUpload={onCancelUrlUpload}
          onDoneUrlUpload={onDoneUrlUpload}
          onFileUpload={onFileUpload}
        />
      }
      fullWidth
      handleClose={handleClose}
      maxWidth="lg"
      onKeyUp={onKeyUp}
      open={open}
      title={`Upload ${resource} from URL:`}
    />
  )
}

export default UrlUploadDialog
