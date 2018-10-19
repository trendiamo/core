import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import HotTub from '@material-ui/icons/HotTub'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { Title } from 'react-admin'
import { compose, withHandlers } from 'recompose'

const Fullscreen = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1100;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHotTub = styled(HotTub)`
  width: 100%;
  height: 9em;
  color: #8b8b8b;
`

const NotFound = ({ onSafetyClick }) => (
  <Fullscreen>
    <Card>
      <Title title="Not Found" />
      <CardContent>
        <StyledHotTub />
        <h1>{'404: Page not found'}</h1>
        <p>{'Either you typed a wrong URL, or you followed a bad link, or we screwed up.'}</p>
        <p>{"We'll assume that we screwed up."}</p>
        <Button onClick={onSafetyClick} variant="raised">
          {'Take me out of here!'}
        </Button>
      </CardContent>
    </Card>
  </Fullscreen>
)

export default compose(
  withHandlers({
    onSafetyClick: () => () => (window.location = routes.root()),
  })
)(NotFound)
