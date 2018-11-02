export const drawerWidth = 256
export const drawerWidthClosed = 64

export const styles = theme => ({
  appBar: {
    backgroundColor: theme.customPalette.appBar.main,
    color: '333',
    transition: theme.transitions.create(['width', 'margin', 'backgroundColor'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.customPalette.appBarMobile.main,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  appFrame: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: '60px',
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('xs')]: {
      padding: 14,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  contentWithSidebar: {
    display: 'flex',
    flexGrow: 1,
  },
  drawerPaper: {
    background: theme.customPalette.sidebar.main,
    flex: '1',
    marginTop: 0,
    minHeight: '100vh',
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
    [theme.breakpoints.only('xs')]: {
      backgroundColor: theme.palette.background.default,
      marginTop: 0,
      position: 'inherit',
    },
    [theme.breakpoints.up('xs')]: {
      border: 'none',
      marginTop: 0,
    },
  },
  drawerPaperClose: {
    background: theme.customPalette.sidebar.main,
    flex: '1',
    marginTop: 0,
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  menuButton: {
    color: '#333',
    [theme.breakpoints.down('sm')]: {
      color: '#fff',
    },
  },
  menuItem: {
    color: '#fff',
  },
  menuItemActive: {
    color: '#0560ff',
  },
  menuItemIcon: {
    color: '#fff',
    paddingRight: '20px',
  },
  menuItemIconActive: {
    color: '#0560ff',
    paddingRight: '20px',
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
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.primary.contrastText,
    },
  },
  toolbar: {
    paddingRight: 14, // keep right padding when drawer closed
  },
})
