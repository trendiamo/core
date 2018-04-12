import omit from 'lodash.omit'
import { Popper } from 'react-popper'
import React from 'react'
import styled, { css } from 'styled-components'

const StyledPopper = styled(props => <Popper {...omit(props, 'gray')} />)`
  z-index: 1;
  background-color: white;
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
    border-bottom-color: white;
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
  ${({ gray }) =>
    gray &&
    css`
      background-color: burlywood;
      .popper__arrow {
        border-bottom-color: burlywood;
      }
    `};
`

export default StyledPopper
