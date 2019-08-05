/* eslint-disable max-lines */
const header = {
  title: 'Ihr DELIUS Assistent',
  subtitle: 'In 3 Schritten zum richtigen Produkt',
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
      chatBubbleText: 'Hallo! 👋 Willkommen bei DELIUS.',
      chatBubbleExtraText: 'Wie kann ich Ihnen helfen?',
      seller: {
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
                  html:
                    'Willkommen bei DELIUS! 🙂 Kategorisieren Sie kurz, wonach Sie ungefähr suchen und wir zeigen Ihnen die für Sie relevantesten Produkte.',
                },
                {
                  id: 3,
                  type: 'SimpleChatTextMessage',
                  html: 'Was beschreibt Ihre Branche am besten?',
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
                  html: 'Okay! Für welchen Bereich benötigen Sie Stoffe?',
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
                  html: 'Okay! Für welchen Bereich benötigen Sie Stoffe?',
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
                  html: 'Okay! Für welchen Bereich benötigen Sie Stoffe?',
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
                  html: 'Okay! Für welchen Bereich benötigen Sie Stoffe?',
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
                  html: 'Okay! Für welchen Bereich benötigen Sie Stoffe?',
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
                      title: 'Krankenhaus',
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
                  html: 'Okay! Für welchen Bereich benötigen Sie Stoffe?',
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
      'Architekt>Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 17,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 18,
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt>Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 19,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 20,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Architekt>Schifffahrt': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 21,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Architekt>Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 23,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
      'Architekt>Büro': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 25,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur>Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 29,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 30,
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur>Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 31,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 32,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Objekteur>Schifffahrt': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 33,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Objekteur>Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 35,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
      'Objekteur>Büro': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 37,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
                  ],
                },
              ],
            },
          ],
        },
      },
      'Raumaustatter>Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 41,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 42,
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Raumaustatter>Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 43,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 44,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Raumaustatter>Privatkunden': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 47,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 48,
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
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler>Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 49,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 50,
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler>Health & Care': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 51,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 52,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Händler>Schifffahrt': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 53,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 54,
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Händler>Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 55,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
      'Händler>Privatkunden': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 57,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 58,
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
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Einkaufsgesellschaft>Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 61,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 62,
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
                      title: 'Akustikstoffe	',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Wandbelaege.jpg',
                      title: 'Wandbeläge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Einkaufsgesellschaft>Pflegeheim': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 63,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 64,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Einkaufsgesellschaft>Krankenhaus': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 65,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 66,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Betreiber>Hotel': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 67,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 68,
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
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Outdoor.jpg',
                      title: 'Outdoor',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
      'Betreiber>Pflegeheim': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 69,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 70,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Dimout_Blackout.jpg',
                      title: 'Dimout/Blackout',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Betreiber>Krankenhaus': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 71,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 72,
                  type: 'assessmentStepOptions',
                  assessmentStepOptions: [
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Vorhaenge_2.jpg',
                      title: 'Vorhänge',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Gardine_2.jpg',
                      title: 'Gardine',
                    },
                    {
                      picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/delius/Moebelstoffe_2.jpg',
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
      'Betreiber>Wohnheim': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 73,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
                {
                  id: 74,
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
      'Betreiber>Kino / Theater': {
        multiple: true,
        header,
        simpleChat: {
          simpleChatSteps: [
            {
              key: 'default',
              simpleChatMessages: [
                {
                  id: 75,
                  type: 'SimpleChatTextMessage',
                  html: 'Super! Abschließend ist wichtig zu verstehen, wofür der Stoff verwendet werden soll.',
                },
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
          title: 'Wir empfehlen Ihnen folgende Produkte',
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
      chatBubbleText: 'Sprechen Sie mit einem Experten.',
      chatBubbleExtraText: '',
      seller: {
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
      seller: {
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
              html:
                'Vielen Dank, für Ihr Interesse an unserem Produkt! Schicken Sie uns gerne eine Anfrage und ein Experte wird sich mit Ihnen in Verbindung setzen.',
            },
            {
              id: 2,
              type: 'assessmentForm',
              assessmentForm: [
                { name: 'name', placeholder: 'Name', required: true },
                { name: 'email', placeholder: 'E-Mail Adresse', required: true },
                { name: 'phone', placeholder: 'Telefon', required: true },
                { name: 'country', placeholder: 'Land', required: true, type: 'country-select' },
                { name: 'message', placeholder: 'Kommentar (optional)', multiline: true },
              ],
            },
            {
              id: 3,
              type: 'SimpleChatTextMessage',
              html:
                'Durch das Ausfüllen und Absenden des Formulars bestätigen Sie die Nutzung Ihrer Daten, um Sie bezüglich einer Kaufberatung zu kontaktieren.',
            },
          ],
        },
      ],
    },
  },
}

export default data
