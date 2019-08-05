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
  'Casual>Jeans und Hosen': ['Casual>Oberteile>Polos', 'Casual>Sakkos', 'Casual>Oberteile>Pullover'],
  'Casual>Jacken>Blousons': ['Casual>Jeans und Hosen', 'Casual>Oberteile>Pullover', 'Casual>Oberteile>Polos'],
  'Casual>Jacken>Mäntel': ['Casual>Jeans und Hosen', 'Casual>Oberteile>Hemden'],
  'Casual>Jacken>Jacken': ['Casual>Jeans und Hosen', 'Casual>Oberteile>Polos'],
  'Casual>Jacken>Westen': ['Casual>Jeans und Hosen', 'Casual>Oberteile>Pullover'],
  'Casual>Oberteile>T-Shirts': ['Casual>Jeans und Hosen', 'Casual>Oberteile>Pullover'],
  'Casual>Oberteile>Polos': ['Casual>Jeans und Hosen', 'Casual>Jacken>Jacken'],
  'Casual>Oberteile>Hemden': ['Casual>Jeans und Hosen', 'Casual>Sakkos', 'Casual>Oberteile>Pullover'],
  'Casual>Oberteile>Pullover': ['Casual>Jeans und Hosen', 'Casual>Jacken>Blousons'],
  'Casual>Sakkos': ['Casual>Jeans und Hosen', 'Casual>Oberteile>Hemden'],
  'Business>Komplettanzüge': ['Business>Hemden', 'Business>Westen', 'Business>Accessoires>Krawatten & Einstecktücher'],
  'Business>Sakkos': ['Business>Hemden', 'Business>Anzughosen'],
  'Business>Westen': ['Business>Hemden', 'Business>Sakkos'],
  'Business>Anzughosen': ['Business>Hemden', 'Business>Sakkos'],
  'Business>Hemden': ['Business>Sakkos', 'Business>Komplettanzüge'],
  'Business>Accessoires>Gürtel': ['Business>Komplettanzüge', 'Business>Anzughosen'],
  'Business>Accessoires>Krawatten & Einstecktücher': ['Business>Komplettanzüge', 'Business>Sakkos'],
  'Basics>Wäsche': ['Basics>Jeans und Hosen', 'Basics>Oberteile'],
  'Basics>Jeans und Hosen': ['Basics>Oberteile', 'Basics>Jacken'],
  'Basics>Oberteile': ['Basics>Jeans und Hosen', 'Basics>Jacken'],
  'Basics>Jacken': ['Basics>Jeans und Hosen', 'Basics>Oberteile'],
}

const data = {
  assessment: {
    flowType: 'ht-assessment',
    seller: {
      description: 'Designer der Hosen. Ich würde Dir gern meine Key Looks für die neue Saison vorstellen!',
      name: 'Nico de Roy',
      profilePic: {
        url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
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
                  html: 'Willkommen bei Pierre Cardin! Ich würde dir gerne die für dich relevantesten Pieces zeigen.',
                  id: 'root-default-0',
                },
                {
                  type: 'SimpleChatTextMessage',
                  html: 'Mit welchem Look kann ich dir helfen?',
                  id: 'root-default-1',
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
                  id: 'root-default-2',
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
                  html: 'Alles klar! Womit wollen wir anfangen?',
                  id: 'Casual-default-0',
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
                  id: 'Casual-default-1',
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
                  html: 'Alles klar! Womit wollen wir anfangen?',
                  id: 'Business-default-0',
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
                  id: 'Business-default-1',
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
                  html: 'Alles klar! Wonach schaust du genau?',
                  id: 'Basics-default-0',
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
                  id: 'Basics-default-1',
                },
              ],
            },
          ],
        },
      },
      'Casual>Jeans und Hosen': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html:
                    'Super! Wir haben gerade auf unsere neue Frühling / Sommer Kollektion umgestellt. Welchen Fit sollte die Hose haben? Du kannst mehrere auswählen!',
                  id: 'Casual/Jeans und Hosen-default-0',
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
                  id: 'Casual/Jeans und Hosen-default-1',
                },
                {
                  type: 'SimpleChatTextMessage',
                  html:
                    'Falls du dir unsicher bist, welche unserer Jeans-Passformen die für dich beste ist, kannst du hier nachschauen: <a target="_blank" rel="noopener noreferrer" href="https://www.pierre-cardin.de/specials/pierre-cardin-specials/denim-guide">Zum Denim Guide</a>',
                  id: 'Casual/Jeans und Hosen-default-2',
                },
              ],
            },
          ],
        },
      },
      'Casual>Jacken': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html:
                    'Ok! Wir haben die verschiedensten Typen im Angebot. Wonach suchst du genau? Du kannst gerne mehrere Optionen auswählen!',
                  id: 'Casual/Jacken-default-0',
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
                  id: 'Casual/Jacken-default-1',
                },
              ],
            },
          ],
        },
      },
      'Casual>Oberteile': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html: 'Cool! Womit können wir dir dienen? Du kannst gerne mehrere Optionen auswählen!',
                  id: 'Casual/Oberteile-default-0',
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
                  id: 'Casual/Oberteile-default-1',
                },
              ],
            },
          ],
        },
      },
      'Casual>Sakkos': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html:
                    'Super Wahl für ein Frühling reifes Smart Casual Outfit! Magst du mir einmal deinen Fit verraten?',
                  id: 'Casual/Sakkos-default-0',
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
                  id: 'Casual/Sakkos-default-1',
                },
              ],
            },
          ],
        },
      },
      'Business>Sakkos': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html: 'Ok! Magst du mir einmal deinen Fit verraten? ',
                  id: 'Business/Sakkos-default-0',
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
                  id: 'Business/Sakkos-default-1',
                },
              ],
            },
          ],
        },
      },
      'Business>Anzughosen': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html: 'Welchen Fit trägst du normalerweise?',
                  id: 'Business/Anzughosen-default-0',
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
                  id: 'Business/Anzughosen-default-1',
                },
              ],
            },
          ],
        },
      },
      'Business>Hemden': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html:
                    'Von Schlicht bis Hingucker haben wir alles im Angebot! Aber zuerst müsste ich einmal wissen welchen Fit du trägst.',
                  id: 'Business/Hemden-default-0',
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
                  id: 'Business/Hemden-default-1',
                },
              ],
            },
          ],
        },
      },
      'Business>Accessoires': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  type: 'SimpleChatTextMessage',
                  html:
                    'Zu jedem guten Business Outfit gehört ein passender Gürtel und ein passendes Einstecktuch oder eine Krawatte. Suchst du nach beidem?',
                  id: 'Business/Accessoires-default-0',
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
                  id: 'Business/Accessoires-default-1',
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
      seller: {
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
              html:
                'Hier sind ein paar Produkte die zu deiner bisherigen Auswahl passen und gerne von unseren Kunden kombiniert werden! 🙂',
              id: 'Cart-default-0',
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
      chatBubbleExtraText: '',
      seller: {
        name: 'Nico de Roy',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
        },
      },
    },
    closedLauncher: {
      chatBubbleText: 'Wir sehen uns an der Kasse! 🙂',
      chatBubbleExtraText: '',
      seller: {
        name: 'Nico de Roy',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
        },
      },
    },
    steps: {
      shirts: [
        {
          key: 'default',
          simpleChatMessages: [
            {
              type: 'SimpleChatTextMessage',
              html:
                'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
              id: 'SizeGuide-shirts-default-0',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/shirts_0.jpg',
                },
                {
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/Hemden_Kasual.png',
                },
              ],
              id: 'SizeGuide-shirts-default-1',
            },
            {
              type: 'SimpleChatTextMessage',
              html:
                'Wir zeigen Ihnen, wie Sie in fünf Schritten Maß nehmen, um Ihre passende <a href="https://www.pierre-cardin.de/size-advisor#hemdgroesse">Hemdgröße</a> zu ermitteln.',
              id: 'SizeGuide-shirts-default-2',
            },
          ],
        },
      ],
      jeansUndHosen: [
        {
          key: 'default',
          simpleChatMessages: [
            {
              type: 'SimpleChatTextMessage',
              html:
                'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
              id: 'SizeGuide-jeansUndHosen-default-0',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/pants_0.jpg',
                },
                {
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/JeansUndHosen.png',
                },
              ],
              id: 'SizeGuide-jeansUndHosen-default-1',
            },
            {
              type: 'SimpleChatTextMessage',
              html:
                'Erfahren Sie hier, wie Sie Ihre <a href="https://www.pierre-cardin.de/size-advisor#hosengroesse">Hosengröße</a> in nur drei Schritten richtig messen.',
              id: 'SizeGuide-jeansUndHosen-default-2',
            },
          ],
        },
      ],
      suit: [
        {
          key: 'default',
          simpleChatMessages: [
            {
              type: 'SimpleChatTextMessage',
              html:
                'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
              id: 'SizeGuide-suit-default-0',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/anzug_0.jpg',
                },
                {
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/Konfection.png',
                },
              ],
              id: 'SizeGuide-suit-default-1',
            },
            {
              type: 'SimpleChatTextMessage',
              html:
                'Wir erklären Ihnen, wie Sie Ihre <a href="https://www.pierre-cardin.de/size-advisor#konfektionsgroesse">Konfektionsgröße</a> richtig messen.',
              id: 'SizeGuide-suit-default-2',
            },
          ],
        },
      ],
    },
    tagSizeGuides: {
      'Casual>Jeans und Hosen': 'jeansUndHosen',
      'Casual>Jacken>Blousons': 'shirts',
      'Casual>Jacken>Mäntel': 'shirts',
      'Casual>Jacken>Jacken': 'shirts',
      'Casual>Jacken>Westen': 'shirts',
      'Casual>Oberteile>T-Shirts': 'shirts',
      'Casual>Oberteile>Polos': 'shirts',
      'Casual>Oberteile>Hemden': 'shirts',
      'Casual>Oberteile>Pullover': 'shirts',
      'Casual>Sakkos': 'suit',

      'Business>Komplettanzüge': 'suit',
      'Business>Sakkos': 'suit',
      'Business>Westen': 'suit',
      'Business>Anzughosen': 'suit',
      'Business>Hemden': 'suit',
      'Business>Accessoires>Gürtel': 'suit',
      'Business>Accessoires>Krawatten & Einstecktücher': 'suit',

      'Basics>Jeans und Hosen': 'jeansUndHosen',
    },
  },
}

export default data
