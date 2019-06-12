/* eslint-disable max-lines */
const data = {
  'www.buttwrap.com': {
    triggers: [
      {
        state: 'default',
        urlMatchers: [
          '/collections/:collectionName/products/elephant-brief-white-organic-cotton',
          '/products/elephant-brief-white-organic-cotton',
        ],
        module: {
          flowType: 'ht-chat',
          launcher: {
            chatBubbleText: "Hey! 👋Cool that you're interested!",
            chatBubbleExtraText: 'Let me show you more! 👀',
            persona: {
              name: 'Rodrigo',
              profilePic: {
                url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/launcher.png',
              },
            },
          },
          header: {
            productTitle: 'Elephant Brief white',
            personaName: 'Rodrigo',
            personaInstagramHandle: '@_rodrigo_pires_',
            animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
            imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
          },
          simpleChat: {
            simpleChatSteps: [
              {
                key: 'default',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Buttwraps are made of the best cotton, very soft and extremely comfortable to wear.',
                    id: 1,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      'The one I like the most is white. It gives a great shape and you even support elephants with it! 🐘 🔥',
                    id: 2,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Check out my video!',
                    id: 3,
                  },
                  {
                    type: 'SimpleChatVideoMessage',
                    videoUrl: 'https://youtu.be/x9AAdO7ufHg',
                    id: 4,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Check out my pictures in my favourite boxer brief!',
                    id: 5,
                  },
                  {
                    type: 'imageCarousel',
                    imageCarousel: [
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/White1.jpg',
                      },
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/White2.jpg',
                      },
                    ],
                    id: 6,
                  },
                ],
              },
              {
                key: 'Tell me about Buttwrap 📹',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Check out the video of me and Maggie!',
                    id: 7,
                  },
                  {
                    type: 'SimpleChatVideoMessage',
                    videoUrl: 'https://youtu.be/JEYX07rCmuM',
                    id: 8,
                  },
                ],
              },
              {
                key: 'Why are you recommending this?',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'I feel really good wearing them! They are soft, flexible and perfect for working out.',
                    id: 9,
                  },
                  {
                    type: 'imageCarousel',
                    imageCarousel: [
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/White3.jpg',
                      },
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/White4.jpg',
                      },
                    ],
                    id: 10,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      'So whenever somebody asks what to give me for my b-day or x-mas, I tell them „get me a pair of buttwraps!“ 😉',
                    id: 11,
                  },
                ],
              },
              {
                key: 'Show me other stuff',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: "Here's the same boxer brief in other colors:",
                    id: 12,
                  },
                  {
                    type: 'productCarousel',
                    productCarousel: [
                      {
                        id: 'brief-red',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/orangutan-brief-red-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR9-brief-red-front-web_360x.jpg?v=1516105114',
                        title: 'Orangutan Brief red',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                      {
                        id: 'brief-green',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/sea-turtle-brief-green-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR7-brief-green-front-web_360x.jpg?v=1498311704',
                        title: 'Sea Turtle Brief green',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                    ],
                    id: 13,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'And this is the other style:',
                    id: 14,
                  },
                  {
                    type: 'productCarousel',
                    productCarousel: [
                      {
                        id: 'boxer-blue',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/whale-boxer-blue-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR6-boxer-blue-front-web_360x.jpg?v=1498311392',
                        title: 'Whale Boxer blue',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                      {
                        id: 'boxer-black',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/gorilla-boxer-black-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Gorilla Boxer black',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                    ],
                    id: 15,
                  },
                ],
              },
            ],
          },
          ctaButton: { label: 'I want the white one!', action: 'want', backgroundColor: '#ff6b02', color: '#fff' },
        },
      },
      {
        state: 'size-help',
        urlMatchers: [
          '/collections/:collectionName/products/elephant-brief-white-organic-cotton',
          '/products/elephant-brief-white-organic-cotton',
        ],
        module: {
          flowType: 'ht-chat',
          launcher: {
            chatBubbleText: 'Choose size and Add to Cart',
            chatBubbleExtraText: 'Or: need help with the sizes?',
            persona: {
              name: 'Rodrigo',
              profilePic: {
                url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/launcher.png',
              },
            },
          },
          header: {
            productTitle: 'Elephant Brief white',
            personaName: 'Rodrigo',
            personaInstagramHandle: '@_rodrigo_pires_',
            animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/white.gif',
            imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
          },
          simpleChat: {
            simpleChatSteps: [
              {
                key: 'default',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'I am 1,80m, weigh 74kg and wear a Buttwrap M. My jeans size is usually 31.',
                    id: 16,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Here is an overview which size I would recommend to you:',
                    id: 17,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      '<table><tr><th>Jeans Size</th><th>Buttwrap Size</th></tr><tr><td>30</td><td>S</td></tr><tr><td>31 or 32</td><td>M</td></tr><tr><td>33 - 34</td><td>L</td></tr><tr><td>35 - 36</td><td>XL</td></tr><tr><td>36+</td><td>XXL</td></tr></table>',
                    id: 18,
                  },
                ],
              },
            ],
          },
          ctaButton: { label: 'Ok, got it', action: 'ok-size', backgroundColor: '#ff6b02', color: '#fff' },
        },
      },
      {
        state: 'nothing',
        urlMatchers: [
          '/collections/:collectionName/products/elephant-brief-white-organic-cotton',
          '/products/elephant-brief-white-organic-cotton',
        ],
        module: {
          flowType: 'ht-nothing',
        },
      },
      {
        state: 'default',
        urlMatchers: [
          '/collections/:collectionName/products/orangutan-brief-red-organic-cotton',
          '/products/orangutan-brief-red-organic-cotton',
        ],
        module: {
          flowType: 'ht-chat',
          launcher: {
            chatBubbleText: "Hey! 👋Cool that you're interested!",
            chatBubbleExtraText: 'Let me show you more! 👀',
            persona: {
              name: 'Rodrigo',
              profilePic: {
                url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/launcher.png',
              },
            },
          },
          header: {
            productTitle: 'Orangutan Brief red',
            personaName: 'Rodrigo',
            personaInstagramHandle: '@_rodrigo_pires_',
            animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/red.gif',
            imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_red.png',
          },
          simpleChat: {
            simpleChatSteps: [
              {
                key: 'default',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Buttwraps are made of the best cotton, very soft and extremely comfortable to wear.',
                    id: 19,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      'The one I like the most is red. It gives a great shape and you even support orangutans with it! 🔥',
                    id: 20,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Check out my video!',
                    id: 21,
                  },
                  {
                    type: 'SimpleChatVideoMessage',
                    videoUrl: 'https://youtu.be/-Inx1Tv6Fko',
                    id: 22,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Check out my pictures in my favourite boxer brief!',
                    id: 23,
                  },
                  {
                    type: 'imageCarousel',
                    imageCarousel: [
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/Red1.jpg',
                      },
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/Red2.jpg',
                      },
                    ],
                    id: 24,
                  },
                ],
              },
              {
                key: 'Tell me about Buttwrap 📹',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Check out the video of me and Maggie!',
                    id: 25,
                  },
                  {
                    type: 'SimpleChatVideoMessage',
                    videoUrl: 'https://youtu.be/JEYX07rCmuM',
                    id: 26,
                  },
                ],
              },
              {
                key: 'Why are you recommending this?',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'I feel really good wearing them! They are soft, flexible and perfect for working out.',
                    id: 27,
                  },
                  {
                    type: 'imageCarousel',
                    imageCarousel: [
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/Red3.jpg',
                      },
                      {
                        picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/Red4.jpg',
                      },
                    ],
                    id: 28,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      'So whenever somebody asks what to give me for my b-day or x-mas, I tell them „get me a pair of buttwraps!“ 😉',
                    id: 29,
                  },
                ],
              },
              {
                key: 'Show me other stuff',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: "Here's the same boxer brief in other colors:",
                    id: 30,
                  },
                  {
                    type: 'productCarousel',
                    productCarousel: [
                      {
                        id: 'brief-white',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/elephant-brief-white-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR1-brief-white-front-web_360x.jpg?v=1498311868',
                        title: 'Elephant Brief white',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                      {
                        id: 'brief-green',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/sea-turtle-brief-green-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR7-brief-green-front-web_360x.jpg?v=1498311704',
                        title: 'Sea Turtle Brief green',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                    ],
                    id: 31,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'And this is the other style:',
                    id: 32,
                  },
                  {
                    type: 'productCarousel',
                    productCarousel: [
                      {
                        id: 'boxer-blue',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/whale-boxer-blue-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR6-boxer-blue-front-web_360x.jpg?v=1498311392',
                        title: 'Whale Boxer blue',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                      {
                        id: 'boxer-black',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/gorilla-boxer-black-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Gorilla Boxer black',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                    ],
                    id: 33,
                  },
                ],
              },
            ],
          },
          ctaButton: { label: 'I want the red one!', action: 'want', backgroundColor: '#ff6b02', color: '#fff' },
        },
      },
      {
        state: 'size-help',
        urlMatchers: [
          '/collections/:collectionName/products/orangutan-brief-red-organic-cotton',
          '/products/orangutan-brief-red-organic-cotton',
        ],
        module: {
          flowType: 'ht-chat',
          launcher: {
            chatBubbleText: 'Choose size and Add to Cart',
            chatBubbleExtraText: 'Or: need help with the sizes?',
            persona: {
              name: 'Rodrigo',
              profilePic: {
                url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/launcher.png',
              },
            },
          },
          header: {
            productTitle: 'Orangutan Brief red',
            personaName: 'Rodrigo',
            personaInstagramHandle: '@_rodrigo_pires_',
            animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/red.gif',
            imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_red.png',
          },
          simpleChat: {
            simpleChatSteps: [
              {
                key: 'default',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'I am 1,80m, weigh 74kg and wear a Buttwrap M. My jeans size is usually 31.',
                    id: 34,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Here is an overview which size I would recommend to you:',
                    id: 35,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      '<table><tr><th>Jeans Size</th><th>Buttwrap Size</th></tr><tr><td>30</td><td>S</td></tr><tr><td>31 or 32</td><td>M</td></tr><tr><td>33 - 34</td><td>L</td></tr><tr><td>35 - 36</td><td>XL</td></tr><tr><td>36+</td><td>XXL</td></tr></table>',
                    id: 36,
                  },
                ],
              },
            ],
          },
          ctaButton: { label: 'Ok, got it', action: 'ok-size', backgroundColor: '#ff6b02', color: '#fff' },
        },
      },
      {
        state: 'nothing',
        urlMatchers: [
          '/collections/:collectionName/products/orangutan-brief-red-organic-cotton',
          '/products/orangutan-brief-red-organic-cotton',
        ],
        module: {
          flowType: 'ht-nothing',
        },
      },
      {
        urlMatchers: ['/cart'],
        module: {
          flowType: 'ht-chat',
          launcher: {
            chatBubbleText: "I'm glad that you like it! 🎉",
            chatBubbleExtraText: 'Anything else?',
            persona: {
              name: 'Rodrigo',
              profilePic: {
                url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/launcher.png',
              },
            },
          },
          header: {
            productTitle: 'Get the full package!',
            personaName: 'Rodrigo',
            personaInstagramHandle: '@_rodrigo_pires_',
            animationUrl: '',
            imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/buttwrap/header_white.png',
            minimized: true,
          },
          simpleChat: {
            simpleChatSteps: [
              {
                key: 'default',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'I always buy in pairs, plus you get a discount if you buy 3 or more.',
                    id: 37,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Here are a few other buttwraps I like:',
                    id: 38,
                  },
                  {
                    type: 'productCarousel',
                    productCarousel: [
                      {
                        id: '45542646599',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/gorilla-boxer-black-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                        title: 'Gorilla Boxer black',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one!',
                      },
                      {
                        id: 'brief-green',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/sea-turtle-brief-green-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR7-brief-green-front-web_360x.jpg?v=1498311704',
                        title: 'Sea Turtle Brief green',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                      {
                        id: 'boxer-blue',
                        url:
                          'https://www.buttwrap.com/collections/organic-cotton-collection/products/whale-boxer-blue-organic-cotton',
                        picUrl:
                          'https://cdn.shopify.com/s/files/1/2094/0433/products/PR6-boxer-blue-front-web_360x.jpg?v=1498311392',
                        title: 'Whale Boxer blue',
                        displayPrice: '€27.50',
                        cardCta: 'I want this one instead',
                      },
                    ],
                    id: 39,
                  },
                ],
              },
              {
                key: 'Tell me about the discounts!',
                simpleChatMessages: [
                  {
                    type: 'SimpleChatTextMessage',
                    text: 'Here is an overview of what you can save:',
                    id: 40,
                  },
                  {
                    type: 'SimpleChatTextMessage',
                    text:
                      '<table><tr><th>Minimum Qty</th><th>Discount</th></tr><tr><td>3+</td><td>15% off</td></tr><tr><td>5+</td><td>20% off</td></tr></table>',
                    id: 41,
                  },
                ],
              },
            ],
          },
          ctaButton: { label: 'Proceed to checkout', action: 'checkout', backgroundColor: '#ff6b02', color: '#fff' },
        },
      },
    ],
  },
}

export default data
