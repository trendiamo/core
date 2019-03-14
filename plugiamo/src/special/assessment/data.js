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
              header: {
                productTitle: 'Rodrigo',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: "Please answer the following questions and I'll show you a selection that fits you 😉",
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Casual',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Business',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Basics',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Specials',
                      },
                    ],
                  },
                ],
              },
            },
            Casual: {
              depth: 2,
              header: {
                productTitle: 'Casual',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/red.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_red.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Casual it is! 👌',
                  },
                  {
                    type: 'text',
                    text: 'With which item do you want to start?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Jeans & Hosen',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Jacken',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Oberteile',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Sakkos',
                      },
                    ],
                  },
                ],
              },
            },
            Business: {
              depth: 2,
              header: {
                productTitle: 'Business',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/red.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_red.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Business it is! 👌',
                  },
                  {
                    type: 'text',
                    text: 'With which item do you want to start?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Anzüge',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Baukasten Anzüge',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Hemnden',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Accessoires',
                      },
                    ],
                  },
                ],
              },
            },
            Basics: {
              depth: 1,
              header: {
                productTitle: 'Basics',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/red.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_red.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Basics it is! 👌',
                  },
                  {
                    type: 'text',
                    text: 'With which item do you want to start?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Wäsche',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Jeans & Hosen',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Oberteile',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Jacken',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Specials: {
              depth: 1,
              header: {
                productTitle: 'Specials',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/red.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_red.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Specials it is! 👌',
                  },
                  {
                    type: 'text',
                    text: 'With which item do you want to start?',
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Special Collection',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            'Jeans & Hosen': {
              header: {
                productTitle: 'Jeans & Hosen',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Jeans & Hosen it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Modern Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Tapered Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Jacken: {
              header: {
                productTitle: 'Jacken',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Jacken it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Blousons',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Mäntel',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Jacken',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Westen',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Oberteile: {
              header: {
                productTitle: 'Oberteile',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Oberteile it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'T-Shirts',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Polos',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Hemnden',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Pullover',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Sakkos: {
              header: {
                productTitle: 'Sakkos',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Sakkos it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Anzüge: {
              header: {
                productTitle: 'Anzüge',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Anzüge it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            'Baukasten Anzüge': {
              header: {
                productTitle: 'Baukasten Anzüge',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Baukasten Anzüge it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Hemnden: {
              header: {
                productTitle: 'Hemnden',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Hemnden it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Slim Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Regular Fit',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Shaped Fit',
                        endNode: true,
                      },
                    ],
                  },
                ],
              },
            },
            Accessoires: {
              header: {
                productTitle: 'Accessoires',
                personaName: 'Rodrigo',
                personaInstagramHandle: '@_rodrigo_pires_',
                animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
                imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
                video: {
                  url: 'https://youtu.be/x9AAdO7ufHg',
                  text: 'Check out my video',
                  textColor: '#fff',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  icon: true,
                },
              },
              logs: {
                default: [
                  {
                    type: 'text',
                    text: 'Cool! Accessoires it is! 👌',
                  },
                  {
                    type: 'text',
                    text: "Let's start by picking what style you like...",
                  },
                  {
                    type: 'assessmentStepOptions',
                    assessmentStepOptions: [
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Gürtel',
                        endNode: true,
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
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
