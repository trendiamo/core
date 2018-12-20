import EditIcon from '@material-ui/icons/EditOutlined'
import MuiCheckBoxIcon from '@material-ui/icons/CheckBox'
import React from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import { Button, Checkbox, TableRow as MuiTableRow } from '@material-ui/core'
import { compose, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'

const CheckBoxIcon = styled(MuiCheckBoxIcon)`
  color: blue;
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
)(({ resource, handleSelect, selectedIds, resourceEditPath, children }) => (
  <MuiTableRow hover role="checkbox" tabIndex={-1}>
    <TableCell>
      <Checkbox checked={selectedIds.includes(resource.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    {children}
    <TableCell
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {resourceEditPath && (
        <Button color="primary" component={Link} to={resourceEditPath}>
          <EditIcon />
        </Button>
      )}
    </TableCell>
  </MuiTableRow>
))

export default TableRow
