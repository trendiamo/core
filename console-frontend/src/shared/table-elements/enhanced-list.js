import AppBarButton from 'shared/app-bar-button'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CircularProgress from 'app/layout/loading'
import isEmpty from 'lodash.isempty'
import Pagination, { extractCountFromHeaders } from 'shared/pagination'
import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useCancelable from 'ext/hooks/use-cancelable'
import { apiRequest } from 'utils'
import { Checkbox, Table, TableBody } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { parse } from 'query-string'
import { TableCell, TableHead, TableRow, TableToolbar } from 'shared/table-elements'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const Actions = ({ buttonText, createRoute }) =>
  createRoute && (
    <AppBarButton
      color="primary"
      component={Link}
      style={{ display: 'inline-flex' }}
      to={createRoute}
      variant="contained"
    >
      {buttonText}
    </AppBarButton>
  )

const EnhancedList = ({
  api,
  BlankState,
  buttonText,
  columns,
  defaultSorting,
  canDuplicateResource,
  canEditResource,
  helpStep,
  highlightInactive,
  location,
  ResourceRow,
  routes,
  title,
}) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: helpStep, stageName: 'initial', pathname: location.pathname }),
    [helpStep, location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'setOrder') {
        return { ...state, orderBy: action.orderBy, orderDirection: action.orderDirection }
      } else if (action.type === 'setRowsPerPage') {
        return { ...state, rowsPerPage: action.rowsPerPage }
      } else if (action.type === 'setSelectedIds') {
        return {
          ...state,
          isSelectAll:
            action.selectedIds.length ===
            state.records.filter(resource => (canEditResource ? canEditResource(resource) : true)).length,
          selectedIds: action.selectedIds,
        }
      } else if (action.type === 'handleSelectAll') {
        return {
          ...state,
          isSelectAll: !state.isSelectAll,
          selectedIds: action.checked
            ? state.records
                .filter(resource => (canEditResource ? canEditResource(resource) : true))
                .map(resource => resource.id)
            : [],
        }
      } else if (action.type === 'setLoading') {
        return {
          ...state,
          isLoading: true,
        }
      } else if (action.type === 'handleChangePage') {
        return {
          ...state,
          page: parse(location.search).page - 1 || 0,
        }
      } else if (action.type === 'completeFetch') {
        if (action.requestError) enqueueSnackbar(action.requestError, { variant: 'error' })
        if (action.requestError || action.errors) {
          return {
            ...state,
            records: [],
            recordsCount: 0,
            isLoading: false,
            isSelectAll: false,
            selectedIds: [],
          }
        } else {
          return {
            ...state,
            records: action.json,
            recordsCount: extractCountFromHeaders(action.response.headers),
            isLoading: false,
            isSelectAll: false,
            selectedIds: [],
          }
        }
      } else {
        throw new Error()
      }
    },
    {
      page: parse(location.search).page - 1 || 0,
      rowsPerPage: 25,
      recordsCount: 0,
      orderDirection: (defaultSorting || {}).direction || 'desc',
      orderBy: (defaultSorting || {}).column || 'id',
      selectedIds: [],
      isSelectAll: false,
      isLoading: true,
      records: [],
    }
  )

  const appBarContent = useMemo(
    () => ({
      Actions: <Actions buttonText={buttonText} createRoute={routes && routes.create ? routes.create() : null} />,
      title: state.page === 0 ? title : `${title} p.${state.page + 1}`,
    }),
    [buttonText, routes, state.page, title]
  )
  useAppBarContent(appBarContent)

  const query = useMemo(
    () => ({
      range: JSON.stringify([state.page * state.rowsPerPage, (state.page + 1) * state.rowsPerPage - 1]),
      sort: JSON.stringify([state.orderBy, state.orderDirection]),
    }),
    [state.page, state.rowsPerPage, state.orderBy, state.orderDirection]
  )

  const inactiveRows = state.records.map(record => {
    return highlightInactive ? highlightInactive.every(column => record[column] && isEmpty(record[column])) : false
  })

  const handleRequestSort = useCallback(
    columnName => {
      const newDirection = state.orderBy === columnName ? (state.orderDirection === 'desc' ? 'asc' : 'desc') : 'asc'
      dispatch({ type: 'setOrder', orderBy: columnName, orderDirection: newDirection })
    },
    [state.orderBy, state.orderDirection, dispatch]
  )

  const handleChangeRowsPerPage = useCallback(
    event => dispatch({ type: 'setRowsPerPage', rowsPerPage: event.target.value }),
    [dispatch]
  )

  const dispatchChangePage = useCallback(type => {
    dispatch({ type })
  }, [])

  const cancelable = useCancelable()

  const fetchRecords = useCallback(
    () => {
      ;(async () => {
        dispatch({ type: 'setLoading' })
        try {
          const { json, response, errors, requestError } = await cancelable(apiRequest(api.fetch, [query]))
          dispatch({ type: 'completeFetch', json, response, errors, requestError })
        } catch (e) {
          if (e.message === 'isCanceled') {
            // ignore: this means the component was unmounted before the request could complete
          } else {
            throw e
          }
        }
      })()
    },
    [api.fetch, cancelable, query]
  )

  const deleteRecords = useCallback(
    () => {
      ;(async () => {
        try {
          const { errors, requestError } = await cancelable(apiRequest(api.destroy, [{ ids: state.selectedIds }]))
          if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
          if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
          fetchRecords()
        } catch (e) {
          if (e.message === 'isCanceled') {
            // ignore: this means the component was unmounted before the request could complete
          } else {
            throw e
          }
        }
      })()
    },
    [api.destroy, cancelable, enqueueSnackbar, fetchRecords, state.selectedIds]
  )

  const handleSelectAll = useCallback(event => dispatch({ type: 'handleSelectAll', checked: event.target.checked }), [])

  const setSelectedIds = useCallback(selectedIds => dispatch({ type: 'setSelectedIds', selectedIds }), [])

  useEffect(fetchRecords, [fetchRecords])

  if (state.isLoading) return <CircularProgress />

  if (state.recordsCount === 0) return BlankState ? <BlankState /> : null

  return (
    <Section>
      <TableToolbar deleteRecords={deleteRecords} label={title} selectedIds={state.selectedIds} />
      <Table aria-labelledby={title}>
        <TableHead
          columns={columns}
          handleRequestSort={handleRequestSort}
          leftColumns={
            <TableCell>
              <Checkbox
                checked={state.isSelectAll}
                checkedIcon={<CheckBoxIcon />}
                color="primary"
                disabled={canEditResource && state.records.every(record => !canEditResource(record))}
                onClick={handleSelectAll}
              />
            </TableCell>
          }
          orderBy={state.orderBy}
          orderDirection={state.orderDirection}
        />
        <TableBody>
          {state.records &&
            state.records.map((record, index) => (
              <TableRow
                api={api}
                canDuplicateResource={canDuplicateResource}
                canEditResource={canEditResource}
                handleSelectAll={handleSelectAll}
                highlightInactive={inactiveRows[index]}
                index={index}
                key={record.id}
                resource={record}
                resourceEditPath={routes && routes.edit && routes.edit(record.id)}
                routes={routes}
                selectedIds={state.selectedIds}
                setSelectedIds={setSelectedIds}
              >
                <ResourceRow record={record} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination
        isDispatched
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={state.page}
        rowsPerPage={state.rowsPerPage}
        setPage={dispatchChangePage}
        totalRecordsCount={state.recordsCount}
      />
    </Section>
  )
}

export default withRouter(EnhancedList)
