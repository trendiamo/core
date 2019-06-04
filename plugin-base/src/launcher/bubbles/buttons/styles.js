import { positioning } from 'tools'

const containerStyle = ({ position, action, launcherConfig, offset }) => ({
  position: 'fixed',
  display: 'flex',
  width: '225px',
  height: '40px',
  zIndex: '2147483005',
  justifyContent: 'space-between',
  pointerEvents: action === 'disappear' && 'none',
  ...positioning.get({ type: 'launcherBubbles', position, noStyle: true, reset: true, launcherConfig, offset }),
})

const buttonContainerStyle = ({ hasMargin }) => ({
  flex: 1,
  display: 'flex',
  [hasMargin && 'marginRight']: '10px',
  justifyContent: 'center',
  alignItems: 'center',
})

export { containerStyle, buttonContainerStyle }
