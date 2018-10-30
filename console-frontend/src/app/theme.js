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
  error: {
    main: '#b00020',
  },
  primary: {
    contrastText: '#fff',
    main: '#32333d',
  },
  secondary: {
    contrastText: '#fff',
    main: '#0560ff',
  },
  // This color is not in MUI definitions, but we use it in our success messages
  success: {
    main: '#14c29d',
  },
  text: {
    disabled: '#ccc',
    hint: '#ddd',
  },
}

const theme = createMuiTheme({
  palette,
  shape: {
    borderRadius: 8,
  },
  typography: typography,
})

export default theme
