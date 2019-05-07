import getFrekklsConfig from 'frekkls-config'
import { h } from 'preact'
import { SimpleChatCover } from 'plugin-base'

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
    goToPrevStep={goToPrevStep}
    headerConfig={headerConfig}
    minimized={coverMinimized}
    showBackButton
    step={step}
  />
)

export default Header
