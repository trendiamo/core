import Dialog from 'shared/dialog'
import React from 'react'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { changeStage } from 'onboarding/scenario-actions'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'

const ContentContainer = styled.div`
  text-align: center;
`

const ContentBody = styled.div`
  margin-top: 10px;
`

const DialogContent = () => (
  <ContentContainer>
    <img alt="" src="/img/icons/ic_emoji_clap.png" />
    <Typography variant="h4">{"Congrats, it's done!"}</Typography>
    <Typography variant="h6">{"Your first persona is created. Let's keep going?"}</Typography>
    <ContentBody>
      <Typography variant="body1">{'You can now use this persona in your modules.'}</Typography>
    </ContentBody>
  </ContentContainer>
)

const DialogActions = ({ handleClose }) => (
  <Button color="primary" onClick={handleClose} variant="text">
    {'Ok, lets go!'}
  </Button>
)

const ModalFirstPersona = ({ handleClose, open }) => (
  <Dialog
    content={<DialogContent />}
    dialogActions={<DialogActions handleClose={handleClose} />}
    handleClose={handleClose}
    hideBackdrop
    open={open}
    title=""
  />
)

const ModalFirstPersona1 = compose(
  withState('open', 'setOpen', true),
  withHandlers({
    handleClose: ({ setOpen, setOnboarding, onboarding }) => () => {
      setOnboarding({ ...onboarding, stageIndex: 2, run: false })
      setOpen(false)
    },
  }),
  lifecycle({
    componentDidMount() {
      changeStage(2)()
    },
  })
)(ModalFirstPersona)

const ModalFirstPersona2 = props => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  return <ModalFirstPersona1 {...props} onboarding={onboarding} setOnboarding={setOnboarding} />
}

export default ModalFirstPersona2
