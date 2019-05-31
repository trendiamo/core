/* eslint-disable max-lines */
const header = {
  title: 'Nico de Roy',
  subtitle: 'Designer @ Pierre Cardin',
  imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy_small.jpg',
  animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
  backgroundColor: '#fff',
  textColor: '#111',
  backButton: {
    textColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}

export const suggestions = {
  'Casual/Jeans und Hosen': ['Casual/Oberteile/Polos', 'Casual/Sakkos', 'Casual/Oberteile/Pullover'],
  'Casual/Jacken/Blousons': ['Casual/Jeans und Hosen', 'Casual/Oberteile/Pullover', 'Casual/Oberteile/Polos'],
  'Casual/Jacken/Mäntel': ['Casual/Jeans und Hosen', 'Casual/Oberteile/Hemden'],
  'Casual/Jacken/Jacken': ['Casual/Jeans und Hosen', 'Casual/Oberteile/Polos'],
  'Casual/Jacken/Westen': ['Casual/Jeans und Hosen', 'Casual/Oberteile/Pullover'],
  'Casual/Oberteile/T-Shirts': ['Casual/Jeans und Hosen', 'Casual/Oberteile/Pullover'],
  'Casual/Oberteile/Polos': ['Casual/Jeans und Hosen', 'Casual/Jacken/Jacken'],
  'Casual/Oberteile/Hemden': ['Casual/Jeans und Hosen', 'Casual/Sakkos', 'Casual/Oberteile/Pullover'],
  'Casual/Oberteile/Pullover': ['Casual/Jeans und Hosen', 'Casual/Jacken/Blousons'],
  'Casual/Sakkos': ['Casual/Jeans und Hosen', 'Casual/Oberteile/Hemden'],
  'Business/Komplettanzüge': ['Business/Hemden', 'Business/Westen', 'Business/Accessoires/Krawatten & Einstecktücher'],
  'Business/Sakkos': ['Business/Hemden', 'Business/Anzughosen'],
  'Business/Westen': ['Business/Hemden', 'Business/Sakkos'],
  'Business/Anzughosen': ['Business/Hemden', 'Business/Sakkos'],
  'Business/Hemden': ['Business/Sakkos', 'Business/Komplettanzüge'],
  'Business/Accessoires/Gürtel': ['Business/Komplettanzüge', 'Business/Anzughosen'],
  'Business/Accessoires/Krawatten & Einstecktücher': ['Business/Komplettanzüge', 'Business/Sakkos'],
  'Basics/Wäsche': ['Basics/Jeans und Hosen', 'Basics/Oberteile'],
  'Basics/Jeans und Hosen': ['Basics/Oberteile', 'Basics/Jacken'],
  'Basics/Oberteile': ['Basics/Jeans und Hosen', 'Basics/Jacken'],
  'Basics/Jacken': ['Basics/Jeans und Hosen', 'Basics/Oberteile'],
}

const data = {
  assessment: {
    flowType: 'ht-assessment',
    persona: {
      description: 'Designer der Hosen. Ich würde Dir gern meine Key Looks für die neue Saison vorstellen!',
      name: 'Nico de Roy',
      profilePic: {
        url:
          'https://console-assets.ams3.digitaloceanspaces.com/uploads/personas-profile-pics/cd2692b6/Nico-de-Roy.jpg',
      },
    },
    steps: {
      root: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Willkommen bei Pierre Cardin! Ich würde dir gerne die für dich relevantesten Pieces zeigen.',
                },
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Mit welchem Look kann ich dir helfen?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0002_1_casual.png.jpg',
                      title: 'Casual',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0000_1_basics.png.jpg',
                      title: 'Basics',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0001_1_business.png.jpg',
                      title: 'Business',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0003_1_specials.png.jpg',
                      title: 'Specials',
                      url: 'https://www.pierre-cardin.de/specials/pierre-cardin-specials/summer-specials',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Casual: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Alles klar! Womit wollen wir anfangen?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0013_2_jeans_hosen.png.jpg',
                      title: 'Jeans und Hosen',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0012_2_jacken.png.jpg',
                      title: 'Jacken',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0015_2_oberteile.png.jpg',
                      title: 'Oberteile',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0010_2_casual_sakkos.png.jpg',
                      title: 'Sakkos',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Business: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Alles klar! Womit wollen wir anfangen?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0014_2_komplettanzu%CC%88ge.png.jpg',
                      title: 'Komplettanzüge',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0009_2_business_sakkos.png.jpg',
                      title: 'Sakkos',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0017_2_westen.png.jpg',
                      title: 'Westen',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0005_2_anzughosen.png.jpg',
                      title: 'Anzughosen',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0011_2_hemden.png.jpg',
                      title: 'Hemden',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0004_2_accessoires.png.jpg',
                      title: 'Accessoires',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Basics: {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Alles klar! Wonach schaust du genau?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0016_2_wasche.png.jpg',
                      title: 'Wäsche',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0007_2_basics_jeans_hosen.png.jpg',
                      title: 'Jeans und Hosen',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0008_2_basics_oberteile.png.jpg',
                      title: 'Oberteile',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0006_2_basics_jacken.png.jpg',
                      title: 'Jacken',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Casual/Jeans und Hosen': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text:
                    'Super! Wir haben gerade auf unsere neue Frühling / Sommer Kollektion umgestellt. Welchen Fit sollte die Hose haben? Du kannst mehrere auswählen!',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0030_3_jeans_regular_fit.png.jpg',
                      title: 'Regular Fit',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0032_3_jeans_tapered_fit.png.jpg',
                      title: 'Tapered Fit',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0031_3_jeans_slim_fit.png.jpg',
                      title: 'Slim Fit',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/3_jeans_comfort_fit.jpg',
                      title: 'Comfort Fit',
                    },
                  ],
                },
                {
                  type: 'SimpleChatTextMessage',
                  text:
                    'Falls du dir unsicher bist, welche unserer Jeans-Passformen die für dich beste ist, kannst du hier nachschauen: <a target="_blank" rel="noopener noreferrer" href="https://www.pierre-cardin.de/specials/pierre-cardin-specials/denim-guide">Zum Denim Guide</a>',
                },
              ],
            },
          ],
        },
      },
      'Casual/Jacken': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text:
                    'Ok! Wir haben die verschiedensten Typen im Angebot. Wonach suchst du genau? Du kannst gerne mehrere Optionen auswählen!',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0020_3_blousons.png.jpg',
                      title: 'Blousons',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0034_3_mantel.png.jpg',
                      title: 'Mäntel',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0028_3_jacke.png.jpg',
                      title: 'Jacken',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0040_3_westen.png.jpg',
                      title: 'Westen',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Casual/Oberteile': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Cool! Womit können wir dir dienen? Du kannst gerne mehrere Optionen auswählen!',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0039_3_tshirts.png.jpg',
                      title: 'T-Shirts',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0035_3_polos.png.jpg',
                      title: 'Polos',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0027_3_hemnden.png.jpg',
                      title: 'Hemden',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0036_3_pullover.png.jpg',
                      title: 'Pullover',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Casual/Sakkos': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text:
                    'Super Wahl für ein Frühling reifes Smart Casual Outfit! Magst du mir einmal deinen Fit verraten?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0038_3_sakkos_slim_fit.png.jpg',
                      title: 'Slim Fit',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0037_3_sakkos_regular_fit.png.jpg',
                      title: 'Regular Fit',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Business/Sakkos': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Ok! Magst du mir einmal deinen Fit verraten? ',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0022_3_business_sakkos_slim_fit.png.jpg',
                      title: 'Slim Fit',
                      endNode: true,
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0021_3_business_sakkos_regular_fit.png.jpg',
                      title: 'Regular Fit',
                      endNode: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Business/Anzughosen': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text: 'Welchen Fit trägst du normalerweise?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0019_3_anzughosen_slim_fit.png.jpg',
                      title: 'Slim Fit',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0018_3_anzughosen_regular_fit.png.jpg',
                      title: 'Regular Fit',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Business/Hemden': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text:
                    'Von Schlicht bis Hingucker haben wir alles im Angebot! Aber zuerst müsste ich einmal wissen welchen Fit du trägst.',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0024_3_hemden_modern_fit.png.jpg',
                      title: 'Modern Fit',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0025_3_hemden_shaped_fit.png.jpg',
                      title: 'Shaped Fit',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Business/Accessoires': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  text:
                    'Zu jedem guten Business Outfit gehört ein passender Gürtel und ein passendes Einstecktuch oder eine Krawatte. Suchst du nach beidem?',
                },
                {
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0023_3_gurtel.png.jpg',
                      title: 'Gürtel',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0033_3_krawatten_eintecktucher.png.jpg',
                      title: 'Krawatten & Einstecktücher',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      store: {
        type: 'store',
        header: {
          title: 'Empfohlene Produkte für deinen Style',
          imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/list_modal_header.jpg',
          backgroundColor: '#111',
          textColor: '#fff',
          backButton: {
            textColor: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
  },
  cart: {
    flowType: 'asmt-cart',
    header,
    launcher: {
      chatBubbleText: 'Lust auf weitere Ergänzungen?',
      persona: {
        name: 'Nico de Roy',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
        },
      },
    },
    simpleChat: {
      simpleChatSteps: [
        {
          key: 'default',
          simpleChatMessages: [
            {
              type: 'SimpleChatTextMessage',
              text:
                'Hier sind ein paar Produkte die zu deiner bisherigen Auswahl passen und gerne von unseren Kunden kombiniert werden! 🙂',
            },
          ],
        },
      ],
    },
  },
  sizeGuide: {
    flowType: 'asmt-size-guide',
    header,
    launcher: {
      chatBubbleText: 'Brauchst du Hilfe bei der Größenwahl?',
      persona: {
        name: 'Nico de Roy',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
        },
      },
    },
    closedLauncher: {
      chatBubbleText: 'Wir sehen uns an der Kasse! 🙂',
      persona: {
        name: 'Nico de Roy',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
        },
      },
    },
    simpleChat: {
      simpleChatSteps: [
        {
          key: 'default',
          simpleChatMessages: [
            {
              type: 'SimpleChatTextMessage',
              text:
                'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
            },
            {
              type: 'SimpleChatProductMessage',
              url: 'https://www.pierre-cardin.de/size-advisor',
              picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide.jpg',
              title: 'Zur Größentabelle',
              displayPrice: '',
              newTab: true,
            },
          ],
        },
      ],
    },
  },
}

export default data
