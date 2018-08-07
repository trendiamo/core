import { compose } from 'recompose'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`
const Ul = styled.ul`
  display: flex;
  margin: 0;
  position: relative;
  justify-content: space-between;
  margin: 2rem 0;

  &:after {
    content: ' ';
    width: 100%;
    height: 3px;
    background-color: rgb(54, 212, 188, 0.7);
    top: 30px;
    position: absolute;
    z-index: -1;
  }
`

const Li = styled.li`
  list-style-type: none;
  text-align: center;
  color: rgb(54, 212, 188);
  background: white;
`
const Step = styled.div`
  width: 60px;
  height: 60px;
  margin: 0;
  line-height: 60px;
  border: 2px solid rgb(54, 212, 188);
  background: white;
  color: rgb(54, 212, 188);
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  ${({ active }) =>
    active &&
    `
  background: rgb(54, 212, 188, .7);
  color: white;
  border: 2px solid rgb(54, 212, 188);
`};
`

const Steps = ({ tags, stepCount, currentStep }) => (
  <React.Fragment>
    <Container>
      <Ul>
        {Array.apply(null, { length: stepCount })
          .map(Number.call, Number)
          .map(e => (
            <Li key={e}>
              <Step active={e + 1 === currentStep}>{e + 1}</Step>
              {tags[e]}
            </Li>
          ))}
      </Ul>
    </Container>
  </React.Fragment>
)

export default compose()(Steps)
