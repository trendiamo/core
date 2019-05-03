import React, { useCallback } from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import { TableHead as MuiTableHead, TableSortLabel as MuiTableSortLabel, TableRow, Tooltip } from '@material-ui/core'

const StyledTableHead = styled(MuiTableHead)`
  background-color: #fafafa;
  border-top: 1px solid #dfe0df;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.3px;
  color: #555;
  text-transform: uppercase;
`

const TableSortLabel = ({ onClick, value, ...props }) => {
  const handleRequestSort = useCallback(() => onClick(value), [onClick, value])

  return <MuiTableSortLabel {...props} onClick={handleRequestSort} />
}

const TableHead = ({ leftColumns, handleRequestSort, orderBy, orderDirection, columns, duplicate }) => (
  <StyledTableHead>
    <TableRow>
      {leftColumns}
      {columns.map(column => {
        return (
          <TableCell align={column.align} component="th" key={column.name} padding={column.padding}>
            {column.sortable ? (
              <Tooltip enterDelay={50} placement={column.numeric ? 'bottom-end' : 'bottom-start'} title="Sort">
                <TableSortLabel
                  active={orderBy === column.name}
                  direction={orderDirection}
                  hideSortIcon
                  onClick={handleRequestSort}
                  style={{ verticalAlign: 'baseline' }}
                  value={column.name}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            ) : (
              column.label
            )}
          </TableCell>
        )
      })}
      <TableCell
        style={{
          whiteSpace: 'nowrap',
        }}
      />
      {duplicate && (
        <TableCell
          style={{
            whiteSpace: 'nowrap',
          }}
        />
      )}
    </TableRow>
  </StyledTableHead>
)

export default TableHead
