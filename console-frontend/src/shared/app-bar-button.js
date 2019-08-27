import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { frekklsButtons, uptousButtons } from 'app/theme'
import { showUpToUsBranding } from 'utils'

const AppBarButton = styled(Button)`
  -moz-transition: none;
  -webkit-transition: none;
  -o-transition: color 0 ease-in;
  transition: none;
  background-image: ${({ disabled }) =>
    disabled ? 'none' : (showUpToUsBranding() ? uptousButtons : frekklsButtons).primaryGradient.backgroundImage};
  background-color: ${({ disabled }) => (disabled ? 'rgba(51, 51, 51, 0.25) !important' : 'transparent')};
  color: white;
  overflow: hidden;
  white-space: nowrap;
  &:hover {
    background-image: none;
    background-color: ${(showUpToUsBranding() ? uptousButtons : frekklsButtons).primaryGradient.hover.backgroundColor};
  }
`

export default AppBarButton
