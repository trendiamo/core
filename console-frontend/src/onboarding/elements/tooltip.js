import React from 'react'
import styled from 'styled-components'
import { Body, Header, SmallHeader } from './typography'
import { ButtonCreate, ButtonNext } from './buttons'
import { compose, lifecycle } from 'recompose'

const Container = styled.div`
  width: ${({ width }) => width || '200px'};
  margin: 20px;
  text-align: ${({ align }) => align};
`

const Tooltip = ({ align, body, create, title, width, smallHeader, nextRoute, index, primaryProps, setRun }) => (
  <Container align={align || 'left'} width={width}>
    <SmallHeader variant="overline">{smallHeader || `Step ${index + 1}`}</SmallHeader>
    <Header variant="h4">{title}</Header>
    <Body variant="body2">{body}</Body>
    {create ? (
      <ButtonCreate config={primaryProps} nextRoute={nextRoute} setRun={setRun} />
    ) : (
      <ButtonNext config={primaryProps} nextRoute={nextRoute} setRun={setRun} />
    )}
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
