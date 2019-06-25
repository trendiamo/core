/* eslint-disable max-lines */
const header = {
  title: 'Ihr DELIUS Assistent',
  subtitle: '',
  imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Einkaufsgesellschaft.jpg',
  animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Einkaufsgesellschaft.jpg',
  backgroundColor: '#fff',
  textColor: '#333',
  backButton: {
    textColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}

const data = {
  assessment: {
    flowType: 'ht-assessment-v2',
    launcher: {
      chatBubbleText: 'Hallo! 👋 Willkommen bei Delius',
      chatBubbleExtraText: 'Wie kann ich Ihnen helfen?',
      persona: {
        name: 'Elisa',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Bildschirmfoto.png',
          picRect: {},
        },
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
                  id: 2,
                  type: 'SimpleChatTextMessage',
                  text: 'Willkommen bei Delius...',
                },
                {
                  id: 3,
                  type: 'SimpleChatTextMessage',
                  text: '….in der Welt der Objekttextilien',
                },
                {
                  id: 4,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Architekt.jpg',
                      title: 'Architekt',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Objekteur.jpg',
                      title: 'Objekteur',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Raumausstatter.jpg',
                      title: 'Raumaustatter',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Haendler.jpg',
                      title: 'Händler',
                    },
                    {
                      picUrl:
                        'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Einkaufsgesellschaft.jpg',
                      title: 'Einkaufsgesellschaft',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Betreiber.jpg',
                      title: 'Betreiber',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Architekt: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 5,
                  type: 'SimpleChatTextMessage',
                  text: 'Message',
                },
                {
                  id: 6,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Hotel.jpg',
                      title: 'Hotel',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Health&Care.jpg',
                      title: 'Health & Care',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Schiffahrt.jpg',
                      title: 'Schifffahrt',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kino_Theather.jpg',
                      title: 'Kino / Theater',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Buero.jpg',
                      title: 'Büro',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Ladenbau.jpg',
                      title: 'Ladenbau',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Objekteur: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 7,
                  type: 'SimpleChatTextMessage',
                  text: 'Message',
                },
                {
                  id: 8,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Hotel.jpg',
                      title: 'Hotel',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Health&Care.jpg',
                      title: 'Health & Care',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Schiffahrt.jpg',
                      title: 'Schifffahrt',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kino_Theather.jpg',
                      title: 'Kino / Theater',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Buero.jpg',
                      title: 'Büro',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Ladenbau.jpg',
                      title: 'Ladenbau',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Raumaustatter: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 9,
                  type: 'SimpleChatTextMessage',
                  text: 'Message',
                },
                {
                  id: 10,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Hotel.jpg',
                      title: 'Hotel',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Health&Care.jpg',
                      title: 'Health & Care',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Ladenbau.jpg',
                      title: 'Ladenbau',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Privatkunden.jpg',
                      title: 'Privatkunden',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Händler: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 11,
                  type: 'SimpleChatTextMessage',
                  text: 'Message',
                },
                {
                  id: 12,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Hotel.jpg',
                      title: 'Hotel',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Health&Care.jpg',
                      title: 'Health & Care',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Schiffahrt.jpg',
                      title: 'Schifffahrt',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kino_Theather.jpg',
                      title: 'Kino / Theater',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Privatkunden.jpg',
                      title: 'Privatkunden',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Ladenbau.jpg',
                      title: 'Ladenbau',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Einkaufsgesellschaft: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 13,
                  type: 'SimpleChatTextMessage',
                  text: 'Message',
                },
                {
                  id: 14,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Hotel.jpg',
                      title: 'Hotel',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Pflegeheim.jpg',
                      title: 'Pflegeheim',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Krankenhaus.jpg',
                      title: 'Krankenhäuser',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      Betreiber: {
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 15,
                  type: 'SimpleChatTextMessage',
                  text: 'Message',
                },
                {
                  id: 16,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Hotel.jpg',
                      title: 'Hotel',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Pflegeheim.jpg',
                      title: 'Pflegeheim',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Krankenhaus.jpg',
                      title: 'Krankenhaus',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wohnheim.jpg',
                      title: 'Wohnheim',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kino_Theather.jpg',
                      title: 'Kino / Theater',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt/Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 17, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 18,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt/Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 19, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 20,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt/Schifffahrt': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 21, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 22,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt/Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 23, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 24,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Veloure.jpg',
                      title: 'Veloure',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt/Büro': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 25, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 26,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt/Ladenbau': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 27, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 28,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kabinenvorhang.jpg',
                      title: 'Kabininvorhang',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur/Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 29, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 30,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur/Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 31, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 32,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur/Schifffahrt': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 33, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 34,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur/Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 35, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 36,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Veloure.jpg',
                      title: 'Veloure',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur/Büro': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 37, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 38,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur/Ladenbau': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 39, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 40,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kabinenvorhang.jpg',
                      title: 'Kabininvorhang',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Raumaustatter/Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 41, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 42,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Raumaustatter/Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 43, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 44,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Raumaustatter/Ladenbau': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 45, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 46,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Kabinenvorhang.jpg',
                      title: 'Kabininvorhang',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Raumaustatter/Privatkunden': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 47, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 48,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler/Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 49, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 50,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler/Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 51, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 52,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler/Schifffahrt': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 53, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 54,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler/Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 55, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 56,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Veloure.jpg',
                      title: 'Veloure',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler/Privatkunden': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 57, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 58,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler/Ladenbau': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 59, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 60,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Einkaufsgesellschaft/Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 61, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 62,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe	',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Einkaufsgesellschaft/Pflegeheim': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 63, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 64,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Einkaufsgesellschaft/Krankenhäuser': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 65, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 66,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Betreiber/Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 67, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 68,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Betreiber/Pflegeheim': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 69, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 70,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Betreiber/Krankenhaus': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 71, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 72,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Betreiber/Wohnheim': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 73, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 74,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Neuheiten.jpg',
                      title: 'Neuheiten',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Sonnenschutz.jpg',
                      title: 'Sonnenschutz',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Betreiber/Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                { id: 75, type: 'SimpleChatTextMessage', text: 'message' },
                {
                  id: 76,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Veloure.jpg',
                      title: 'Veloure',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_1.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_1.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_1.jpg',
                      title: 'Möbelstoffe',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Akustikstoffe.jpg',
                      title: 'Akustikstoffe',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      store: {
        id: 77,
        type: 'store',
        header: {
          title: 'ASSESSMENT FORM',
          imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
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
  assessmentForm: {
    flowType: 'ht-assessment-form',
    header: {
      title: 'Sprechen Sie mit uns',
      subtitle: '',
      minimized: true,
      imageUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Einkaufsgesellschaft.jpg',
      animationUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Einkaufsgesellschaft.jpg',
      backgroundColor: '#fff',
      textColor: '#333',
      backButton: {
        textColor: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
    launcher: {
      chatBubbleText: '',
      chatBubbleExtraText: '',
      persona: {
        name: 'Elisa',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Bildschirmfoto.png',
          picRect: {},
        },
      },
    },
    closedLauncher: {
      chatBubbleText: 'Vielen Dank!',
      chatBubbleExtraText: 'Wir melden uns schnellstmöglich.',
      persona: {
        name: 'Elisa',
        profilePic: {
          url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Bildschirmfoto.png',
        },
      },
    },
    ctaButton: {
      label: 'JETZT KONTAKTIERT WERDEN',
      backgroundColor: '#ff6b02',
      backgroundColorDisabled: '#333',
      color: '#fff',
      colorDisabled: '#555',
    },
    simpleChat: {
      simpleChatSteps: [
        {
          key: 'default',
          simpleChatMessages: [
            {
              id: 1,
              type: 'SimpleChatTextMessage',
              text:
                'Vielen Dank, für Ihr Interesse an unserem Produkt! Schicken Sie uns gerne eine Anfrage und ein Experte wird sich mit Ihnen in Verbindung setzen.',
            },
            {
              id: 2,
              type: 'assessmentForm',
              assessmentForm: [
                { name: 'name', placeholder: 'Name', required: true },
                { name: 'email', placeholder: 'E-Mail Adresse', required: true },
                { name: 'phone', placeholder: 'Telefon', required: true },
                { name: 'message', placeholder: 'Kommentar (optional)', multiline: true },
              ],
            },
          ],
        },
      ],
    },
  },
}

export default data
