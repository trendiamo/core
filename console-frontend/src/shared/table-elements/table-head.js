import MUITableHead from '@material-ui/core/TableHead'
import MUITableSortLabel from '@material-ui/core/TableSortLabel'
import React from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import { compose, withHandlers } from 'recompose'

const StyledTableHead = styled(MUITableHead)`
  background-color: #fafafa;
  border-top: 1px solid #dfe0df;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.3px;
  color: #555;
  text-transform: uppercase;
`

const TableSortLabel = compose(
  withHandlers({
    handleRequestSort: ({ value, onClick }) => () => {
      onClick(value)
    },
  })
)(({ handleRequestSort, ...props }) => <MUITableSortLabel {...props} onClick={handleRequestSort} />)

const TableHead = ({ leftColumns, handleRequestSort, orderBy, orderDirection, columns }) => (
  <StyledTableHead>
    <TableRow>
      {leftColumns}
      {columns.map(column => {
        return (
          <TableCell
            align={column.align}
            component="th"
            key={column.name}
            numeric={column.numeric}
            padding={column.padding}
          >
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
    </TableRow>
  </StyledTableHead>
)

export default TableHead
