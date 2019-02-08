const data = {
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
          chatBubble: {
            message: "Hey! 👋Cool that you're interested!",
            timeStart: 0.5,
            timeEnd: 20,
            hideBarAfter: 0.2,
            timeOfElevation: 1.6,
          },
          chatBubbleExtra: {
            message: 'Let me show you more! 👀',
            timeStart: 2.5,
            timeEnd: 18.2,
            hideBarAfter: 3.4,
            timeStartDuration: 0.4,
          },
          persona: {
            name: 'Rodrigo',
            profilePic: {
              url:
                'https://instagram.flis5-1.fna.fbcdn.net/vp/bfa29cf105de11feef14dcb4b8830892/5CFDBD7A/t51.2885-19/s150x150/43914435_279225136257865_1981274005692219392_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
            },
          },
        },
        header: {
          productTitle: 'Elephant Brief white',
          personaName: 'Rodrigo',
          personaInstagramHandle: '@_rodrigo_pires_',
          animationUrl: 'https://media.giphy.com/media/3otPowjINZoVFXwzM4/giphy.gif',
          imageUrl:
            'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/08/24/Pictures/_8cc15858-a77e-11e8-8937-8a80aaa2408c.jpg',
        },
        logs: {
          default: [
            {
              type: 'text',
              text: 'Buttwraps are made of the best cotton, very soft and extremely comfortable to wear.',
            },
            {
              type: 'text',
              text:
                'The one I like the most is white. It gives a great shape and you even support elephants with it! 🐘 🔥',
            },
            {
              type: 'text',
              text: 'Here is a video of me:',
            },
            {
              type: 'videoUrl',
              videoUrl: 'https://www.youtube.com/watch?v=5GdrKhhfJQw',
            },
            {
              type: 'text',
              text: 'Check out my pictures in my favourite boxer brief!',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/98252f85cdae6d41f1eef915ad66ca61/5CF8BECB/t51.2885-15/e35/43303467_1861207097302088_6896764744952893298_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
                },
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/da969acffb849aa4cceaf5a48186241d/5CFE4F45/t51.2885-15/e35/44371536_445280922668357_3800682731002251899_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&se=7',
                },
              ],
            },
          ],
          'Tell me about Buttwrap 📹': [
            {
              type: 'text',
              text: 'Check out the video of me and Maggie telling you more!',
            },
            {
              type: 'videoUrl',
              videoUrl: 'https://www.youtube.com/watch?v=5GdrKhhfJQw',
            },
          ],
          'Why are you recommending this?': [
            {
              type: 'text',
              text:
                'I feel really good wearing them! They are soft, flexible and perfect for working out. Check out the video of Maggie and myself:',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/98252f85cdae6d41f1eef915ad66ca61/5CF8BECB/t51.2885-15/e35/43303467_1861207097302088_6896764744952893298_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
                },
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/da969acffb849aa4cceaf5a48186241d/5CFE4F45/t51.2885-15/e35/44371536_445280922668357_3800682731002251899_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&se=7',
                },
              ],
            },
            {
              type: 'text',
              text:
                'So whenever somebody asks what to give me for my b-day or x-mas, I tell them „get me a pair of buttwraps!“ 😉',
            },
          ],
          'Show me other stuff': [
            {
              type: 'text',
              text: "Here's the same boxer brief in other colors:",
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
            },
            {
              type: 'text',
              text: 'And this is the other style:',
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
            },
          ],
        },
        ctaButton: { label: 'I want the white one!', action: 'want' },
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
          chatBubble: {
            message: 'Choose size and Add to Cart',
            timeStart: 0.5,
            timeEnd: 20,
            hideBarAfter: 0.2,
            timeOfElevation: 1.6,
          },
          chatBubbleExtra: {
            message: 'Or: need help with the sizes?',
            timeStart: 2.5,
            timeEnd: 18.2,
            hideBarAfter: 3.4,
            timeStartDuration: 0.4,
          },
          persona: {
            name: 'Rodrigo',
            profilePic: {
              url:
                'https://instagram.flis5-1.fna.fbcdn.net/vp/bfa29cf105de11feef14dcb4b8830892/5CFDBD7A/t51.2885-19/s150x150/43914435_279225136257865_1981274005692219392_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
            },
          },
        },
        header: {
          productTitle: 'Elephant Brief white',
          personaName: 'Rodrigo',
          personaInstagramHandle: '@_rodrigo_pires_',
          animationUrl: 'https://media.giphy.com/media/3otPowjINZoVFXwzM4/giphy.gif',
          imageUrl:
            'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/08/24/Pictures/_8cc15858-a77e-11e8-8937-8a80aaa2408c.jpg',
        },
        logs: {
          default: [
            {
              type: 'text',
              text: 'I am 1,80m, weigh 74kg and wear a Buttwrap M. My jeans size is usually 31.',
            },
            {
              type: 'text',
              text: 'Here is an overview which size I would recommend to you:',
            },
            {
              type: 'text',
              text:
                '<table><tr><th>Jeans Size</th><th>Buttwrap Size</th></tr><tr><td>30</td><td>S</td></tr><tr><td>31 or 32</td><td>M</td></tr><tr><td>33 - 34</td><td>L</td></tr><tr><td>35 - 36</td><td>XL</td></tr><tr><td>36+</td><td>XXL</td></tr></table>',
            },
          ],
        },
        ctaButton: { label: 'Ok, got it', action: 'ok-size' },
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
          chatBubble: {
            message: "Hey! 👋Cool that you're interested!",
            timeStart: 0.5,
            timeEnd: 20,
            hideBarAfter: 0.2,
            timeOfElevation: 1.6,
          },
          chatBubbleExtra: {
            message: 'Let me show you more! 👀',
            timeStart: 2.5,
            timeEnd: 18.2,
            hideBarAfter: 3.4,
            timeStartDuration: 0.4,
          },
          persona: {
            name: 'Rodrigo',
            profilePic: {
              url:
                'https://instagram.flis5-1.fna.fbcdn.net/vp/bfa29cf105de11feef14dcb4b8830892/5CFDBD7A/t51.2885-19/s150x150/43914435_279225136257865_1981274005692219392_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
            },
          },
        },
        header: {
          productTitle: 'Orangutan Brief red',
          personaName: 'Rodrigo',
          personaInstagramHandle: '@_rodrigo_pires_',
          animationUrl: 'https://media.giphy.com/media/3otPowjINZoVFXwzM4/giphy.gif',
          imageUrl:
            'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/08/24/Pictures/_8cc15858-a77e-11e8-8937-8a80aaa2408c.jpg',
        },
        logs: {
          default: [
            {
              type: 'text',
              text: 'Buttwraps are made of the best cotton, very soft and extremely comfortable to wear.',
            },
            {
              type: 'text',
              text:
                'The one I like the most is red. It gives a great shape and you even support orangutans with it! 🔥',
            },
            {
              type: 'text',
              text: 'Here is a video of me:',
            },
            {
              type: 'videoUrl',
              videoUrl: 'https://www.youtube.com/watch?v=5GdrKhhfJQw',
            },
            {
              type: 'text',
              text: 'Check out my pictures in my favourite boxer brief!',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/98252f85cdae6d41f1eef915ad66ca61/5CF8BECB/t51.2885-15/e35/43303467_1861207097302088_6896764744952893298_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
                },
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/da969acffb849aa4cceaf5a48186241d/5CFE4F45/t51.2885-15/e35/44371536_445280922668357_3800682731002251899_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&se=7',
                },
              ],
            },
          ],
          'Tell me about Buttwrap 📹': [
            {
              type: 'text',
              text: 'Check out the video of me and Maggie telling you more!',
            },
            {
              type: 'videoUrl',
              videoUrl: 'https://www.youtube.com/watch?v=5GdrKhhfJQw',
            },
          ],
          'Why are you recommending this?': [
            {
              type: 'text',
              text:
                'I feel really good wearing them! They are soft, flexible and perfect for working out. Check out the video of Maggie and myself:',
            },
            {
              type: 'imageCarousel',
              imageCarousel: [
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/98252f85cdae6d41f1eef915ad66ca61/5CF8BECB/t51.2885-15/e35/43303467_1861207097302088_6896764744952893298_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
                },
                {
                  picUrl:
                    'https://instagram.flis5-1.fna.fbcdn.net/vp/da969acffb849aa4cceaf5a48186241d/5CFE4F45/t51.2885-15/e35/44371536_445280922668357_3800682731002251899_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net&se=7',
                },
              ],
            },
            {
              type: 'text',
              text:
                'So whenever somebody asks what to give me for my b-day or x-mas, I tell them „get me a pair of buttwraps!“ 😉',
            },
          ],
          'Show me other stuff': [
            {
              type: 'text',
              text: "Here's the same boxer brief in other colors:",
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
            },
            {
              type: 'text',
              text: 'And this is the other style:',
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
            },
          ],
        },
        ctaButton: { label: 'I want the red one!', action: 'want' },
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
          chatBubble: {
            message: 'Choose size and Add to Cart',
            timeStart: 0.5,
            timeEnd: 20,
            hideBarAfter: 0.2,
            timeOfElevation: 1.6,
          },
          chatBubbleExtra: {
            message: 'Or: need help with the sizes?',
            timeStart: 2.5,
            timeEnd: 18.2,
            hideBarAfter: 3.4,
            timeStartDuration: 0.4,
          },
          persona: {
            name: 'Rodrigo',
            profilePic: {
              url:
                'https://instagram.flis5-1.fna.fbcdn.net/vp/bfa29cf105de11feef14dcb4b8830892/5CFDBD7A/t51.2885-19/s150x150/43914435_279225136257865_1981274005692219392_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
            },
          },
        },
        header: {
          productTitle: 'Orangutan Brief red',
          personaName: 'Rodrigo',
          personaInstagramHandle: '@_rodrigo_pires_',
          animationUrl: 'https://media.giphy.com/media/3otPowjINZoVFXwzM4/giphy.gif',
          imageUrl:
            'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/08/24/Pictures/_8cc15858-a77e-11e8-8937-8a80aaa2408c.jpg',
        },
        logs: {
          default: [
            {
              type: 'text',
              text: 'I am 1,80m, weigh 74kg and wear a Buttwrap M. My jeans size is usually 31.',
            },
            {
              type: 'text',
              text: 'Here is an overview which size I would recommend to you:',
            },
            {
              type: 'text',
              text:
                '<table><tr><th>Jeans Size</th><th>Buttwrap Size</th></tr><tr><td>30</td><td>S</td></tr><tr><td>31 or 32</td><td>M</td></tr><tr><td>33 - 34</td><td>L</td></tr><tr><td>35 - 36</td><td>XL</td></tr><tr><td>36+</td><td>XXL</td></tr></table>',
            },
          ],
        },
        ctaButton: { label: 'Ok, got it', action: 'ok-size' },
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
          chatBubble: {
            message: "I'm glad that you like it! 🎉",
            timeStart: 0.5,
            timeEnd: 20,
            hideBarAfter: 0.2,
            timeOfElevation: 1.6,
          },
          chatBubbleExtra: {
            message: 'Anything else?',
            timeStart: 2.5,
            timeEnd: 18.2,
            hideBarAfter: 3.4,
            timeStartDuration: 0.4,
          },
          persona: {
            name: 'Rodrigo',
            profilePic: {
              url:
                'https://instagram.flis5-1.fna.fbcdn.net/vp/bfa29cf105de11feef14dcb4b8830892/5CFDBD7A/t51.2885-19/s150x150/43914435_279225136257865_1981274005692219392_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
            },
          },
        },
        header: {
          productTitle: 'Get the full package!',
          personaName: 'Rodrigo',
          personaInstagramHandle: '@_rodrigo_pires_',
          animationUrl: 'https://media.giphy.com/media/3otPowjINZoVFXwzM4/giphy.gif',
          imageUrl:
            'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/08/24/Pictures/_8cc15858-a77e-11e8-8937-8a80aaa2408c.jpg',
          minimized: true,
        },
        logs: {
          default: [
            {
              type: 'text',
              text: 'I always buy in pairs, plus you get a discount if you buy 3 or more.',
            },
            {
              type: 'text',
              text: 'Here are a few other buttwraps I like:',
            },
            {
              type: 'product',
              product: {
                id: '45542646599',
                url:
                  'https://www.buttwrap.com/collections/organic-cotton-collection/products/gorilla-boxer-black-organic-cotton',
                picUrl:
                  'https://cdn.shopify.com/s/files/1/2094/0433/products/PR3-boxer-black-front-web_360x.jpg?v=1498311202',
                title: 'Gorilla Boxer black',
                displayPrice: '€27.50',
                cardCta: 'I want this one!',
              },
            },
          ],
          'Tell me about the discounts!': [
            {
              type: 'text',
              text: 'Here is an overview of what you can save:',
            },
            {
              type: 'text',
              text:
                '<table><tr><th>Minimum Qty</th><th>Discount</th></tr><tr><td>3+</td><td>15% off</td></tr><tr><td>5+</td><td>20% off</td></tr></table>',
            },
          ],
        },
        ctaButton: { label: 'Proceed to checkout', action: 'checkout' },
      },
    },
    {
      urlMatchers: ['/:id/checkouts/:checkoutId/thank_you'],
      module: {
        flowType: 'ht-outro',
        launcher: {
          chatBubble: {
            message: 'Awesome! 🤩 Was I helpful?',
            timeStart: 0.5,
            timeEnd: null,
            hideBarAfter: 0.2,
            timeOfElevation: 1.6,
          },
          chatBubbleExtra: {
            buttons: [
              {
                message: 'Not really.',
                value: 'no',
                appearsAfter: 0,
              },
              {
                message: 'Yes, thanks!',
                value: 'yes',
                appearsAfter: 0.2,
              },
            ],
            timeStart: 2.5,
            timeEnd: null,
            timeStartDuration: 0.4,
          },
          persona: {
            name: 'Rodrigo',
            profilePic: {
              url:
                'https://instagram.flis5-1.fna.fbcdn.net/vp/bfa29cf105de11feef14dcb4b8830892/5CFDBD7A/t51.2885-19/s150x150/43914435_279225136257865_1981274005692219392_n.jpg?_nc_ht=instagram.flis5-1.fna.fbcdn.net',
            },
          },
        },
      },
    },
  ],
}

export default data
