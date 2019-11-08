import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'
import { Typography } from '@material-ui/core'

const SmallHeader = styled(Typography)`
  color: #fff;
  position: relative;
  :before {
    content: '';
    bottom: 0;
    position: absolute;
    background: #ddd;
    height: 2px;
    width: 50px;
  }
`

const Header = styled(Typography)`
  color: #fff;
  margin: 10px 0;
  ${showUpToUsBranding() &&
    `
      font-family: Lato, "Helvetica", "Arial", sans-serif;
      font-weight: 900;
      margin: 4px 0 36px;
      font-size: 30px;
    `}
`

const Body = styled(Typography)`
  color: #fff;
  margin-bottom: 15px;
  ${showUpToUsBranding() &&
    `
      margin-bottom: 40px;
    `}
`

export { SmallHeader, Body, Header }
