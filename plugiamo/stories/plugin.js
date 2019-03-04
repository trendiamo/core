import DefaultLauncher from 'app/launcher/original'
import { AppBase } from 'app/index'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const Plugin = compose(
  withProps({
    persona: {
      name: 'Jon Snow',
      description: "I don't even know who my mother was. Don’t call me Lord Snow.",
      profilePic: { url: 'https://randomuser.me/api/portraits/men/1.jpg' },
    },
  }),
  withState('showingContent', 'setShowingContent', false),
  withHandlers({
    onToggleContent: ({ setShowingContent, showingContent, data }) => () => {
      if (data && data.flowType === 'outro') return
      setShowingContent(!showingContent)
    },
  })
)(({ Component, onToggleContent, persona, showingContent, Launcher, data }) => (
  <AppBase
    Component={Component}
    data={data}
    Launcher={Launcher || DefaultLauncher}
    onToggleContent={onToggleContent}
    persona={persona}
    showingContent={showingContent}
  />
))

export default Plugin
