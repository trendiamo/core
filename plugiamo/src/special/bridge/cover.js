import Background from 'app/content/simple-chat/cover/background'
import Content from 'app/content/simple-chat/cover/content'
import { compose, withProps } from 'recompose'
import { Cover, headerConfig as defaultHeaderConfig } from 'plugin-base'
import { h } from 'preact'

const CoverBridge = ({ header, minimized, headerConfig, clickActions }) => (
  <Cover backgroundColor={header.backgroundColor} hackathon headerConfig={headerConfig} minimized={minimized}>
    <Background header={header} headerConfig={headerConfig} minimized={minimized} />
    <Content clickActions={clickActions} header={header} headerConfig={headerConfig} minimized={minimized} />
  </Cover>
)

export default compose(
  withProps(({ headerConfig }) => ({
    headerConfig: { ...defaultHeaderConfig, ...headerConfig },
  }))
)(CoverBridge)
