export const drawerWidth = 256
export const drawerWidthClosed = 70
const avatarSize = 46

// Add transitions with different params here and use it in createTransition by providing key as type attribute.
const transitions = theme => ({
  standard: {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  },
})

const createTransition = (theme, style, type = 'standard') => {
  return theme.transitions.create(style, transitions(theme)[type])
}

export const styles = theme => ({
  accountArrow: {
    color: '#757575',
    opacity: 1,
    position: 'absolute',
    right: '10px',
    transition: createTransition(theme, ['opacity']),
  },
  accountArrowHidden: {
    opacity: 0,
  },
  accountMenu: {
    left: '-10px',
  },
  accountMenuItem: {
    padding: '15px 21px',
    width: drawerWidth - 55,
  },
  accountMenuText: {
    marginLeft: '10px',
  },
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: '#333',
    transition: createTransition(theme, ['width', 'margin', 'backgroundColor']),
    width: `calc(100% - ${drawerWidthClosed}px)`,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      transition: createTransition(theme, ['width', 'margin']),
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarButton: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.primary.main,
    },
  },
  appFrame: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    height: avatarSize,
    marginRight: '10px',
    transition: createTransition(theme, ['width', 'height', 'margin']),
    width: avatarSize,
  },
  buttonLarge: {
    color: theme.palette.grey.A700,
    letterSpacing: '1.3px',
    marginTop: 25,
    padding: '12px 80px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: '60px',
    padding: theme.spacing.unit * 2,
    paddingTop: '4px',
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
      padding: 14,
      paddingTop: '4px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  drawerGhost: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
    transition: createTransition(theme, ['width']),
  },
  drawerGhostClosed: {
    width: drawerWidthClosed,
  },
  contentInnerDiv: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  contentWithSidebar: {
    display: 'flex',
    flexGrow: 1,
    minHeight: '100vh',
  },
  drawerPaper: {
    background: theme.customPalette.sidebar.main,
    border: 'none',
    paddingLeft: '10px',
    '&:before': {
      content: '""',
      backgroundImage: 'linear-gradient(to bottom, #ff843e, #ff6c40 52%, #ff5642);',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '10px',
    },
    boxShadow: '0 16px 16px 0 rgba(0, 0, 0, 0.24), 0 0 16px 0 rgba(0, 0, 0, 0.18)',
    flex: '1',
    marginTop: 0,
    minHeight: '100vh',
    position: 'fixed',
    transition: createTransition(theme, ['width']),
    whiteSpace: 'nowrap',
    width: drawerWidth,
    [theme.breakpoints.only('xs')]: {
      marginTop: 0,
      position: 'inherit',
    },
    [theme.breakpoints.up('xs')]: {
      marginTop: 0,
    },
    zIndex: 5000,
  },
  drawerPaperClose: {
    backgroundImage: 'linear-gradient(178deg, #ff843e, #ff6c40 52%, #ff5642)',
    border: 'none',
    flex: '1',
    marginTop: 0,
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'fixed',
    transition: createTransition(theme, ['width']),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidthClosed,
    },
  },
  loadingContainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    margin: '5px 0px',
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 0,
    zIndex: 1000,
  },
  loadingIcon: {
    height: '80px',
    marginBottom: '20px',
    width: '80px',
  },
  loadingInnerContainer: {
    bottom: 0,
    display: 'inline-block',
    position: 'fixed',
    textAlign: 'center',
    top: '64px',
  },
  loadingMessage: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  menuIcon: {
    color: '#222',
    paddingRight: '20px',
  },
  menuIconClosed: {
    color: 'rgba(255,255,255,0.6)',
  },
  menuIconClosedActive: {
    color: '#fff',
  },
  menuItem: {
    flexShrink: 0,
    transition: createTransition(theme, ['padding', 'height', 'visibility']),
    visibility: 'visible',
  },
  menuItemActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  menuItemClosed: {
    backgroundColor: 'transparent',
    paddingLeft: 22,
    paddingRight: 0,
  },
  menuText: {
    color: '#222',
  },
  menuTextActive: {
    fontWeight: 'bold',
  },
  menuTextHidden: {
    display: 'none',
  },
  notFoundTitle: {
    color: '#fb0',
  },
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: 'fit-content',
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  title: {
    color: '#333',
    display: 'inline-block',
    fontWeight: 500,
    letterSpacing: '0.3px',
    fontSize: '24px',
    marginRight: '2px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  },
  titleResponsive: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  titleHighlight: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
  toolbar: {
    paddingRight: 14,
  },
  topToolbar: {
    paddingLeft: 14,
    paddingRight: 14,
    display: 'flex',
  },
})
