import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Header = styled(Typography)`
  flex: 1;
  display: flex;
  align-items: center;
  & + * {
    margin-left: 10px;
  }
`

export default Header
