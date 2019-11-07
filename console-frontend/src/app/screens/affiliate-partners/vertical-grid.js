import React, { useMemo } from 'react'
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth'

const ColumnContainer = styled.div`
  width: ${({ separation }) => 100 / separation}%;
  margin: 0 7px;
`

const GridContainer = styled.div`
  display: flex;
  width: calc(100% + 14px);
  margin: 0 -7px;
`

const VerticalGrid = ({ children, width, xs = 12, sm = 6, md = 6, lg = 4, xl = 4 }) => {
  const sizes = useMemo(() => ({ xs, sm, md, lg, xl }), [lg, md, sm, xl, xs])
  const separation = useMemo(() => Math.round(12 / sizes[width]), [sizes, width])
  const columns = useMemo(() => [...Array(separation).keys()], [separation])

  return (
    <GridContainer>
      {columns.map((column, columnId) => (
        <ColumnContainer key={column} separation={separation}>
          {children.map((child, index) => (index % separation === columnId ? child : null))}
        </ColumnContainer>
      ))}
    </GridContainer>
  )
}

export default withWidth()(VerticalGrid)
