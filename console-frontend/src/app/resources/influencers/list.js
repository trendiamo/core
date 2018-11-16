import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import PaperContainer from 'app/layout/paper-container'
import ProfilePic from './profile-pic'
import queryString from 'query-string'
import RATableHead from '@material-ui/core/TableHead'
import RATableSortLabel from '@material-ui/core/TableSortLabel'
import React from 'react'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { apiInfluencerDestroy, apiInfluencerList } from 'utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'

const CircularProgressContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((element, index) => [element, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(element => element[0])
}

// maybe replace this with server response
const rows = [
  { name: 'name', numeric: false, disablePadding: true, label: 'name' },
  { name: 'description', numeric: false, disablePadding: false, label: 'description' },
]

const TableSortLabel = compose(
  withHandlers({
    handleRequestSort: ({ value, onClick }) => () => {
      onClick(value)
    },
  })
)(({ handleRequestSort, ...props }) => <RATableSortLabel {...props} onClick={handleRequestSort} />)

const NoDeleteTableHead = ({ handleSelectAll, order, orderBy, handleRequestSort, isSelectAll }) => (
  <RATableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelectAll} onClick={handleSelectAll} />
      </TableCell>
      {rows.map(row => {
        return (
          <TableCell
            key={row.name}
            numeric={row.numeric}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.name ? order : false}
          >
            <Tooltip enterDelay={300} placement={row.numeric ? 'bottom-end' : 'bottom-start'} title="Sort">
              <TableSortLabel
                active={orderBy === row.name}
                direction={order}
                onClick={handleRequestSort}
                value={row.name}
              >
                {row.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        )
      })}
    </TableRow>
  </RATableHead>
)

const TableHead = ({ handleSelectAll, order, orderBy, handleRequestSort, isSelectAll, idsToDelete }) => (
  <NoDeleteTableHead
    handleRequestSort={handleRequestSort}
    handleSelectAll={handleSelectAll}
    isSelectAll={isSelectAll}
    order={order}
    orderBy={orderBy}
  >
    {idsToDelete.length > 0 ? (
      <div>
        <Typography color="inherit" variant="subtitle1">
          {`${idsToDelete.length} selected`}
        </Typography>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    ) : (
      <div>
        <Typography id="tableTitle" variant="h6">
          {'Influencers'}
        </Typography>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    )}
  </NoDeleteTableHead>
)

const InfluencerRow = compose(
  withState('isSelected', 'setIsSelected', false),
  withHandlers({
    checkHandleSelect: ({ idsToDelete, influencer, setIsSelected }) => () => {
      setIsSelected(idsToDelete.includes(influencer.id))
    },
  })
)(({ influencer, isSelected, checkHandleSelect, handleSelect }) => (
  <TableRow aria-checked={isSelected} hover role="checkbox" selected={isSelected} tabIndex={-1}>
    <TableCell padding="checkbox">
      <Checkbox checked={isSelected} onChange={checkHandleSelect} value={`${influencer.id}`} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {influencer.name}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {influencer.description}
    </TableCell>
  </TableRow>
))

const InfluencerList = ({
  idsToDelete,
  handleSelectAll,
  influencers,
  order,
  handleRequestSort,
  handleChangeRowsPerPage,
  handleChangePage,
  isLoading,
  rowsPerPage,
  onCheckboxClick,
  handleSelect,
  openShowPage,
  page,
  orderBy,
  isSelectAll,
}) => (
  <React.Fragment>
    {isLoading ? (
      <CircularProgressContainer>
        <CircularProgress size={80} />
      </CircularProgressContainer>
    ) : (
      <PaperContainer>
        <Table aria-labelledby="Influencers">
          <TableHead
            handleRequestSort={handleRequestSort}
            handleSelectAll={handleSelectAll}
            idsToDelete={idsToDelete}
            influencers={influencers}
            isSelectAll={isSelectAll}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {stableSort(influencers, getSorting(order, orderBy)).map((influencer, index) => (
              <InfluencerRow
                handleSelect={handleSelect}
                idsToDelete={idsToDelete}
                index={index}
                influencer={influencer}
                isSelectAll={isSelectAll}
                key={index}
                onCheckboxClick={onCheckboxClick}
                openShowPage={openShowPage}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          component="div"
          count={influencers.length}
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
    )}
  </React.Fragment>
)

export default compose(
  withState('influencers', 'setInfluencers', []),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  withState('idsToDelete', 'setIdsToDelete', []),
  withState('order', 'setOrder', 'desc'),
  withState('orderBy', 'setOrderBy', ''),
  withState('isSelected', 'setIsSelected', false),
  withState('isSelectAll', 'setIsSelectAll', false),
  withState('rowsPerPage', 'setRowsPerPage', 10),
  withState('page', 'setPage', 1),
  withHandlers({
    deleteInfluencers: ({ idsToDelete, setInfo, setIsLoading, setIdsToDelete, setInfluencers }) => async event => {
      event.preventDefault()
      await apiInfluencerDestroy({ ids: idsToDelete }, setInfo)
      const influencersResponse = await apiInfluencerList(setInfo)
      setInfluencers(influencersResponse)
      setIsLoading(false)
      setIdsToDelete([])
    },
    handleRequestSort: ({ setOrderBy, setOrder, order, orderBy }) => columnName => {
      // replace this method with server side sorting
      setOrderBy(columnName)
      orderBy === columnName && order === 'desc' ? setOrder('asc') : setOrder('desc')
    },
    handleSelectAll: ({ setIdsToDelete, influencers, setIsSelectAll }) => event => {
      if (event.target.checked) {
        setIdsToDelete([])
        setIsSelectAll(true)
      } else {
        setIdsToDelete(influencers.map(influencer => influencer.id))
        setIsSelectAll(false)
      }
    },
    handleSelect: ({ setIdsToDelete, idsToDelete }) => event => {
      if (event.target.checked) {
        setIdsToDelete([...idsToDelete, Number(event.target.value)])
      } else {
        let newIdsToDelete = [...idsToDelete]
        newIdsToDelete.splice(Number(event.target.value), 1)
        setIdsToDelete([newIdsToDelete])
      }
    },
    handleChangeRowsPerPage: ({ setInfluencers, setRowsPerPage, setInfo, rowsPerPage }) => async event => {
      setRowsPerPage(event.target.value)
      const influencersResponse = await apiInfluencerList(
        setInfo,
        queryString.stringify({ range: [0, rowsPerPage - 1] }, { arrayFormat: 'bracket' })
      )
      setInfluencers(influencersResponse)
    },
    handleChangePage: ({ setPage }) => event => {
      // use set page with response from server
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setInfluencers, rowsPerPage } = this.props
      const influencersResponse = await apiInfluencerList(
        setInfo,
        queryString.stringify({ range: [0, rowsPerPage - 1] }, { arrayFormat: 'bracket' })
      )
      setInfluencers(influencersResponse)
      setIsLoading(false)
    },
  })
)(InfluencerList)
