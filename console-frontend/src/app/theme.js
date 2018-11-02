import { createMuiTheme } from '@material-ui/core/styles'

const typography = {
  body1: {
    color: 'rgba(0,0,0,.6)',
    letterSpacing: '0.5px',
  },
  button: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  caption: {
    letterSpacing: '0.4px',
  },
  display1: {
    color: '#32333d',
    fontSize: '33.4px',
    letterSpacing: '0.3px',
  },
}

const palette = {
  background: {
    default: '#f2f4f7',
  },
  error: {
    main: '#b00020',
  },
  primary: {
    contrastText: '#fff',
    main: '#0560ff',
  },
  secondary: {
    contrastText: '#fff',
    main: '#ffaa00', // weird color is temporary here: make sure we're not using this yet.
  },
  text: {
    disabled: '#ccc',
    hint: '#ddd',
  },
}

const theme = createMuiTheme({
  // These colors are not in MUI definitions, but we use it for our own purposes
  customPalette: {
    appBar: {
      main: '#fff',
    },
    appBarMobile: {
      main: '#32333d',
    },
    sidebar: {
      main: '#32333d',
    },
    success: {
      main: '#14c29d',
    },
  },
  palette,
  shape: {
    borderRadius: 8,
  },
  typography,
})

export default theme
