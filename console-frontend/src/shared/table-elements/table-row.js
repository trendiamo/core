import CheckBoxIcon from '@material-ui/icons/CheckBox'
import EditButton from 'shared/edit-button'
import EditIcon from '@material-ui/icons/EditOutlined'
import React from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import { Checkbox, TableRow as MuiTableRow } from '@material-ui/core'
import { compose, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'

const ActiveSymbol = styled.div`
  background-color: ${({ highlightInactive }) => (highlightInactive ? '#9D9C9D' : '#51b165')};
  height: 25px;
  font-size: 10px;
  border-radius: 4px;
  width: 70px;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: center;
  font-size: 12px;
`

const TableRow = compose(
  withHandlers({
    handleSelect: ({ setSelectedIds, selectedIds, resource }) => event => {
      if (event.target.checked) {
        setSelectedIds([...selectedIds, resource.id])
      } else {
        let newSelectedIds = [...selectedIds]
        newSelectedIds.splice(selectedIds.indexOf(resource.id), 1)
        setSelectedIds(newSelectedIds)
      }
    },
  })
)(({ resource, handleSelect, selectedIds, resourceEditPath, children, highlightInactive }) => (
  <MuiTableRow hover role="checkbox" style={{ background: highlightInactive ? '#f7f7f7' : '' }} tabIndex={-1}>
    <TableCell>
      <Checkbox
        checked={selectedIds.includes(resource.id)}
        checkedIcon={<CheckBoxIcon />}
        color="primary"
        onChange={handleSelect}
      />
    </TableCell>
    {React.cloneElement(children, { highlightInactive })}
    <TableCell>
      <ActiveSymbol highlightInactive={highlightInactive}>{highlightInactive ? 'Draft' : 'Active'}</ActiveSymbol>
    </TableCell>
    <TableCell
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {resourceEditPath && (
        <EditButton component={Link} to={resourceEditPath}>
          <EditIcon />
        </EditButton>
      )}
    </TableCell>
  </MuiTableRow>
))

export default TableRow
