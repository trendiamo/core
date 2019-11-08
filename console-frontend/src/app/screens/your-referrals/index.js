import auth from 'auth'
import React, { useEffect, useMemo, useState } from 'react'
import ReferralsCard from './referrals-card'
import ReferralsList from './referrals-list'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiMeReferrals, apiRequest } from 'utils'
import { Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`

const GridContainer = styled(props => <Grid container {...props} />)`
  display: flex;
  justify-content: center;
`

const YourReferrals = () => {
  const [referrals, setReferrals] = useState([])

  const referralCode = useMemo(() => auth.getUser().referralCode, [])
  const gridSizes = useMemo(() => (referrals.length > 0 ? { lg: 6, xl: 4 } : { lg: 8, xl: 6 }), [referrals.length])

  const appBarContent = useMemo(() => ({ title: 'Invite others to join you!' }), [])
  useAppBarContent(appBarContent)

  const { enqueueSnackbar } = useSnackbar()

  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'referrals', stageName: 'uptous', pathname: window.location.pathname }),
    []
  )
  useOnboardingHelp(onboardingHelp)

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiMeReferrals, [])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          return {}
        }
        setReferrals(json)
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <Container>
      <GridContainer>
        <Grid item md={9} xs={12} {...gridSizes}>
          <ReferralsCard referralCode={referralCode} />
        </Grid>
        {referrals.length > 0 && (
          <Grid item lg={4} md={9} xl={2} xs={12}>
            <ReferralsList referrals={referrals} />
          </Grid>
        )}
      </GridContainer>
    </Container>
  )
}

export default YourReferrals
