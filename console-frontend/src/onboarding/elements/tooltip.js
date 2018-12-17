import React from 'react'
import styled from 'styled-components'
import { Body, Header, SmallHeader } from './typography'
import { Button } from './button'
import { compose, lifecycle } from 'recompose'

const Container = styled.div`
  min-width: 200px;
  margin: 20px;
  text-align: ${({ align }) => align};
`

const Tooltip = ({
  align,
  body,
  create,
  title,
  smallHeader,
  nextRoute,
  index,
  primaryProps,
  setOnboarding,
  onboarding,
}) => (
  <Container align={align || 'left'}>
    <SmallHeader variant="overline">{smallHeader || `Step ${index + 1}`}</SmallHeader>
    <Header variant="h4">{title}</Header>
    <Body variant="body2">{body}</Body>
    <Button
      config={primaryProps}
      create={create}
      nextRoute={nextRoute}
      onboarding={onboarding}
      setOnboarding={setOnboarding}
    />
  </Container>
)

export default compose(
  lifecycle({
    componentWillUnmount() {
      const { callback = () => {} } = this.props
      callback()
    },
  })
)(Tooltip)
