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
      name: 'Basic',
      showTitle: true,
      resources: [resources.pictures, resources.personas],
    },
    tools: {
      name: 'Tools',
      showTitle: true,
      resources: [resources.urlGenerator],
    },
    settings: {
      name: 'Settings',
      showTitle: true,
      resources: [resources.theme],
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
      name: 'Basic',
      showTitle: true,
      resources: [resources.pictures],
    },
  }
}

export { resourceGroups, editorResourceGroups }
