import styled from 'styled-components'
import { IconButton as MuiIconButton } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const uptousButtonSizes = {
  mobile: {
    small: 'padding: 1px;',
    medium: 'padding: 5px;',
    large: 'padding: 7px;',
  },
  desktop: {
    small: 'padding: 3px;',
    medium: 'padding: 7px;',
    large: 'padding: 9px;',
  },
}

const IconButton = styled(MuiIconButton)`
  ${showUpToUsBranding()
    ? `
    border-radius: 0;
    background: #e7ecef;
    color: #0f7173;
    :hover { background: #e7ecef; }
    `
    : ''}

  ${({ size }) =>
    showUpToUsBranding() && uptousButtonSizes['mobile'][size || 'medium']}
  @media (min-width: 960px) {
    ${({ size }) => showUpToUsBranding() && uptousButtonSizes['desktop'][size || 'medium']}
  }
`

export default IconButton
