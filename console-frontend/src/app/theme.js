import { createMuiTheme } from '@material-ui/core/styles'

const typography = {
  useNextVariants: true,
  body1: {
    color: 'rgba(0,0,0,.6)',
    fontSize: '13.7px',
    letterSpacing: '0.3px',
  },
  body2: {
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
  h4: {
    color: '#3a3a3a',
    fontSize: '33.4px',
    letterSpacing: '0.3px',
  },
}

const palette = {
  background: {
    default: '#f5f5f5',
  },
  error: {
    main: '#dc4343',
  },
  primary: {
    contrastText: '#fff',
    main: '#ff6641',
  },
  secondary: {
    contrastText: '#fff',
    main: '#ffaa00', // weird color is temporary here: make sure we're not using this yet.
  },
  text: {
    disabled: '#999',
    hint: '#999',
  },
  action: {
    disabled: '#fff',
    disabledBackground: '#575a6a',
  },
}

const customButtons = {
  error: {
    backgroundColor: '#dc4343',
    color: '#fff',
  },
  disabled: {
    backgroundImage: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
  },
  primaryGradient: {
    backgroundImage: 'linear-gradient(132deg, #ff843e, #ff6c40 52%, #ff5642)',
    backgroundColor: '#ff6641',
    color: '#fff',
    hover: {
      backgroundImage: 'none',
      backgroundColor: '#ff6641',
      color: '#fff',
    },
  },
  primaryText: {
    hover: {
      color: '#ff6641',
    },
  },
}

const customPalette = {
  appBar: {
    main: '#fff',
  },
  appBarMobile: {
    main: '#3a3a3a',
  },
  sidebar: {
    main: '#fff',
  },
  success: {
    main: '#14c29d',
  },
}

const theme = createMuiTheme({
  // These colors are not in Mui definitions, but we use it for our own purposes
  customButtons,
  customPalette,
  palette,
  shape: {
    borderRadius: 4,
  },
  typography,
  overrides: {
    MuiFormHelperText: {
      root: {
        fontSize: '13px',
        fontWeight: '100',
        color: '#32333d',
        marginTop: '4px',
      },
    },
  },
})

export default theme
