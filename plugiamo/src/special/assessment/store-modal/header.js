import getFrekklsConfig from 'frekkls-config'
import SimpleChatCover from 'app/content/scripted-chat/cover'
import { h } from 'preact'

const headerConfig = {
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

const Header = ({ step, coverMinimized, goToPrevStep }) => (
  <SimpleChatCover
    assessment
    backButtonLabel={getFrekklsConfig().i18n.backButton}
    big
    goToPrevStep={goToPrevStep}
    headerConfig={headerConfig}
    minimized={coverMinimized}
    showBackButton
    step={step}
  />
)

export default Header
