import MuiTableCell from '@material-ui/core/TableCell'
import React from 'react'
import styled from 'styled-components'

const StyledCell = styled(MuiTableCell)`
  width: ${({ width }) => width};
  text-align: ${({ align }) => align};
  padding: 0 5px;
`

const TableCell = ({ ...props }) => <StyledCell {...props} scope="row" />

export default TableCell
