import React from 'react'
import styled from 'styled-components'
import { TableCell as MuiTableCell } from '@material-ui/core'

const StyledCell = styled(MuiTableCell)`
  width: ${({ width }) => width};
  text-align: ${({ align }) => align};
  padding: 0 5px;
  border: none;
  position: relative;
  :before {
    content: '';
    left: 0;
    top: 0;
    right: 0;
    bottom: -1px;
    position: absolute;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    pointer-events: none;
    user-select: none;
  }
`

const TableCell = ({ ...props }) => <StyledCell {...props} scope="row" />

export default TableCell
