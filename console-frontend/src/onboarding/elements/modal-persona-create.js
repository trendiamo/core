import Dialog from 'shared/dialog'
import React from 'react'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { changeStage } from 'onboarding/scenario-actions'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'

const ActionsTemplate = ({ handleClose }) => (
  <>
    <Button color="primary" onClick={handleClose} variant="text">
      {'Ok, lets go!'}
    </Button>
  </>
)

const DialogActions = compose(
  withOnboardingConsumer,
  withHandlers({
    handleClose: ({ setOpen, setOnboarding, onboarding }) => () => {
      setOnboarding({ ...onboarding, stageIndex: 2, run: false })
      setOpen(false)
    },
  })
)(ActionsTemplate)

const ContentContainer = styled.div`
  text-align: center;
`

const ContentBody = styled.div`
  margin-top: 10px;
`

const DialogContent = () => (
  <ContentContainer style={{ textAlign: 'center' }}>
    <img alt="" src="/img/icons/ic_emoji_clap.png" />
    <Typography variant="h4">{"Congrats, it's done!"}</Typography>
    <Typography variant="h6">{"Your first persona is created. Let's keep going?"}</Typography>
    <ContentBody>
      <Typography variant="body1">{'You can now use this persona in your modules.'}</Typography>
    </ContentBody>
  </ContentContainer>
)

const ModalTemplate = ({ open, setOpen }) => (
  <Dialog content={<DialogContent />} dialogActions={<DialogActions setOpen={setOpen} />} open={open} title="" />
)

export default compose(
  withState('open', 'setOpen', true),
  lifecycle({
    componentDidMount() {
      changeStage(2)()
    },
  })
)(ModalTemplate)
