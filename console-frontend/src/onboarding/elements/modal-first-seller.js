import Dialog from 'shared/dialog'
import emojiClapImage from 'assets/img/icons/ic_emoji_clap.png'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { changeStage } from 'onboarding/scenario-actions'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'

const ContentContainer = styled.div`
  text-align: center;
`

const ContentBody = styled.div`
  margin-top: 10px;
`

const DialogContent = () => (
  <ContentContainer>
    <img alt="" src={emojiClapImage} />
    <Typography variant="h4">{"Congrats, it's done!"}</Typography>
    <Typography variant="h6">{"Your first seller is created. Let's keep going?"}</Typography>
    <ContentBody>
      <Typography variant="body1">{'You can now use this seller in your modules.'}</Typography>
    </ContentBody>
  </ContentContainer>
)

const DialogActions = ({ handleClose }) => (
  <Button color="primary" onClick={handleClose} variant="text">
    {'Ok, lets go!'}
  </Button>
)

const ModalFirstSeller = () => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  const [open, setOpen] = useState(true)

  const handleClose = useCallback(
    () => {
      setOnboarding({ ...onboarding, stageIndex: 2, run: false })
      setOpen(false)
    },
    [onboarding, setOnboarding]
  )

  useEffect(() => {
    changeStage(2)
  }, [])

  return (
    <Dialog
      content={<DialogContent />}
      dialogActions={<DialogActions handleClose={handleClose} />}
      handleClose={handleClose}
      hideBackdrop
      open={open}
      title=""
    />
  )
}

export default ModalFirstSeller
