import Button from './button'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Body, Header, SmallHeader } from './typography'
import { changeStage } from 'onboarding/scenario-actions'

const Container = styled.div`
  min-width: 300px;
  margin: 20px;
  text-align: ${({ align }) => align};
`

const Tooltip = ({ align, body, toStage1, create, title, smallHeader, nextRoute, index, primaryProps, onboarding }) => {
  useEffect(() => toStage1 && changeStage(1), [toStage1])

  return (
    <Container align={align || 'left'}>
      <SmallHeader variant="overline">{smallHeader || `Step ${index + 1}`}</SmallHeader>
      <Header variant="h4">{title}</Header>
      <Body variant="body2">{body}</Body>
      <Button buttonConfig={primaryProps} create={create} nextRoute={nextRoute} onboarding={onboarding} />
    </Container>
  )
}

export default Tooltip
