import ClipboardInput from 'shared/clipboard-input'
import Dialog from 'shared/dialog'
import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'

const ContentContainer = styled.div`
  text-align: center;
`

const ContentBody = styled.div`
  margin-top: 10px;
`

const FilteredTypography = props => <Typography {...omit(props, ['fontSize', 'fontWeight'])} />

const StyledTypography = styled(FilteredTypography)`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: black;
`

const StyledClipboardInput = styled(ClipboardInput)`
  height: 40px;
  margin: 1.5rem;
`

const DialogContent = ({ url }) => (
  <ContentContainer>
    <StyledTypography fontSize="2.1rem" fontWeight="300">
      {'Share your link'}
    </StyledTypography>
    <StyledTypography fontSize="1.1rem" fontWeight="500">
      {"Your link is done. Let's share it?"}
    </StyledTypography>
    <StyledClipboardInput text={url} />
    <ContentBody>
      <Typography variant="body2">{'You can now share this url.'}</Typography>
    </ContentBody>
  </ContentContainer>
)

const DialogActions = ({ handleClose }) => (
  <Button color="primary" onClick={handleClose} variant="text">
    {'Done'}
  </Button>
)

const ModalUrlGenerator = ({ url, open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<DialogContent url={url} />}
      dialogActions={<DialogActions handleClose={handleClose} />}
      fullWidth
      handleClose={handleClose}
      maxWidth="sm"
      open={open}
      title=""
    />
  )
}

export default ModalUrlGenerator
