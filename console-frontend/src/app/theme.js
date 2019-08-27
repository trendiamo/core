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

export const frekklsButtons = {
  error: {
    backgroundColor: '#dc4343',
    color: '#fff',
  },
  disabled: {
    backgroundImage: 'none',
    backgroundColor: 'rgba(51, 51, 51, 0.25)',
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
  secondaryText: {
    color: 'rgba(0, 0, 0, 0.6)',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
  },
  actions: {
    backgroundColor: '#fff',
    color: '#ff6641',
    hover: {
      color: '#ff6641',
    },
  },
}

export const uptousButtons = {
  error: {
    backgroundColor: '#dc4343',
    color: '#fff',
  },
  disabled: {
    backgroundImage: 'none',
    backgroundColor: 'rgba(51, 51, 51, 0.25)',
    color: '#fff',
  },
  primaryGradient: {
    backgroundImage: 'linear-gradient(to right, #12e5c4, #18e0aa)',
    backgroundColor: '#16e3b8',
    color: '#fff',
    hover: {
      backgroundImage: 'none',
      backgroundColor: '#16e3b8',
      color: '#fff',
    },
  },
  primaryText: {
    hover: {
      color: '#16e3b8',
    },
  },
  secondaryText: {
    color: 'rgba(0, 0, 0, 0.6)',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
  },
  actions: {
    backgroundColor: '#fff',
    color: '#16e3b8',
    hover: {
      color: '#12e5c4',
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
  frekklsButtons,
  uptousButtons,
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
