import Checkbox from '@material-ui/core/Checkbox'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUITableSortLabel from '@material-ui/core/TableSortLabel'
import React from 'react'
import styled from 'styled-components'
import TableCell from '@material-ui/core/TableCell'
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

const CheckBoxIcon = styled(MUICheckBoxIcon)`
  color: blue;
`

const TableSortLabel = compose(
  withHandlers({
    handleRequestSort: ({ value, onClick }) => () => {
      onClick(value)
    },
  })
)(({ handleRequestSort, ...props }) => <MUITableSortLabel {...props} onClick={handleRequestSort} />)

const TableHead = ({ handleSelectAll, handleRequestSort, isSelectAll, orderBy, orderDirection, columns }) => (
  <StyledTableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelectAll} checkedIcon={<CheckBoxIcon />} onClick={handleSelectAll} />
      </TableCell>
      {columns.map(column => {
        return (
          <TableCell key={column.name} numeric={column.numeric} padding={column.padding || 'default'}>
            {column.sortable ? (
              <Tooltip enterDelay={50} placement={column.numeric ? 'bottom-end' : 'bottom-start'} title="Sort">
                <TableSortLabel
                  active={orderBy === column.name}
                  direction={orderDirection}
                  onClick={handleRequestSort}
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
      <TableCell key="actions" />
    </TableRow>
  </StyledTableHead>
)

export default TableHead
