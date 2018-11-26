import Avatar from '@material-ui/core/Avatar'
import CircularProgress from 'shared/circular-progress'
import enhanceList from 'ext/recompose/enhance-list'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import { apiOutroDestroy, apiOutroList } from 'utils'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import { TableHead, TableRow, TableToolbar } from 'shared/table-elements'

const columns = [{ name: 'persona', padding: 'none', label: 'persona' }]

const OutrosList = ({
  selectedIds,
  handleSelectAll,
  outros,
  handleRequestSort,
  deleteResources,
  handleChangeRowsPerPage,
  setSelectedIds,
  isSelectAll,
  outrosCount,
  handleChangePage,
  rowsPerPage,
  page,
  order,
  orderBy,
}) => (
  <PaperContainer>
    <TableToolbar
      deleteResources={deleteResources}
      resourceCreatePath={routes.outroCreate()}
      resourceName="Outros"
      selectedIds={selectedIds}
    />
    <Table aria-labelledby="Outros">
      <TableHead
        columns={columns}
        handleRequestSort={handleRequestSort}
        handleSelectAll={handleSelectAll}
        isSelectAll={isSelectAll}
        order={order}
        orderBy={orderBy}
        selectedIds={selectedIds}
      />
      <TableBody>
        {outros.map((outro, index) => (
          <TableRow
            handleSelectAll={handleSelectAll}
            index={index}
            key={outro.id}
            resource={outro}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          >
            <TableCell component="th" padding="none" scope="row">
              <Avatar alt={toString(outro.id)} src={outro.persona.profilePicUrl} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TablePagination
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      component="div"
      count={outrosCount}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
    />
  </PaperContainer>
)

export default compose(
  withState('outros', 'setOutros', []),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  withState('outrosCount', 'setOutrosCount', 0),
  withState('range', 'setRange', []),
  withState('order', 'setOrder', 'asc'),
  withState('orderBy', 'setOrderBy', 'id'),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withState('page', 'setPage', 0),
  withState('rowsPerPage', 'setRowsPerPage', 10),
  enhanceList(apiOutroList, apiOutroDestroy, ({ outros, setOutros, outrosCount, setOutrosCount }) => ({
    resources: outros,
    setResources: setOutros,
    resourcesCount: outrosCount,
    setResourcesCount: setOutrosCount,
  })),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setOutrosCount, setQuery, page, setOutros } = this.props
      const outrosResponse = await setQuery(page)
      setOutros(outrosResponse.json)
      setOutrosCount(outrosResponse.count)
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(CircularProgress))
)(OutrosList)
