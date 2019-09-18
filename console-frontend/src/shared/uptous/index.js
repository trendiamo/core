import styled from 'styled-components'
import { Paper, Typography } from '@material-ui/core'

export const MainCard = styled(Paper)`
  margin-left: 1rem;
  margin-right: 1rem;
  align-self: center;
  max-width: 600px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const CardContent = styled.div`
  padding: 60px 50px 40px;
  display: flex;
  flex-direction: column;
`

export const Callout = styled.div`
  background-color: #e7ecef;
  padding: 2rem 3.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CalloutTitle = styled(Typography)`
  margin-bottom: 20px;
`
