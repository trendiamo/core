export const drawerWidth = 256
export const drawerWidthClosed = 70
const avatarSize = 64
const avatarSizeClosed = 48

export const styles = theme => ({
  accountArrow: {
    color: '#fff',
    opacity: 1,
    position: 'absolute',
    right: '10px',
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
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
    backgroundColor: theme.customPalette.appBar.main,
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.12)',
    color: '333',
    transition: theme.transitions.create(['width', 'margin', 'backgroundColor'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidthClosed}px)`,
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.customPalette.appBarMobile.main,
      width: '100%',
    },
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appFrame: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    height: avatarSize,
    margin: '20px',
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: avatarSize,
  },
  avatarClosed: {
    height: avatarSizeClosed,
    margin: '9px 7px 7px',
    width: avatarSizeClosed,
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
    border: 'none',
    boxShadow: '0 16px 16px 0 rgba(0, 0, 0, 0.24), 0 0 16px 0 rgba(0, 0, 0, 0.18)',
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
      marginTop: 0,
      position: 'inherit',
    },
    [theme.breakpoints.up('xs')]: {
      marginTop: 0,
    },
    zIndex: 5000,
  },
  drawerPaperClose: {
    background: theme.customPalette.sidebar.main,
    border: 'none',
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
      width: drawerWidthClosed,
    },
  },
  menuButton: {
    color: '#777',
    marginRight: '6px',
    [theme.breakpoints.down('sm')]: {
      color: '#fff',
    },
  },
  menuIcon: {
    color: '#ddd',
    paddingRight: '20px',
  },
  menuIconActive: {
    color: '#fff',
    paddingRight: '20px',
  },
  menuItem: {
    transition: theme.transitions.create(['padding', 'height', 'visibility'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    visibility: 'visible',
  },
  menuItemClosed: {
    paddingLeft: 18,
    paddingRight: 0,
  },
  menuItemHidden: {
    height: 0,
    overflow: 'hidden',
    paddingBottom: 0,
    paddingTop: 0,
    visibility: 'hidden',
  },
  menuText: {
    color: '#7f8086',
  },
  menuTextActive: {
    color: '#fff',
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
    color: '#777',
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.primary.contrastText,
    },
  },
  toolbar: {
    paddingRight: 14,
  },
  topToolbar: {
    paddingLeft: 14,
    paddingRight: 14,
  },
})
