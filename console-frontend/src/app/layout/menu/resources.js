import routes from 'app/routes'
import {
  AccountCircleOutlined,
  AssignmentTurnedInOutlined,
  BarChart,
  Link as LinkIcon,
  Palette,
  PersonPinOutlined,
  PhotoLibrary,
  SettingsOutlined,
  SmsOutlined,
  TuneOutlined,
} from '@material-ui/icons'

const resources = {
  account: {
    icon: SettingsOutlined,
    label: 'Account',
    class: 'account',
    route: () => routes.settingsAccount(),
  },
  dataDashboard: {
    icon: BarChart,
    label: 'Data Dashboard',
    class: 'dataDashboard',
    route: () => routes.dataDashboard(),
  },
  triggers: {
    icon: TuneOutlined,
    label: 'Triggers',
    class: 'triggers',
    route: () => routes.triggersList(),
  },
  showcases: {
    icon: PersonPinOutlined,
    label: 'Showcases',
    class: 'showcases',
    route: () => routes.showcasesList(),
  },
  simpleChats: {
    icon: SmsOutlined,
    label: 'Simple Chats',
    class: 'simple-chats',
    route: () => routes.simpleChatsList(),
  },
  outros: {
    icon: AssignmentTurnedInOutlined,
    label: 'Outros',
    class: 'outros',
    route: () => routes.outrosList(),
  },
  sellers: {
    icon: AccountCircleOutlined,
    label: 'Sellers',
    class: 'sellers',
    route: () => routes.sellersList(),
  },
  images: {
    icon: PhotoLibrary,
    label: 'Images',
    class: 'images',
    route: () => routes.imagesList(),
  },
  urlGenerator: {
    icon: LinkIcon,
    label: 'URL Generator',
    class: 'urlGenerator',
    route: () => routes.urlGenerator(),
  },
  theme: {
    icon: Palette,
    label: 'Theme',
    class: 'theme',
    route: () => routes.settingsTheme(),
  },
  affiliatePartners: {
    icon: '/img/icons/grocery.svg',
    label: 'Affiliate Partners',
    class: 'affiliatePartners',
    route: () => routes.affiliatePartners(),
  },
  yourReferrals: {
    icon: '/img/icons/crown.svg',
    label: 'Your Referrals',
    class: 'yourReferrals',
    route: () => routes.yourReferrals(),
  },
}

export default resources
