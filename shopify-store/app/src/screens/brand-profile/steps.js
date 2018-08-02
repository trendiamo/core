import { compose } from 'recompose'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`
const Li = styled.li`
  list-style-type: none;
  float: left;
  position: relative;
`

const Steps = () => (
  <React.Fragment>
    <Container>
      <ul className="progressbar">
        <Li className="active">{'Step 1'}</Li>
        <Li>{'Step 2'}</Li>
        <Li>{'Step 3'}</Li>
      </ul>
    </Container>
  </React.Fragment>
)

export default compose()(Steps)
