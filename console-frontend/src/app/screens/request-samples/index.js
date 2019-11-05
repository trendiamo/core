import React, { useMemo, useState } from 'react'
import RequestSampleCard from './request-sample-card'
import styled from 'styled-components'
import SuccessCard from './success-card'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Grid } from '@material-ui/core'

const FlexGrid = styled(Grid)`
  justify-content: center;
`

const RequestSamples = () => {
  const appBarContent = useMemo(() => ({ title: 'Exchange Impact points for free samples!' }), [])
  useAppBarContent(appBarContent)

  const [showSuccessCard, setShowSuccessCard] = useState(false)

  return (
    <FlexGrid container>
      <Grid item lg={8} md={8} xl={4} xs={12}>
        {showSuccessCard ? (
          <SuccessCard setShowSuccessCard={setShowSuccessCard} />
        ) : (
          <RequestSampleCard setShowSuccessCard={setShowSuccessCard} />
        )}
      </Grid>
    </FlexGrid>
  )
}

export default RequestSamples
