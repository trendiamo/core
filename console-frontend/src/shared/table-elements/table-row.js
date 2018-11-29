import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import EditIcon from '@material-ui/icons/Edit'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableRow from '@material-ui/core/TableRow'
import React from 'react'
import ShowIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'
import TableCell from '@material-ui/core/TableCell'
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
        let newIdsToDelete = [...selectedIds]
        newIdsToDelete.splice(selectedIds.indexOf(resource.id), 1)
        setSelectedIds(newIdsToDelete)
      }
    },
  })
)(({ resource, handleSelect, selectedIds, resourceShowPath, resourceEditPath, children }) => (
  <MUITableRow hover role="checkbox" tabIndex={-1}>
    <TableCell padding="checkbox">
      <Checkbox checked={selectedIds.includes(resource.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    {children}
    <TableCell
      component="th"
      padding="none"
      scope="row"
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      {resourceShowPath ? (
        <Button color="primary" component={Link} to={resourceShowPath}>
          <ShowIcon />
        </Button>
      ) : null}
      {resourceEditPath ? (
        <Button color="primary" component={Link} to={resourceEditPath}>
          <EditIcon />
        </Button>
      ) : null}
    </TableCell>
  </MUITableRow>
))

export default TableRow
