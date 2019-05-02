import Button from 'shared/edit-button'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CopyIcon from '@material-ui/icons/FileCopyOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import React from 'react'
import TableCell from './table-cell'
import { apiRequest } from 'utils'
import { Checkbox, TableRow as MuiTableRow } from '@material-ui/core'
import { compose, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const TableRow = compose(
  withRouter,
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
    duplicateResource: ({ api, enqueueSnackbar, history, resource, routes }) => async () => {
      const { json, requestError } = await apiRequest(api.duplicate, [resource.id])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return
      }
      history.push(routes.edit(json.id))
    },
  })
)(({ duplicateResource, resource, handleSelect, selectedIds, api, resourceEditPath, children, highlightInactive }) => (
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
        <Button component={Link} to={resourceEditPath}>
          <EditIcon />
        </Button>
      )}
      {api.duplicate && (
        <Button onClick={duplicateResource}>
          <CopyIcon />
        </Button>
      )}
    </TableCell>
  </MuiTableRow>
))

const TableRow1 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <TableRow {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default TableRow1
