import { header } from 'special/assessment/data/pierre-cardin'

export const tagSizeGuides = {
  'Casual/Jeans und Hosen/': 'jeansUndHosen',
  'Casual/Jacken/Blousons': 'shirts',
  'Casual/Jacken/Mäntel': 'shirts',
  'Casual/Jacken/Jacken': 'shirts',
  'Casual/Jacken/Westen': 'shirts',
  'Casual/Oberteile/T-Shirts': 'shirts',
  'Casual/Oberteile/Polos': 'shirts',
  'Casual/Oberteile/Hemden': 'shirts',
  'Casual/Oberteile/Pullover': 'shirts',
  'Casual/Sakkos/': 'suit',

  'Business/Komplettanzüge': 'suit',
  'Business/Sakkos/': 'suit',
  'Business/Westen': 'suit',
  'Business/Anzughosen/': 'suit',
  'Business/Hemden/': 'suit',
  'Business/Accessoires/Gürtel': 'suit',
  'Business/Accessoires/Krawatten & Einstecktücher': 'suit',

  'Basics/Jeans und Hosen': 'jeansUndHosen',
}

const simpleChatSteps = {
  shirts: [
    {
      key: 'default',
      simpleChatMessages: [
        {
          type: 'SimpleChatTextMessage',
          text:
            'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
          id: 'SizeGuide-shirts-default-0',
        },
        {
          type: 'imageCarousel',
          imageCarousel: [
            {
              picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/shirts_0.jpg',
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
          text:
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
          text:
            'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
          id: 'SizeGuide-jeansUndHosen-default-0',
        },
        {
          type: 'imageCarousel',
          imageCarousel: [
            {
              picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/pants_0.jpg',
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
          text:
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
          text:
            'Falls du dir unsicher bist, welche Größe du wählen solltest, kannst du mehr in unserem Größenberater erfahren. Hier sind alle unsere Maße erklärt! 🙂',
          id: 'SizeGuide-suit-default-0',
        },
        {
          type: 'imageCarousel',
          imageCarousel: [
            {
              picUrl: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/size-guide/anzug_0.jpg',
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
          text:
            'Wir erklären Ihnen, wie Sie Ihre <a href="https://www.pierre-cardin.de/size-advisor#konfektionsgroesse">Konfektionsgröße</a> richtig messen.',
          id: 'SizeGuide-suit-default-2',
        },
      ],
    },
  ],
}

const data = type => ({
  flowType: 'asmt-size-guide',
  header,
  launcher: {
    chatBubbleText: 'Brauchst du Hilfe bei der Größenwahl?',
    chatBubbleExtraText: '',
    persona: {
      name: 'Nico de Roy',
      profilePic: {
        url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
      },
    },
  },
  closedLauncher: {
    chatBubbleText: 'Wir sehen uns an der Kasse! 🙂',
    chatBubbleExtraText: '',
    persona: {
      name: 'Nico de Roy',
      profilePic: {
        url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/pierre-cardin/Nico-de-Roy.jpg',
      },
    },
  },
  simpleChat: { simpleChatSteps: simpleChatSteps[type] },
})

export default data
