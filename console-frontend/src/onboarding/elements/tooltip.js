import Button from './button'
import React from 'react'
import styled from 'styled-components'
import { Body, Header, SmallHeader } from './typography'
import { compose, lifecycle } from 'recompose'

const Container = styled.div`
  min-width: 300px;
  margin: 20px;
  text-align: ${({ align }) => align};
`

const Tooltip = ({ align, body, create, title, smallHeader, nextRoute, index, primaryProps, onboarding }) => (
  <Container align={align || 'left'}>
    <SmallHeader variant="overline">{smallHeader || `Step ${index + 1}`}</SmallHeader>
    <Header variant="h4">{title}</Header>
    <Body variant="body2">{body}</Body>
    <Button buttonConfig={primaryProps} create={create} nextRoute={nextRoute} onboarding={onboarding} />
  </Container>
)

export default compose(
  lifecycle({
    componentWillUnmount() {
      const { callback = () => {}, onboarding } = this.props
      if (!onboarding.help.run || (onboarding.help.run && onboarding.help.enableCallback)) callback()
    },
  })
)(Tooltip)
