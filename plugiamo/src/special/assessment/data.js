const data = {
  'www.pierre-cardin.de': {
    triggers: [
      {
        state: 'default',
        urlMatchers: ['/'],
        module: {
          flowType: 'ht-assessment-steps',
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
          steps: [
            {
              header: {
                productTitle: 'Step 1',
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
                        title: 'Basic Outfits',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'B&W Classic',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Business Looks',
                      },
                    ],
                  },
                ],
              },
            },
            {
              header: {
                productTitle: 'Step 2',
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
                        title: 'Shirts',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Pants',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Jackets',
                      },
                      {
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_900x.jpg?v=1516105114',
                        title: 'Acessories',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
}

export default data
