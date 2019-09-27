import auth from 'auth'
import Button from 'shared/edit-button'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CopyIcon from '@material-ui/icons/FileCopyOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import RejectIcon from '@material-ui/icons/HighlightOffOutlined'
import ShowIcon from '@material-ui/icons/RemoveRedEyeOutlined'
import startCase from 'lodash.startcase'
import styled from 'styled-components'
import TableCell from './table-cell'
import { apiRequest } from 'utils'
import { Checkbox, TableRow as MuiTableRow } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const StyledTableRow = styled(props => <MuiTableRow {...omit(props, ['highlightInactive'])} />)`
  ${({ highlightInactive }) => highlightInactive && 'background: f7f7f7;'}
`

const TableRow = ({
  api,
  canDuplicateResource,
  canEditResource,
  canRejectResource,
  children,
  fetchRecords,
  highlightInactive,
  history,
  isSubmittedResource,
  resource,
  resourceEditPath,
  resourceShowPath,
  routes,
  selectedIds,
  setSelectedIds,
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

  const [isWorking, setIsWorking] = useState(false)

  const duplicateResource = useCallback(
    async () => {
      setIsWorking(true)
      const { json, requestError } = await apiRequest(api.duplicate, [resource.id])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        setIsWorking(false)
        return
      }
      if (routes) {
        history.push(routes.edit(json.id))
      }
    },
    [api.duplicate, resource.id, history, routes, enqueueSnackbar]
  )

  const rejectResource = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(api.reject, [resource.id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        enqueueSnackbar(`${startCase(resource.type)} successfully rejected`, { variant: 'success' })
        fetchRecords()
      }
      return json
    },
    [api.reject, enqueueSnackbar, fetchRecords, resource]
  )

  return (
    <StyledTableRow highlightInactive={highlightInactive} hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <Checkbox
          checked={selectedIds.includes(resource.id)}
          checkedIcon={<CheckBoxIcon />}
          color="primary"
          disabled={
            (isSubmittedResource && isSubmittedResource(resource)) || (canEditResource && !canEditResource(resource))
          }
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell>{resource.id}</TableCell>
      {React.cloneElement(children, { highlightInactive, isSubmittedResource })}
      <TableCell style={{ whiteSpace: 'nowrap' }}>
        {auth.isSeller() || !isSubmittedResource || !isSubmittedResource(resource) ? (
          <>
            {resourceEditPath && (
              <Button component={Link} disabled={canEditResource && !canEditResource(resource)} to={resourceEditPath}>
                <EditIcon />
              </Button>
            )}
            {api.duplicate && (
              <Button
                disabled={isWorking || (canDuplicateResource && !canDuplicateResource(resource))}
                onClick={duplicateResource}
              >
                <CopyIcon />
              </Button>
            )}
          </>
        ) : (
          <>
            {resourceShowPath && (
              <Button component={Link} to={resourceShowPath}>
                <ShowIcon />
              </Button>
            )}
            {api.reject && (
              <Button disabled={canRejectResource && !canRejectResource(resource)} onClick={rejectResource}>
                <RejectIcon />
              </Button>
            )}
          </>
        )}
      </TableCell>
    </StyledTableRow>
  )
}

export default withRouter(TableRow)
