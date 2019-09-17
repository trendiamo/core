import frekklsTheme from './frekkls'
import uptousTheme from './uptous'
import { createMuiTheme } from '@material-ui/core/styles'
import { showUpToUsBranding } from 'utils'

const theme = createMuiTheme(showUpToUsBranding() ? uptousTheme : frekklsTheme)

export default theme
