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
              text: 'Willkommen bei Pierre Cardin! Ich würde dir gerne die für dich relevantesten Pieces zeigen.',
            },
            {
              type: 'text',
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
                  title: 'Hemnden',
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
      },
      Basics: {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
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
      },
      'Casual/Jeans und Hosen': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
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
              ],
            },
            {
              type: 'text',
              text:
                'Falls du dir unsicher bist, welche unserer Jeans-Passformen die für dich beste ist, kannst du hier nachschauen: <a target="_blank" rel="noopener noreferrer" href="https://www.pierre-cardin.de/specials/pierre-cardin-specials/denim-guide">Zum Denim Guide</a>',
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
                  title: 'Hemnden',
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
      },
      'Business/Sakkos': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
              text: 'Okey! Magst du mir einmal deinen Fit verraten? ',
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
      },
      'Business/Anzughosen': {
        multiple: true,
        header,
        logs: {
          default: [
            {
              type: 'text',
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
                  picUrl:
                    'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/_0026_3_hemden_slim_fit.png.jpg',
                  title: 'Slim Fit',
                },
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
      },
      store: {
        type: 'store',
        header: {
          title: 'Empfohlene Produkte für deinen Style',
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
