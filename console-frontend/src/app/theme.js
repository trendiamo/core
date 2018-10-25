import { createMuiTheme } from '@material-ui/core/styles'

const typography = {
  button: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
}

const palette = {
  primary: {
    contrastText: '#fff',
    main: '#32333d',
  },
  secondary: {
    contrastText: '#fff',
    main: '#0560ff',
  },
  text: {
    disabled: '#ccc',
    hint: '#ddd',
  },
}

const theme = createMuiTheme({
  palette: palette,
  shape: {
    borderRadius: 8,
  },
  typography: typography,
})

export default theme
