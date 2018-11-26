import Button from '@material-ui/core/Button'
import MUIToolbar from '@material-ui/core/Toolbar'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { BulkActions } from 'shared/list-actions'
import { Link } from 'react-router-dom'

const SimpleToolbar = styled(MUIToolbar)`
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  overflow: hidden;
  white-space: nowrap;
`

const Title = styled.div`
  flex: 0 0 auto;
`

const Spacer = styled.div`
  flex: 1 1 100%;
`

const AddRecordButton = ({ createRoute }) => (
  <StyledButton color="primary" component={Link} to={createRoute} variant="contained">
    {'Create New'}
  </StyledButton>
)

const TableToolbar = ({ selectedIds, deleteRecords, createRoute, label }) => (
  <SimpleToolbar>
    <Title>
      {selectedIds.length > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography id="tableTitle" variant="subtitle1">
          {label}
        </Typography>
      )}
    </Title>
    <Spacer />
    <div>
      {selectedIds.length > 0 ? (
        <BulkActions deleteBulk={deleteRecords} selectedIds={selectedIds} />
      ) : (
        <AddRecordButton createRoute={createRoute} />
      )}
    </div>
  </SimpleToolbar>
)

export default TableToolbar
