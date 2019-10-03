import Paper from 'shared/paper'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const MainCard = styled(Paper)`
  align-self: center;
  overflow: hidden;
  align-items: stretch;
  @media (min-width: 960px) {
    margin-right: 14px;
  }
`

export const CardContent = styled.div`
  padding: 40px 12px 40px;
  display: flex;
  flex-direction: column;
  @media (min-width: 960px) {
    padding: 60px 50px 40px;
  }
`

export const Callout = styled.div`
  background-color: #e7ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px 34px;
  @media (min-width: 960px) {
    padding: 2rem 3.75rem;
  }
`

export const CalloutTitle = styled(Typography)`
  @media (min-width: 960px) {
    margin-bottom: 20px;
  }
`
