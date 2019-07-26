import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import {
  Menu,
  MenuItem as MuiMenuItem,
  TableHead as MuiTableHead,
  TableSortLabel as MuiTableSortLabel,
  TableRow,
  Tooltip,
} from '@material-ui/core'

const StyledTableHead = styled(MuiTableHead)`
  background-color: #fafafa;
  border-top: 1px solid #dfe0df;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.3px;
  color: #555;
  text-transform: uppercase;
`

const MenuItemDiv = styled(MuiMenuItem)`
  padding: 3px 20px;
`

const MenuItem = ({ onClick, option }) => {
  const handleClick = useCallback(() => onClick({ option }), [onClick, option])

  return <MenuItemDiv onClick={handleClick}>{option.title}</MenuItemDiv>
}

const TableSortLabel = ({ onColumnClick, column, orderBy, ...props }) => {
  const onClick = useCallback(event => onColumnClick({ column, event }), [onColumnClick, column])

  const sortingOption = useMemo(
    () => {
      if (!column.sortingOptions || !(orderBy && orderBy.optionName)) return
      return column.sortingOptions.find(option => option.name === orderBy.optionName)
    },
    [column.sortingOptions, orderBy]
  )

  const label = useMemo(
    () => {
      if (!column.labelIsShowingSorting || !sortingOption) return column.label
      return `${column.label || 'Sorted'}: ${sortingOption.title}`
    },
    [column.label, column.labelIsShowingSorting, sortingOption]
  )

  const active = useMemo(() => orderBy && (orderBy.columnName || orderBy) === column.name, [column.name, orderBy])

  return (
    <MuiTableSortLabel active={active} {...props} onClick={onClick}>
      {label}
    </MuiTableSortLabel>
  )
}

const anchorOrigin = { horizontal: 'center', vertical: 'bottom' }
const transformOrigin = { horizontal: 'center', vertical: 'top' }

const TableHead = ({ leftColumns, handleRequestSort, orderBy, orderDirection, columns, name }) => {
  const [showSortingOptions, setShowSortingOptions] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentColumnName, setCurrentColumnName] = useState(null)

  const onColumnClick = useCallback(
    ({ column, event }) => {
      if (!column.sortingOptions) {
        handleRequestSort({ columnName: column.name })
        return
      }
      setShowSortingOptions(true)
      setAnchorEl(event.currentTarget)
      setCurrentColumnName(column.name)
    },
    [handleRequestSort]
  )

  const onSortingOptionClick = useCallback(
    ({ option }) => {
      handleRequestSort({ columnName: currentColumnName, optionName: option.name })
    },
    [currentColumnName, handleRequestSort]
  )

  const closeSortingOptions = useCallback(() => {
    setShowSortingOptions(false)
    setAnchorEl(null)
  }, [])

  return (
    <StyledTableHead>
      <TableRow>
        {leftColumns}
        {columns.map(column => (
          <TableCell align={column.align} component="th" key={column.name} padding={column.padding}>
            {column.sortable ? (
              <Tooltip enterDelay={50} placement={column.numeric ? 'bottom-end' : 'bottom-start'} title="Sort">
                <TableSortLabel
                  aria-controls={column.sortingOptions && `table-${name}-column-${column.name}-menu`}
                  aria-haspopup="true"
                  column={column}
                  direction={orderDirection}
                  hideSortIcon
                  onColumnClick={onColumnClick}
                  orderBy={orderBy}
                  style={{ verticalAlign: 'baseline' }}
                />
              </Tooltip>
            ) : (
              column.label
            )}
            {column.sortingOptions && (
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={anchorOrigin}
                disableAutoFocusItem
                getContentAnchorEl={null}
                id={`table-${name}-column-${column.name}-menu`}
                onClick={closeSortingOptions}
                open={showSortingOptions}
                transformOrigin={transformOrigin}
              >
                {column.sortingOptions.map(option => (
                  <MenuItem key={option.name} onClick={onSortingOptionClick} option={option} />
                ))}
              </Menu>
            )}
          </TableCell>
        ))}
        <TableCell style={{ whiteSpace: 'nowrap' }} />
      </TableRow>
    </StyledTableHead>
  )
}

export default TableHead
