import AppBarButton from 'shared/app-bar-button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from 'shared/circular-progress'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import withAppBarContent from './with-app-bar-content'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Link } from 'react-router-dom'
import { TableCell, TableHead, TableRow, TableToolbar } from 'shared/table-elements'

const CheckBoxIcon = styled(MUICheckBoxIcon)`
  color: blue;
`

const Actions = ({ createRoute }) => (
  <AppBarButton color="primary" component={Link} to={createRoute} variant="contained">
    {'Create New'}
  </AppBarButton>
)

const enhanceList = ({ api, columns, breadcrumbs, routes }) => ResourceRow =>
  compose(
    withAppBarContent(() => ({
      Actions: <Actions createRoute={routes.create()} />,
      breadcrumbs,
    })),
    withProps({ label: breadcrumbs && breadcrumbs[0].text }),
    withState('records', 'setRecords', []),
    withState('recordsCount', 'setRecordsCount', 0),
    withState('orderDirection', 'setOrderDirection', 'desc'),
    withState('orderBy', 'setOrderBy', 'id'),
    withState('selectedIds', 'setSelectedIds', []),
    withState('isSelectAll', 'setIsSelectAll', false),
    withState('page', 'setPage', 0),
    withState('rowsPerPage', 'setRowsPerPage', 10),
    withState('isLoading', 'setIsLoading', true),
    withProps(({ rowsPerPage, page, orderDirection, orderBy }) => ({
      query: {
        range: JSON.stringify([page * rowsPerPage, (page + 1) * rowsPerPage - 1]),
        sort: JSON.stringify([orderBy, orderDirection]),
      },
    })),
    withHandlers({
      fetchRecords: ({
        setIsLoading,
        setIsSelectAll,
        setRecords,
        setRecordsCount,
        setSelectedIds,
        query,
      }) => async () => {
        setIsLoading(true)
        const resourceResponse = await api.fetch(query)
        setSelectedIds([])
        setIsSelectAll(false)
        setRecords(resourceResponse.json)
        setRecordsCount(resourceResponse.count)
        setIsLoading(false)
        return resourceResponse
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
      deleteRecords: ({ selectedIds, fetchRecords, setSelectedIds, setIsSelectAll }) => async () => {
        await api.destroy({ ids: selectedIds })
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
      handleChangePage: ({ setPage }) => (event, page) => setPage(page),
      setSelectedIds: ({ records, setIsSelectAll, setSelectedIds }) => selectedIds => {
        setIsSelectAll(selectedIds.length === records.length)
        setSelectedIds(selectedIds)
      },
    })
  )(
    ({
      deleteRecords,
      handleChangePage,
      handleRequestSort,
      handleSelectAll,
      isSelectAll,
      label,
      orderBy,
      orderDirection,
      handleChangeRowsPerPage,
      page,
      records,
      recordsCount,
      rowsPerPage,
      selectedIds,
      setSelectedIds,
    }) => (
      <PaperContainer>
        <TableToolbar
          createRoute={routes.create()}
          deleteRecords={deleteRecords}
          label={label}
          selectedIds={selectedIds}
        />
        <Table aria-labelledby={label}>
          <TableHead
            columns={columns}
            handleRequestSort={handleRequestSort}
            leftColumns={
              <TableCell>
                <Checkbox checked={isSelectAll} checkedIcon={<CheckBoxIcon />} onClick={handleSelectAll} />
              </TableCell>
            }
            orderBy={orderBy}
            orderDirection={orderDirection}
          />
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                handleSelectAll={handleSelectAll}
                index={index}
                key={record.id}
                resource={record}
                resourceEditPath={routes.edit(record.id)}
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
      </PaperContainer>
    )
  )

export default enhanceList
