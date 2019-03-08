import Cover from 'app/content/scripted-chat/components/cover'
import { h } from 'preact'

const config = {
  heights: { min: 200, max: 200 },
  titleStyle: {
    fontSize: '32px',
    maxWidth: '320px',
  },
  contentContainerStyle: {
    width: '320px',
    left: '50px',
  },
}

const Header = ({ header, coverMinimized }) => (
  <Cover config={config} hackathon header={header} minimized={coverMinimized} />
)

export default Header