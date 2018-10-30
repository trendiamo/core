import { addDecorator } from '@storybook/react'
import { configure } from '@storybook/react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import theme from 'app/theme'

const loadStories = () => require('../src/stories')

const StyleDecorator = storyFn => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>
  </React.Fragment>
)
addDecorator(StyleDecorator)

configure(loadStories, module)
