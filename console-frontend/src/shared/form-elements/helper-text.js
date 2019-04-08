import { compose, shouldUpdate } from 'recompose'
import { FormHelperText } from '@material-ui/core'

export default compose(
  shouldUpdate(() => {
    // children !== children is always true because of React.createElement(...)
    // that returns a new object instance everytime. "Pure" will not work in this case.
    // This component, for now, isn't dynamic, so just returning false here.
    return false
  })
)(FormHelperText)
