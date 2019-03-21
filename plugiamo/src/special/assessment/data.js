const header = {
  title: 'Nico de Roy',
  subtitle: 'Designer @ Pierre Cardin',
  imageUrl: 'https://trendiamo-assets.imgix.net/manual/pierre-cardin/Nico-de-Roy_small.jpg?fit=crop&w=160&h90',
  animationUrl:
    'https://trendiamo-assets.imgix.net/uploads/personas-profile-pics/0a27b5c4/Nico-de-Roy.jpg?fit=crop&w=400&h400',
  backgroundColor: '#fff',
  textColor: '#111',
  // video: {
  //   url: 'https://youtu.be/x9AAdO7ufHg',
  //   text: 'Check out my video',
  //   textColor: '#fff',
  //   backgroundColor: 'rgba(255,255,255,0.3)',
  //   icon: true,
  // },
}
const data = {
  'www.pierre-cardin.de': {
    triggers: [
      {
        state: 'default',
        urlMatchers: ['/'],
        module: {
          flowType: 'ht-assessment',
          launcher: {
            chatBubble: {
              message: 'Hey! 👋 Welcome to Pierre Cardin!',
              timeStart: 0.5,
              timeEnd: 20,
              hideBarAfter: 0.2,
              timeOfElevation: 1.6,
            },
            chatBubbleExtra: {
              message: 'Let me help you!',
              timeStart: 2.5,
              timeEnd: 18.2,
              hideBarAfter: 3.4,
              timeStartDuration: 0.4,
            },
            persona: {
              name: 'Richard Liewald',
              profilePic: {
                url:
                  'https://trendiamo-assets.imgix.net/uploads/personas-profile-pics/09f4c3ee/Richard_Liewald.jpg?dpr=2.200000047683716&fit=crop&w=45&h=45',
              },
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
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Casual',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Basics',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Business',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Specials',
                        url: 'https://www.pierre-cardin.de/',
                      },
                    ],
                  },
                ],
              },
            },
            Casual: {
              depth: 2,
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
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Jeans und Hosen',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Jacken',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Oberteile',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Sakkos',
                      },
                    ],
                  },
                ],
              },
            },
            Business: {
              depth: 2,
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
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Anzüge',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Baukasten Anzüge',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Hemnden',
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Accessoires',
                      },
                    ],
                  },
                ],
              },
            },
            Basics: {
              depth: 1,
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
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Wäsche',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Jeans und Hosen',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Oberteile',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Jacken',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            'Jeans und Hosen': {
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
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Modern Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Tapered Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Jacken: {
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
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Blousons',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Mäntel',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Jacken',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Westen',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Oberteile: {
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
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'T-Shirts',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Polos',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Hemnden',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Pullover',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Sakkos: {
              header,
              logs: {
                default: [
                  {
                    type: 'text',
                    text:
                      'Super Wahl für ein Frühling reifes Smart Casual Outfit! Magst du mir einmal deinen Fit verraten?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Anzüge: {
              header,
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Super! Das wichtigste ist, dass der vernünftig ist. Welchen Fit trägst du normalerweise?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            'Baukasten Anzüge': {
              header,
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Okey! Magst du mir einmal deinen Fit verraten?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Hemnden: {
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
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Modern Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Shaped Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Accessoires: {
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
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Gürtel',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://trendiamo-assets.imgix.net/manual/pierre-cardin/demo_sample.jpg?fit=crop&w=160&h160',
                        title: 'Krawatten & Einstecktücher',
                        endNode: true,
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
                imageUrl:
                  'https://console-assets-mc.ams3.digitaloceanspaces.com/uploads/assessment-test/plugin_flow_header-4.png',
                backgroundColor: '#111',
                textColor: '#fff',
              },
            },
          },
        },
      },
    ],
  },
}

export default data
