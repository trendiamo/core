import auth from 'auth'
import resources from './resources'

const resourceGroups = () => {
  return {
    main: {
      name: 'Main',
      showTitle: false,
      resources: auth.isAdmin()
        ? auth.getAccount().websitesAttributes[0].isECommerce
          ? [resources.dataDashboard, resources.triggers]
          : [resources.triggers]
        : [resources.triggers],
    },
    modules: {
      name: 'Modules',
      showTitle: true,
      resources: [resources.showcases, resources.simpleChats, resources.outros],
    },
    basic: {
      name: 'Basics',
      showTitle: true,
      resources: [resources.images, resources.sellers],
    },
    tools: {
      name: 'Tools',
      showTitle: true,
      resources: [resources.urlGenerator],
    },
    settings: {
      name: 'Settings',
      showTitle: true,
      resources: [resources.theme, resources.account],
    },
  }
}

const editorResourceGroups = () => {
  return {
    modules: {
      name: 'Modules',
      showTitle: true,
      resources: [resources.simpleChats],
    },
    basic: {
      name: 'Basics',
      showTitle: true,
      resources: [resources.images],
    },
  }
}

const affiliateResourceGroups = () => {
  return {
    modules: {
      name: 'Main',
      showTitle: false,
      resources: [
        resources.revenues,
        resources.affiliatePartners,
        resources.yourReferrals,
        resources.contentCreation,
        resources.requestSamples,
      ],
    },
  }
}

export { resourceGroups, editorResourceGroups, affiliateResourceGroups }
