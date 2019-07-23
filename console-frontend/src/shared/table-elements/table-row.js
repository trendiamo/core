import Button from 'shared/edit-button'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CopyIcon from '@material-ui/icons/FileCopyOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import React, { useCallback } from 'react'
import TableCell from './table-cell'
import { apiRequest } from 'utils'
import { Checkbox, TableRow as MuiTableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const TableRow = ({
  resource,
  selectedIds,
  setSelectedIds,
  api,
  canDuplicateResource,
  canEditResource,
  resourceEditPath,
  routes,
  children,
  history,
  highlightInactive,
}) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleSelect = useCallback(
    event => {
      if (event.target.checked) {
        setSelectedIds([...selectedIds, resource.id])
      } else {
        const newSelectedIds = [...selectedIds]
        newSelectedIds.splice(selectedIds.indexOf(resource.id), 1)
        setSelectedIds(newSelectedIds)
      }
    },
    [resource.id, selectedIds, setSelectedIds]
  )

  const duplicateResource = useCallback(
    async () => {
      const { json, requestError } = await apiRequest(api.duplicate, [resource.id])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return
      }
      history.push(routes.edit(json.id))
    },
    [api.duplicate, resource.id, history, routes, enqueueSnackbar]
  )

  return (
    <MuiTableRow hover role="checkbox" style={{ background: highlightInactive ? '#f7f7f7' : '' }} tabIndex={-1}>
      <TableCell>
        <Checkbox
          checked={selectedIds.includes(resource.id)}
          checkedIcon={<CheckBoxIcon />}
          color="primary"
          disabled={canEditResource && !canEditResource(resource)}
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell>{resource.id}</TableCell>
      {React.cloneElement(children, { highlightInactive })}
      <TableCell style={{ whiteSpace: 'nowrap' }}>
        {resourceEditPath && (
          <Button component={Link} disabled={canEditResource && !canEditResource(resource)} to={resourceEditPath}>
            <EditIcon />
          </Button>
        )}
        {api.duplicate && (
          <Button disabled={canDuplicateResource && !canDuplicateResource(resource)} onClick={duplicateResource}>
            <CopyIcon />
          </Button>
        )}
      </TableCell>
    </MuiTableRow>
  )
}

export default withRouter(TableRow)
