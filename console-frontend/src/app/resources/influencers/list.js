import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import MUICheckBoxIcon from '@material-ui/icons/CheckBox'
import MUITableHead from '@material-ui/core/TableHead'
import MUIToolbar from '@material-ui/core/Toolbar'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import ShowIcon from '@material-ui/icons/Visibility'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { apiInfluencerDestroy, apiInfluencerList } from 'utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Link } from 'react-router-dom'

const CircularProgressContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

const CheckBoxIcon = styled(MUICheckBoxIcon)`
  color: blue;
`

const Toolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`

const SelectedDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`
const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const SelectedTypography = styled(Typography)`
  margin-right: 10px;
  margin-top: 12px;
`

const AddInfluencerButton = () => (
  <Button component={Link} size="small" to={routes.influencerCreate()}>
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Influencer'}</StyledTypography>
  </Button>
)

const columns = [
  { name: 'avatar', numeric: false, disablePadding: true, label: 'avatar' },
  { name: 'name', numeric: false, disablePadding: false, label: 'name' },
  { name: 'description', numeric: false, disablePadding: false, label: 'description' },
]

const TableToolbar = ({ selectedIds, deleteInfluencers }) => (
  <Toolbar>
    <Typography id="tableTitle" variant="headline">
      {'Influencers'}
    </Typography>
    <AddInfluencerButton />
    {selectedIds.length > 0 ? (
      <SelectedDiv>
        <SelectedTypography color="inherit" variant="subheading">
          {`${selectedIds.length} selected`}
        </SelectedTypography>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete" onClick={deleteInfluencers}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </SelectedDiv>
    ) : (
      <div>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    )}
  </Toolbar>
)

const TableHead = ({ handleSelectAll, isSelectAll }) => (
  <MUITableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={isSelectAll} checkedIcon={<CheckBoxIcon />} onClick={handleSelectAll} />
      </TableCell>
      {columns.map(row => {
        return (
          <TableCell key={row.name} numeric={row.numeric} padding={row.disablePadding ? 'none' : 'default'}>
            <Tooltip enterDelay={300} placement={row.numeric ? 'bottom-end' : 'bottom-start'} title="Sort">
              <TableSortLabel value={row.name}>{row.label}</TableSortLabel>
            </Tooltip>
          </TableCell>
        )
      })}
      <TableCell key="actions" />
    </TableRow>
  </MUITableHead>
)

const InfluencerRow = compose(
  withHandlers({
    handleSelect: ({ setSelectedIds, selectedIds, influencer }) => event => {
      if (event.target.checked) {
        setSelectedIds([...selectedIds, influencer.id])
      } else {
        let newIdsToDelete = [...selectedIds]
        newIdsToDelete.splice(selectedIds.indexOf(influencer.id), 1)
        setSelectedIds(newIdsToDelete)
      }
    },
  })
)(({ influencer, handleSelect, selectedIds }) => (
  <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell padding="checkbox">
      <Checkbox checked={selectedIds.includes(influencer.id)} checkedIcon={<CheckBoxIcon />} onChange={handleSelect} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      <Avatar alt="Remy Sharp" src={influencer.profilePicUrl} />
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {influencer.name}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {influencer.description}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      <Button color="primary" component={Link} to={routes.influencerShow(influencer.id)}>
        <ShowIcon />
      </Button>
      <Button color="primary" component={Link} to={routes.influencerEdit(influencer.id)}>
        <EditIcon />
      </Button>
    </TableCell>
  </TableRow>
))

const InfluencerList = ({
  selectedIds,
  handleSelectAll,
  influencers,
  handleRequestSort,
  isLoading,
  deleteInfluencers,
  setSelectedIds,
  isSelectAll,
}) => (
  <React.Fragment>
    {isLoading ? (
      <CircularProgressContainer>
        <CircularProgress size={80} />
      </CircularProgressContainer>
    ) : (
      <PaperContainer>
        <TableToolbar deleteInfluencers={deleteInfluencers} selectedIds={selectedIds} />
        <Table aria-labelledby="Influencers">
          <TableHead
            handleRequestSort={handleRequestSort}
            handleSelectAll={handleSelectAll}
            influencers={influencers}
            isSelectAll={isSelectAll}
            selectedIds={selectedIds}
          />
          <TableBody>
            {influencers.map((influencer, index) => (
              <InfluencerRow
                handleSelectAll={handleSelectAll}
                index={index}
                influencer={influencer}
                key={influencer.id}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
              />
            ))}
          </TableBody>
        </Table>
      </PaperContainer>
    )}
  </React.Fragment>
)

export default compose(
  withState('influencers', 'setInfluencers', []),
  withState('isLoading', 'setIsLoading', true),
  withState('info', 'setInfo', null),
  withState('selectedIds', 'setSelectedIds', []),
  withState('isSelectAll', 'setIsSelectAll', false),
  withHandlers({
    deleteInfluencers: ({ selectedIds, setInfo, setIsLoading, setSelectedIds, setInfluencers }) => async event => {
      event.preventDefault()
      await apiInfluencerDestroy({ ids: selectedIds }, setInfo)
      const influencersResponse = await apiInfluencerList(setInfo)
      setInfluencers(influencersResponse)
      setIsLoading(false)
      setSelectedIds([])
    },
    handleSelectAll: ({ setSelectedIds, influencers, setIsSelectAll }) => event => {
      setSelectedIds(event.target.checked ? influencers.map(influencer => influencer.id) : [])
      setIsSelectAll(event.target.checked)
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setInfluencers } = this.props
      const influencersResponse = await apiInfluencerList(setInfo)
      setInfluencers(influencersResponse)
      setIsLoading(false)
    },
  })
)(InfluencerList)
