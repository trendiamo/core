import CircularProgress from '@material-ui/core/CircularProgress'
import PaperContainer from 'app/layout/paper-container'
import RATableHead from '@material-ui/core/TableHead'
import React from 'react'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { apiInfluencerList } from 'utils'
import { compose, lifecycle, withState } from 'recompose'

const CircularProgressContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

const rows = [
  { name: 'name', numeric: false, disablePadding: true, label: 'name' },
  { name: 'description', numeric: false, disablePadding: false, label: 'description' },
]

const TableHead = () => (
  <RATableHead>
    <TableRow>
      {rows.map(row => {
        return <TableCell key={row.name} />
      })}
    </TableRow>
  </RATableHead>
)

const InfluencerRow = ({ influencer }) => (
  <TableRow hover role="checkbox" tabIndex={-1}>
    <TableCell component="th" padding="none" scope="row">
      {influencer.name}
    </TableCell>
    <TableCell component="th" padding="none" scope="row">
      {influencer.description}
    </TableCell>
  </TableRow>
)

const InfluencerList = ({
  idsToDelete,
  handleSelectAll,
  influencers,
  order,
  handleRequestSort,
  isLoading,
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
            {influencers.map((influencer, index) => (
              <InfluencerRow influencer={influencer} key={index} />
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
  lifecycle({
    async componentDidMount() {
      const { setIsLoading, setInfo, setInfluencers } = this.props
      const influencersResponse = await apiInfluencerList(setInfo)
      console.log(influencersResponse)
      setInfluencers(influencersResponse)
      setIsLoading(false)
    },
  })
)(InfluencerList)
