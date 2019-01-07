import CheckBoxIcon from '@material-ui/icons/CheckBox'
import EditIcon from '@material-ui/icons/EditOutlined'
import React from 'react'
import TableCell from './table-cell'
import { Button, Checkbox, TableRow as MuiTableRow } from '@material-ui/core'
import { compose, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'

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
