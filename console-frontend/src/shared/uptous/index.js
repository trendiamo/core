import styled from 'styled-components'
import { Paper } from '@material-ui/core'

export const MainCard = styled(Paper)`
  margin-left: 1rem;
  margin-right: 1rem;
  align-self: center;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
export const CardContent = styled.div`
  padding: 3.75rem 3.75rem 1rem 3.75rem;
  display: flex;
  flex-direction: column;

  img {
    align-self: center;
    width: 90px;
    height: 90px;
    padding-bottom: 2rem;
  }

  h2 {
    margin: 0;
  }
`
export const Callout = styled.div`
  background-color: #1b3b50;
  color: #fff;
  padding: 2rem 3.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  b {
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
`
