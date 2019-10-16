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

const buttons = {
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
  oAuthPrimary: {
    background: '#fff',
    color: '#3a3a3a',
    hover: {
      background: '#fff',
      color: '#3a3a3a',
    },
  },
  white: {
    background: '#fff',
    hover: {
      background: '#f3f3f3',
    },
  },
  success: {
    background: customPalette.success.main,
    color: '#fff',
    borderRadius: 0,
    boxShadow: 'none',
    hover: {
      color: '#fff',
      background: customPalette.success.main,
      borderRadius: 0,
      boxShadow: 'none',
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

const typography = {
  useNextVariants: true,
  fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
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

const theme = {
  buttons,
  // These colors are not in Mui definitions, but we use it for our own purposes
  customPalette,
  palette,
  shape: {
    borderRadius: 4,
  },
  typography,
}

export default theme
