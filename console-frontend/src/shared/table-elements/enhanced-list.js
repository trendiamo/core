import AppBarButton from 'shared/app-bar-button'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CircularProgress from 'app/layout/loading'
import React from 'react'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiRequest } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Checkbox, Table, TableBody, TablePagination } from '@material-ui/core'
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import { TableCell, TableHead, TableRow, TableToolbar } from 'shared/table-elements'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const Actions = ({ buttonText, createRoute }) => (
  <AppBarButton
    color="primary"
    component={Link}
    style={{ display: createRoute.includes('picture') ? 'none' : 'inline-flex' }}
    to={createRoute}
    variant="contained"
  >
    {buttonText}
  </AppBarButton>
)

const extractCountFromHeaders = headers =>
  parseInt(
    headers
      .get('content-range')
      .split('/')
      .pop(),
    10
  )

const EnhancedList = ({
  api,
  BlankState,
  buttonText,
  columns,
  deleteRecords,
  handleChangePage,
  handleRequestSort,
  handleSelectAll,
  helpStep,
  isSelectAll,
  orderBy,
  orderDirection,
  handleChangeRowsPerPage,
  page,
  records,
  recordsCount,
  ResourceRow,
  routes,
  rowsPerPage,
  selectedIds,
  setSelectedIds,
  title,
  inactiveRows,
  location,
}) => {
  useOnboardingHelp({ single: true, stepName: helpStep, stageName: 'initial', pathname: location.pathname })
  const appBarContent = {
    Actions: <Actions buttonText={buttonText} createRoute={routes.create()} />,
    title: page === 0 ? title : `${title} p.${page + 1}`,
  }
  useAppBarContent(appBarContent)

  if (recordsCount === 0) {
    return <BlankState />
  }

  return (
    <Section>
      <TableToolbar
        createRoute={routes.create()}
        deleteRecords={deleteRecords}
        label={title}
        selectedIds={selectedIds}
      />
      <Table aria-labelledby={title}>
        <TableHead
          columns={columns}
          duplicate={!!api.duplicate}
          handleRequestSort={handleRequestSort}
          leftColumns={
            <TableCell>
              <Checkbox
                checked={isSelectAll}
                checkedIcon={<CheckBoxIcon />}
                color="primary"
                onClick={handleSelectAll}
              />
            </TableCell>
          }
          orderBy={orderBy}
          orderDirection={orderDirection}
        />
        <TableBody>
          {records &&
            records.map((record, index) => (
              <TableRow
                api={api}
                handleSelectAll={handleSelectAll}
                highlightInactive={inactiveRows[index]}
                index={index}
                key={record.id}
                resource={record}
                resourceEditPath={routes.edit && routes.edit(record.id)}
                routes={routes}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              >
                <ResourceRow record={record} />
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        component="div"
        count={recordsCount}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Section>
  )
}

const EnhancedList1 = compose(
  withHandlers({
    fetchRecords: ({
      api,
      setIsLoading,
      setIsSelectAll,
      setRecords,
      setRecordsCount,
      setSelectedIds,
      query,
      enqueueSnackbar,
    }) => async () => {
      setIsLoading(true)
      const { json, response, errors, requestError, ...rest } = await apiRequest(api.fetch, [query])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      setSelectedIds([])
      setIsSelectAll(false)
      setIsLoading(false)
      if (requestError || errors) {
        setRecords([])
        setRecordsCount(0)
      } else {
        setRecords(json)
        setRecordsCount(extractCountFromHeaders(response.headers))
      }
      return { json, response, errors, requestError, ...rest }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { fetchRecords } = this.props
      return fetchRecords()
    },
    componentDidUpdate(prevProps) {
      const { query: prevQuery } = prevProps
      const { query } = this.props
      const shouldFetch = prevQuery.range !== query.range || prevQuery.sort !== query.sort
      if (!shouldFetch) return
      const { fetchRecords } = this.props
      return fetchRecords()
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress)),
  withHandlers({
    deleteRecords: ({
      api,
      enqueueSnackbar,
      selectedIds,
      fetchRecords,
      setSelectedIds,
      setIsSelectAll,
    }) => async () => {
      const { errors, requestError } = await apiRequest(api.destroy, [{ ids: selectedIds }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      await fetchRecords()
      setSelectedIds([])
      setIsSelectAll(false)
    },
    handleSelectAll: ({ setSelectedIds, records, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? records.map(resource => resource.id) : [])
      setIsSelectAll(event.target.checked)
    },
    handleRequestSort: ({ setOrderBy, setOrderDirection, orderDirection, orderBy }) => columnName => {
      const newDirection = orderBy === columnName ? (orderDirection === 'desc' ? 'asc' : 'desc') : 'asc'
      setOrderBy(columnName)
      setOrderDirection(newDirection)
    },
    handleChangeRowsPerPage: ({ setRowsPerPage }) => event => setRowsPerPage(event.target.value),
    handleChangePage: ({ location, history }) => (event, page) => {
      let currentSearch = parse(location.search)
      delete currentSearch.page
      const newSearch = page === 0 ? currentSearch : { ...currentSearch, page: page + 1 }
      const uri =
        Object.keys(newSearch).length === 0 ? location.pathname : `${location.pathname}?${stringify(newSearch)}`
      history.push(uri)
    },
    setSelectedIds: ({ records, setIsSelectAll, setSelectedIds }) => selectedIds => {
      setIsSelectAll(selectedIds.length === records.length)
      setSelectedIds(selectedIds)
    },
  })
)(EnhancedList)

const EnhancedList2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <EnhancedList1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

const EnhancedList3 = compose(
  withRouter,
  withProps(({ location }) => ({ page: parse(location.search).page - 1 || 0 })),
  withState('rowsPerPage', 'setRowsPerPage', 25),
  withState('records', 'setRecords', []),
  withState('recordsCount', 'setRecordsCount', 0),
  withState('orderDirection', 'setOrderDirection', ({ defaultSorting = {} }) => defaultSorting.direction || 'desc'),
  withState('orderBy', 'setOrderBy', ({ defaultSorting = {} }) => defaultSorting.column || 'id'),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withState('isLoading', 'setIsLoading', true),
  withProps(({ rowsPerPage, page, orderDirection, orderBy }) => ({
    query: {
      range: JSON.stringify([page * rowsPerPage, (page + 1) * rowsPerPage - 1]),
      sort: JSON.stringify([orderBy, orderDirection]),
    },
  })),
  withProps(({ highlightInactive, records }) => {
    const inactiveRows = records.map(record => {
      return highlightInactive ? highlightInactive.every(column => record[column] && isEmpty(record[column])) : false
    })
    return { inactiveRows }
  })
)(EnhancedList2)

export default EnhancedList3
