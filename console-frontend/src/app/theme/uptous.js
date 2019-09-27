const typography = {
  useNextVariants: true,
  fontFamily: 'Nunito Sans, "Helvetica", "Arial", sans-serif',
  subtitle1: {
    color: '#272932',
    fontFamily: 'Lato, "Helvetica", "Arial", sans-serif',
    fontSize: '14px',
    letterSpacing: '0.3px',
    lineHeight: 1.2,
    fontWeight: 700,
  },
  subtitle2: {
    color: '#272932',
    fontFamily: 'Lato, "Helvetica", "Arial", sans-serif',
    fontSize: '16px',
    letterSpacing: '0.3px',
    lineHeight: 1.2,
    fontWeight: 700,
  },
  body2: {
    color: '#272932',
    fontFamily: 'Lato, "Helvetica", "Arial", sans-serif',
    fontSize: '16px',
    lineHeight: 1.2,
  },
  button: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  caption: {
    color: '#8799a4',
    fontSize: '16px',
    fontFamily: 'Lato, "Helvetica", "Arial", sans-serif',
    lineHeight: 1.2,
  },
  h4: {
    color: '#3a3a3a',
    fontSize: '33.4px',
    letterSpacing: '0.3px',
  },
  h5: {
    color: '#272932',
    fontWeight: 900,
    fontSize: '20px',
    margin: '4px 0px',
  },
  h6: {
    color: '#272932',
    fontWeight: 900,
    fontSize: '16px',
    fontFamily: 'Lato, "Helvetica", "Arial", sans-serif',
    margin: '4px 0px',
    lineHeight: 1.2,
  },
  overline: {
    fontSize: '16px',
    color: '#272932',
    fontWeight: 900,
    textTransform: 'uppercase',
    lineHeight: 1.3,
  },
}

const palette = {
  background: {
    default: '#e7ecef',
  },
  error: {
    main: '#dc4343',
  },
  primary: {
    contrastText: '#fff',
    main: '#0f7173',
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
    main: '#0f7173',
  },
}

const buttons = {
  error: {
    backgroundColor: '#F05C5D',
    color: '#fff',
    borderRadius: 0,
    boxShadow: 'none',
    hover: {
      backgroundColor: '#F05C5D',
      color: '#fff',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  disabled: {
    backgroundImage: 'none',
    backgroundColor: '#B7C2C9',
    color: '#fff',
    borderRadius: 0,
  },
  primaryGradient: {
    backgroundColor: '#0f7173',
    color: '#fff',
    borderRadius: 0,
    boxShadow: 'none',
    hover: {
      backgroundImage: 'none',
      backgroundColor: '#0f7173',
      color: '#fff',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  white: {
    background: '#e7ecef',
    color: '#0f7173',
    borderRadius: 0,
    boxShadow: 'none',
    hover: {
      color: '#0f7173',
      background: '#e7ecef',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },
  whiteBg: {
    background: '#fff',
    color: '#0f7173',
    borderRadius: 0,
    boxShadow: 'none',
    hover: {
      color: '#0f7173',
      background: '#fff',
      boxShadow: 'none',
      borderRadius: 0,
    },
  },
  golden: {
    color: '#fff',
    background: '#ffb400',
    borderRadius: 0,
    boxShadow: 'none',
    hover: {
      color: '#fff',
      background: '#ffb400',
      borderRadius: 0,
      boxShadow: 'none',
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
  secondaryBg: {
    backgroundColor: '#8799a4',
    color: '#fff',
  },
  primaryText: {
    hover: {
      color: '#16e3b8',
    },
  },
  secondaryText: {
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  actions: {
    backgroundColor: '#fff',
    color: '#16e3b8',
    hover: {
      color: '#12e5c4',
    },
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
