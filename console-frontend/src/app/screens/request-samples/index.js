import React, { useMemo, useState } from 'react'
import RequestSampleCard from './request-sample-card'
import styled from 'styled-components'
import SuccessCard from './success-card'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Grid } from '@material-ui/core'

const FlexGrid = styled(props => <Grid container {...props} />)`
  height: 100%;
  justify-content: center;
  align-items: center;
`

const RequestSamples = () => {
  const appBarContent = useMemo(() => ({ title: 'Exchange Impact points for free samples!', sticky: false }), [])
  useAppBarContent(appBarContent)

  const [showSuccessCard, setShowSuccessCard] = useState(false)

  return (
    <FlexGrid>
      <Grid item lg={8} md={8} xl={6} xs={12}>
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
