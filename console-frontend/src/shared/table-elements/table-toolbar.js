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

const AddResourceButton = ({ resourceCreatePath }) => (
  <StyledButton color="primary" component={Link} to={resourceCreatePath} variant="contained">
    {'Create New'}
  </StyledButton>
)

const TableToolbar = ({ selectedIds, deleteResources, resourceCreatePath, resourceName }) => (
  <SimpleToolbar>
    <Title>
      {selectedIds.length > 0 ? (
        <Typography color="inherit" variant="subheading">
          {`${selectedIds.length} selected`}
        </Typography>
      ) : (
        <Typography id="tableTitle" variant="subheading">
          {resourceName}
        </Typography>
      )}
    </Title>
    <Spacer />
    <div>
      {selectedIds.length > 0 ? (
        <BulkActions deleteBulk={deleteResources} selectedIds={selectedIds} />
      ) : (
        <AddResourceButton resourceCreatePath={resourceCreatePath} />
      )}
    </div>
  </SimpleToolbar>
)

export default TableToolbar
