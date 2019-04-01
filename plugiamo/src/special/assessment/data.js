const header = {
  title: 'Nico de Roy',
  subtitle: 'Designer @ Pierre Cardin',
  imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy_small.jpg',
  animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
  backgroundColor: '#fff',
  textColor: '#111',
}

export const tagSuggestions = {
  'Casual/Jeans und Hosen/Slim Fit': ['Basics/Oberteile'],
  'Basics/Jeans und Hosen': ['Basics/Oberteile', 'Casual/Jeans und Hosen/Slim Fit'],
  'Business/Accessoires/Krawatten & Einstecktücher': ['Business/Accessoires/Krawatten & Einstecktücher'],
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
        logs: {
          default: [
            {
              type: 'text',
              text:
                'Willkommen bei Pierre Cardin! Ich würde dir gerne die für dich relevantesten Pieces zeigen und dir im Anschluss Optionen für das richtige Outfit vorstellen.',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Casual',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Basics',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Business',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Specials',
                  url: 'https://www.pierre-cardin.de/',
                },
              ],
            },
          ],
        },
      },
      Casual: {
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Alles klar! Womit wollen wir anfangen?',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Jeans und Hosen',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Jacken',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Oberteile',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Sakkos',
                },
              ],
            },
          ],
        },
      },
      Business: {
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Alles klar! Womit wollen wir anfangen?',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Komplettanzüge',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Sakkos',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Westen',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Anzughosen',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Hemnden',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Accessoires',
                },
              ],
            },
          ],
        },
      },
      Basics: {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Alles klar! Wonach schaust du genau? 🙂',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Wäsche',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Jeans und Hosen',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Oberteile',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Jacken',
                },
              ],
            },
          ],
        },
      },
      'Casual/Jeans und Hosen': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text:
                'Super! Wir haben gerade auf unsere neue Frühling / Sommer Kollektion umgestellt. Falls du dir unsicher bist, welche unserer Jeans-Passformen die für dich beste ist, kannst du hier nachschauen: Zum Denim Guide',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Regular Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Modern Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Tapered Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Slim Fit',
                },
              ],
            },
          ],
        },
      },
      'Casual/Jacken': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text:
                'Okey! Wir haben die verschiedensten Typen im Angebot. Wonach suchst du genau? Du kannst gerne mehrere Optionen auswählen!',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Blousons',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Mäntel',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Jacken',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Westen',
                },
              ],
            },
          ],
        },
      },
      'Casual/Oberteile': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Cool! Womit können wir dir dienen? Du kannst gerne mehrere Optionen auswählen!',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'T-Shirts',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Polos',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Hemnden',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Pullover',
                },
              ],
            },
          ],
        },
      },
      'Casual/Sakkos': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Super Wahl für ein Frühling reifes Smart Casual Outfit! Magst du mir einmal deinen Fit verraten?',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Slim Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Regular Fit',
                },
              ],
            },
          ],
        },
      },
      'Business/Sakkos': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Super Wahl für ein Frühling reifes Smart Casual Outfit! Magst du mir einmal deinen Fit verraten?',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Slim Fit',
                  endNode: true,
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Regular Fit',
                  endNode: true,
                },
              ],
            },
          ],
        },
      },
      'Business/Anzughosen': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Slim Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Regular Fit',
                },
              ],
            },
          ],
        },
      },
      'Business/Hemnden': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text:
                'Von Schlicht bis Hingucker haben wir alles im Angebot! Aber zuerst müsste ich einmal wissen welchen Fit du trägst.',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Slim Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Modern Fit',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Shaped Fit',
                },
              ],
            },
          ],
        },
      },
      'Business/Accessoires': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text:
                'Zu jedem guten Business Outfit gehört ein passender Gürtel und ein passendes Einstecktuch oder eine Krawatte. Suchst du nach beidem?',
            },
            {
              type: 'assessmentStepOptions',
              assessmentStepOptions: [
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Gürtel',
                },
                {
                  picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
                  title: 'Krawatten & Einstecktücher',
                },
              ],
            },
          ],
        },
      },
      store: {
        type: 'store',
        header: {
          title: 'Recommended pieces for your style',
          imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/demo_sample.jpg',
          backgroundColor: '#111',
          textColor: '#fff',
        },
      },
    },
  },
  cart: {
    flowType: 'asmt-cart',
    header,
    launcher: {
      chatBubble: {
        message: 'Lass dich inspirieren! 🙂',
        timeStart: 0.5,
        timeEnd: 20,
        hideBarAfter: 0.2,
      },
      chatBubbleExtra: {},
      persona: {
        name: 'Nico de Roy',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
        },
      },
    },
    logs: {
      default: [
        {
          text: 'Here are some products that match your taste:',
        },
      ],
    },
  },
}

export default data
