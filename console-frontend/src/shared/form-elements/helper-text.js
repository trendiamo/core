import { FormHelperText } from '@material-ui/core'
import { memo } from 'react'

// children !== children is always true because of React.createElement(...)
// that returns a new object instance everytime. "Pure" will not work in this case.
// This component, for now, isn't dynamic, so just returning true here.
export default memo(FormHelperText, () => true)
