import styled from 'styled-components'
import { Button } from '@material-ui/core'

const AppBarButton = styled(Button)`
  -moz-transition: none;
  -webkit-transition: none;
  -o-transition: color 0 ease-in;
  transition: none;
  background-image: ${({ disabled }) => (disabled ? 'none' : 'linear-gradient(132deg, #ff843e, #ff6c40 52%, #ff5642)')};
  background-color: ${({ disabled }) => (disabled ? 'rgba(51, 51, 51, 0.25) !important' : 'transparent')};
  color: white;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    background-image: none;
    background-color: #ff6641;
  }
`

export default AppBarButton
