import CoverAssessment from './versions/cover-assessment'
import CoverBridge from './versions/cover-bridge'
import CoverSimpleChat from './versions/cover-simple'
import defaultHeaderConfig from './header-config'
import { branch, compose, renderComponent, withProps } from 'recompose'

export default compose(
  withProps(({ headerConfig }) => ({
    headerConfig: { ...defaultHeaderConfig, ...headerConfig },
  })),
  branch(({ bridge }) => bridge, renderComponent(CoverBridge)),
  branch(({ assessment }) => assessment, renderComponent(CoverAssessment))
)(CoverSimpleChat)
