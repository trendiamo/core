import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/EditOutlined'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableRow from '@material-ui/core/TableRow'
import React from 'react'
import styled from 'styled-components'
import TableCell from './table-cell'
import { compose, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'

const CheckBoxIcon = styled(MUICheckBoxIcon)`
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
  <MUITableRow hover role="checkbox" tabIndex={-1}>
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
  </MUITableRow>
))

export default TableRow
