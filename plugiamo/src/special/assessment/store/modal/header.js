import Cover from 'app/content/scripted-chat/components/cover'
import { h } from 'preact'

const config = {
  heights: { min: 200, max: 200 },
  titleStyle: {
    fontSize: '32px',
    maxWidth: '320px',
    maxHeight: '100px',
    marginBottom: '0',
  },
  contentContainerStyle: {
    width: '320px',
    left: '50px',
  },
}

const Header = ({ header, coverMinimized, goToPrevStep }) => (
  <Cover
    assessment
    config={config}
    goToPrevStep={goToPrevStep}
    minimized={coverMinimized}
    showBackButton
    step={{ header }}
  />
)

export default Header
