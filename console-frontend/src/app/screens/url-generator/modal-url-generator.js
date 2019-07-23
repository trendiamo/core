import Dialog from 'shared/dialog'
import DoneIcon from '@material-ui/icons/Done'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { Button, Input, Tooltip, Typography } from '@material-ui/core'

const ContentContainer = styled.div`
  text-align: center;
`

const ContentBody = styled.div`
  margin-top: 10px;
`

const ResultDiv = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: ${({ isCopied }) => (isCopied ? theme.customPalette.success.main : 'rgba(239, 239, 242)')};
  margin: 1.5rem;
  border-radius: 3px;
  display: flex;
  overflow: hidden;
`

const FilteredStyledButton = props => <Button {...omit(props, ['isCopied'])} />

const CopyButton = styled(FilteredStyledButton)`
  border-radius: 0;
  box-shadow: none;
  background-color: ${({ isCopied }) => isCopied && theme.customPalette.success.main};
  &:hover {
    background-color: ${({ isCopied }) => isCopied && theme.customPalette.success.main};
  }
  height: 40px;
`

const FilteredInput = props => <Input {...omit(props, ['isCopied'])} />

const UrlInput = styled(FilteredInput)`
  flex: 4;
  margin-left: 0.8rem;
`

const CopyButtonDiv = styled.div`
  flex: 1;
`

const handleUrlFocus = event => event.target.select()

const ResultBox = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyUrl = useCallback(
    async () => {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
    },
    [url]
  )

  return (
    <ResultDiv isCopied={isCopied}>
      <UrlInput defaultValue={url} disableUnderline fullWidth isCopied={isCopied} onFocus={handleUrlFocus} readOnly />
      <CopyButtonDiv>
        <Tooltip title="Copy to Clipboard">
          <CopyButton color="primary" fullWidth isCopied={isCopied} onClick={copyUrl} variant="contained">
            {isCopied ? <DoneIcon /> : 'Copy'}
          </CopyButton>
        </Tooltip>
      </CopyButtonDiv>
    </ResultDiv>
  )
}

const FilteredTypography = props => <Typography {...omit(props, ['fontSize', 'fontWeight'])} />

const StyledTypography = styled(FilteredTypography)`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: black;
`

const DialogContent = ({ url }) => (
  <ContentContainer>
    <StyledTypography fontSize="2.1rem" fontWeight="300">
      {'Share your link'}
    </StyledTypography>
    <StyledTypography fontSize="1.1rem" fontWeight="500">
      {"Your link is done. Let's share it?"}
    </StyledTypography>
    <ResultBox url={url} />
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
