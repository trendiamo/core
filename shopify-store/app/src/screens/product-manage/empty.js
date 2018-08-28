import { compose } from 'recompose'
import React from 'react'
import styled from 'styled-components'

const GreyDiv = styled.div`
  background-color: #f4f4f4;
  border-radius: 6px;
  margin: 1%;
  width: ${({ width }) => width};
`
const EmptyCard = styled.div`
  background-color: white;
  border: 2px solid rgb(200, 200, 200);
  border-radius: 6px;
  bottom: -10%;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.18) 0px 4px 16px;
  color: rgb(200, 200, 200);
  font-weight: regular;
  letter-spacing: 1px;
  padding: 1%;
  position: absolute;
  right: -3%;
  transform: rotate(-20deg);
`

const Empty = () => (
  <React.Fragment>
    <GreyDiv width={'20%'}>
      <br />
    </GreyDiv>
    <GreyDiv width={'100%'}>
      <br />
    </GreyDiv>
    <GreyDiv width={'35%'}>
      <br />
    </GreyDiv>
    <GreyDiv width={'80%'}>
      <br />
    </GreyDiv>
    <EmptyCard>{'Empty'}</EmptyCard>
  </React.Fragment>
)

export default compose()(Empty)
