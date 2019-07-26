import React from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import { Tooltip } from '@material-ui/core'

const ActiveSymbol = styled.div`
  background-color: ${({ highlightInactive }) => (highlightInactive ? '#9D9C9D' : '#257c46')};
  height: 25px;
  font-size: 10px;
  border-radius: 4px;
  width: 70px;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: center;
  font-size: 12px;
  cursor: default;
  user-select: none;
  transition: background-color 0.6s;
`

const ActiveColumn = ({
  highlightInactive,
  tooltipTextActive,
  tooltipTextInactive,
  symbolTextActive,
  symbolTextInactive,
}) => (
  <TableCell>
    <Tooltip placement="left-end" title={highlightInactive ? tooltipTextInactive : tooltipTextActive}>
      <ActiveSymbol highlightInactive={highlightInactive}>
        {highlightInactive ? symbolTextInactive : symbolTextActive}
      </ActiveSymbol>
    </Tooltip>
  </TableCell>
)

export default ActiveColumn
