import { Popper } from 'react-popper'
import React from 'react'
import styled from 'styled-components'

const StyledPopper = styled(props => <Popper {...props} />)`
  z-index: 1;
  background-color: whitesmoke;
  padding: 1rem;
  border-radius: 1rem;
  min-width: 200px;
  font-size: 85%;
  margin-top: 5px;

  > span {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: transparent;
    border-bottom-color: whitesmoke;
    border-width: 0 5px 5px 5px;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }

  li {
    font-weight: 500;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`

export default StyledPopper
