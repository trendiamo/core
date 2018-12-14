import styled from 'styled-components'
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
`

const Body = styled(Typography)`
  color: #fff;
  margin-bottom: 15px;
`

export { SmallHeader, Body, Header }
