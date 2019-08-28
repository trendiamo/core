# rubocop:disable Metrics/LineLength

# account:
account = Account.find_or_create_by!(name: "Buttwrap")
ActsAsTenant.default_tenant = account

# website:
Website.create!(name: "Buttwrap", hostnames: %w[www.buttwrap.com])

# personas:
adam_params = {
  name: "Adam Jakubowski",
  description: "Hi! I'm a Polish photomodel and I'm here to show you my favourite buttwrap's underwear!",
  profile_pic_url: "https://media.graphcms.com/jNOpMC66SJms96hKpRv7",
  graphcms_ref: "cjo8qub0kl22n09324eg3g95g",
}
adam = Persona.create!(adam_params)
james_params = {
  name: "James Kindle",
  description: "I'm a Wyoming guy based in the Bay area; here to help you pick the best pair of underwear for you.",
  profile_pic_url: "https://media.graphcms.com/lex4iTa7Rk9PuLGnOs9c",
  graphcms_ref: "cjoe87flqivgg0932z61j0eep",
}
james = Persona.create!(james_params)
oscar_params = {
  name: "Oscar Cuenca",
  description: "I'm a 20 years old model from Barcelona. I love to party and to go to the gym.",
  profile_pic_url: "https://media.graphcms.com/9GeTZ0CDRAa27T0JbN1L",
  graphcms_ref: "cjoe89tupivzj0932jcsyrxwr",
}
oscar = Persona.create!(oscar_params)

# flows:

main_showcase_params = {
  name: "Main Showcase",
  title: "Need advice from our models?",
  subtitle: "Ask our models",
  persona_id: adam.id,
  spotlights_attributes: [
    {
      product_picks_attributes: [
        {
          url: "https://www.buttwrap.com/collections/organic-cotton-collection/products/elephant-brief-white-organic-cotton#trnd:open:1,picture://trendiamo-assets.imgix.net/manual/buttwrap/adam-pdp1.jpg",
          name: "Elephant Brief white",
          description: "I love the sporty and masculine Elephant-Brief",
          display_price: "€27.50",
          pic_url: "https://media.graphcms.com/UgTAk9HBS4S8WZpFS75x",
        },
        {
          url: "https://www.buttwrap.com/collections/organic-cotton-collection/products/orangutan-brief-red-organic-cotton#trnd:open:1,picture://trendiamo-assets.imgix.net/manual/buttwrap/adam-pdp2.jpg",
          name: "Orangutan Brief red",
          description: "Usually I am a \"boxer guy\", but I simply love how this model fits me.",
          display_price: "€27.50",
          pic_url: "https://media.graphcms.com/pJWrHD5EQ5WMl0aQ1Aqq",
        },
        {
          url: "https://www.buttwrap.com/collections/finest-cotton-collection/products/brief-cottonstretch-tight-grey-melange#trnd:open:1,picture://trendiamo-assets.imgix.net/manual/buttwrap/adam-pdp3.jpg",
          name: "Brief grey melange",
          description: "Use your butt for something bigger, help to save animals.",
          display_price: "€27.50",
          pic_url: "https://media.graphcms.com/qxryE89DRTeuCiZ4fPDl",
        },
      ],
      persona: adam,
    },
    {
      product_picks_attributes: [
        {
          url: "https://www.buttwrap.com/collections/organic-cotton-collection/products/orangutan-brief-red-organic-cotton#trnd:open:1,path:/scripted-chat/cjoil854ibb1c0932ws1n93yf,picture://trendiamo-assets.imgix.net/manual/buttwrap/james-pdp1.jpg",
          name: "Orangutan Brief Red",
          description: "Save the Orangutans and receive amazing quality product…",
          display_price: "€27.50",
          pic_url: "https://media.graphcms.com/UZHAMbRTSOl8bOsgFj5g",
        },
        {
          url: "https://www.buttwrap.com/collections/finest-cotton-collection/products/boxer-cottonstretch-tight-green#trnd:open:1",
          name: "Boxer Green",
          description: "Very bold choice! Take this if you want to challenge your confidence",
          display_price: "€19.95",
          pic_url: "https://media.graphcms.com/l7AL1N9rT2uNusZlmUJV",
        },
        {
          url: "https://www.buttwrap.com/collections/finest-cotton-collection/products/brief-cottonstretch-tight-grey-melange#trnd:open:1,path:/scripted-chat/cjoil98sobbcm0932bwl5enx9",
          name: "Brief Grey Melange",
          description: "Classic, simple but also very sexy. Grey brief will always have a place in my wardrobe",
          display_price: "€19.95",
          pic_url: "https://media.graphcms.com/Pwb6zGhBQTedGsG0lxmC",
        },
      ],
      persona: james,
    },
    {
      product_picks_attributes: [
        {
          url: "https://www.buttwrap.com/collections/organic-cotton-collection/products/gorilla-boxer-black-organic-cotton#trnd:open:1,picture://trendiamo-assets.imgix.net/manual/buttwrap/oscar-pdp1.jpg",
          name: "Gorilla Boxer black",
          description: "Perfect boxer to put after a hot shower and feel sexier than ever",
          display_price: "€27.50",
          pic_url: "https://media.graphcms.com/KNYtfFxoQhqPchSkSCKU",
        },
        {
          url: "https://www.buttwrap.com/collections/organic-cotton-collection/products/elephant-boxer-white-organic-cotton#trnd:trnd:open:1,picture://trendiamo-assets.imgix.net/manual/buttwrap/oscar-pdp2.jpg",
          name: "Elephant Boxer White",
          description: "The definition of comfort. The soft materials adapt perfectly to my body",
          display_price: "€27.50",
          pic_url: "https://media.graphcms.com/EQc3p9qsRXrgbm1jpz2c",
        },
        {
          url: "https://www.buttwrap.com/collections/finest-cotton-collection/products/boxer-cottonstretch-tight-white#trnd:open:1",
          name: "Boxer White",
          description: "What?! White can’t be sexy? Maybe you should check yourself in the mirror with this boxer",
          display_price: "€19.95",
          pic_url: "https://media.graphcms.com/97Z4bNVsQvqr3CKdBond",
        },
      ],
      persona: oscar,
    },
  ],
  graphcms_ref: "cjofphjnosyvr0932002rowou",
}
main_showcase = Showcase.create!(main_showcase_params)

purchase_outro_params = {
  name: "Purchase Outro",
  persona: adam,
  graphcms_ref: "cjofpd048sy170932lw0h6wrk",
}
purchase_outro = Outro.create!(purchase_outro_params)

adam_ebw_chat_params = {
  name: "Adam EBW Chat",
  title: "Do you need help?",
  persona_id: adam.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "They feel like silk on your body. Openly speaking it just keeps stuff where it belongs while maintaing class 🙂",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Buttwrap always ships for free if you are in Germany or if your order is above 59€. Otherwise you'll pay 9.90 for shipping to EU and 19.90€ for shipping around the globe. I always prefer to order 3 or 5 pairs so that I can get a discount up to 20% and shipping for free 🙂",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
adam_ebw_chat = ScriptedChat.create!(adam_ebw_chat_params)
adam_obr_chat_params = {
  name: "Adam OBR Chat",
  title: "Do you need help?",
  persona_id: adam.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Who says underwear has to have a boring color? I like to wear some strong colors every now and then!",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Buttwrap always ships for free if you are in Germany or if your order is above 59€. Otherwise you'll pay 9.90 for shipping to EU and 19.90€ for shipping around the globe. I always prefer to order 3 or 5 pairs so that I can get a discount up to 20% and shipping for free 🙂",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
adam_obr_chat = ScriptedChat.create!(adam_obr_chat_params)
adam_bgm_chat_params = {
  name: "Adam BGM Chat",
  title: "Do you need help?",
  persona_id: adam.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "The quality is just really good and they are perfect for every day! By the way if you buy 3 of them you get a 15% discount!",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Buttwrap always ships for free if you are in Germany or if your order is above 59€. Otherwise you'll pay 9.90 for shipping to EU and 19.90€ for shipping around the globe. I always prefer to order 3 or 5 pairs so that I can get a discount up to 20% and shipping for free 🙂",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
adam_bgm_chat = ScriptedChat.create!(adam_bgm_chat_params)
james_obr_chat_params = {
  name: "James OBR Chat",
  title: "Do you need help?",
  persona_id: james.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Buying this specific pair, you can support the preservation of one of the most endangered species, the orangutans, while looking sexy as hell",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Unfortunately, Buttwrap ships always for free only in Germany. If you want to order a single pair in other EU countries, the shipping cost is 9.90€. If you are outside the EU you will pay 19.90€. I usually avoid paying the delivery costs by completing an order over 59€ and getting free shipping and a brand new set of underwears 😉",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
  graphcms_ref: "cjoil854ibb1c0932ws1n93yf",
}
james_obr_chat = ScriptedChat.create!(james_obr_chat_params)
james_bg_chat_params = {
  name: "James BG Chat",
  title: "Do you need help?",
  persona_id: james.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "I love how bold these boxers are! You would expect most underwear to be white or black but this one has a very special color that can be suprising 😉",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Unfortunately, Buttwrap ships always for free only in Germany. If you want to order a single pair in other EU countries, the shipping cost is 9.90€. If you are outside the EU you will pay 19.90€. I usually avoid paying the delivery costs by completing an order over 59€ and getting free shipping and a brand new set of underwears 😉",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
james_bg_chat = ScriptedChat.create!(james_bg_chat_params)
james_bgm_chat_params = {
  name: "James BGM Chat",
  title: "Do you need help?",
  persona_id: james.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Someone would say this pair is very traditional. I would say that it is very classy. You cannot go wrong with class.",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "Unfortunately, Buttwrap ships always for free only in Germany. If you want to order a single pair in other EU countries, the shipping cost is 9.90€. If you are outside the EU you will pay 19.90€. I usually avoid paying the delivery costs by completing an order over 59€ and getting free shipping and a brand new set of underwears 😉",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
  graphcms_ref: "cjoil98sobbcm0932bwl5enx9",
}
james_bgm_chat = ScriptedChat.create!(james_bgm_chat_params)
oscar_gbb_chat_params = {
  name: "Oscar GBB Chat",
  title: "Do you need help?",
  persona_id: oscar.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "That might sound odd but I like how the waistband feels like. Sometimes they almost cut into your body. These ones really charm your body! 🙂",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "When I am on Buttwrap, I can't control myself, and I always end up ordering 5 pairs at the time. If you are like me and make orders over 59€, doesn't matter where you are, the shipping is free. Shipping is also always free in Germany, no matter what! If you are in other EU countries and want to make smaller orders, you will pay 9.90€ of shipping cost. For small orders outside EU you will pay 19.90€",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
oscar_gbb_chat = ScriptedChat.create!(oscar_gbb_chat_params)
oscar_ebw_chat_params = {
  name: "Oscar EBW Chat",
  title: "Do you need help?",
  persona_id: oscar.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "There is something about white boxer that just makes me connect with my masculinity. This pair is great if you are looking for something that highlights your body in a different way",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "When I am on Buttwrap, I can't control myself, and I always end up ordering 5 pairs at the time. If you are like me and make orders over 59€, doesn't matter where you are, the shipping is free. Shipping is also always free in Germany, no matter what! If you are in other EU countries and want to make smaller orders, you will pay 9.90€ of shipping cost. For small orders outside EU you will pay 19.90€",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
oscar_ebw_chat = ScriptedChat.create!(oscar_ebw_chat_params)
oscar_bw_chat_params = {
  name: "Oscar BW Chat",
  title: "Do you need help?",
  persona_id: oscar.id,
  chat_step_attributes: {
    chat_messages_attributes: [
      {
        text: "Any questions about the product? I tried it, maybe I can help you.",
      },
    ],
    chat_options_attributes: [
      {
        text: "Why should I choose this?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "I like brief boxers! They just keep stuff where it belongs and feel super comfortable, especially when working out!",
            },
          ],
        },
      },
      {
        text: "How does the shipping work?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "When I am on Buttwrap, I can't control myself, and I always end up ordering 5 pairs at the time. If you are like me and make orders over 59€, doesn't matter where you are, the shipping is free. Shipping is also always free in Germany, no matter what! If you are in other EU countries and want to make smaller orders, you will pay 9.90€ of shipping cost. For small orders outside EU you will pay 19.90€",
            },
          ],
        },
      },
      {
        text: "What materials is it made of?",
        destination_chat_step_attributes: {
          chat_messages_attributes: [
            {
              text: "This pair is made of fine and soft cotton-stretch fabric (95% cotton, 5% elastane) with a soft waistband for a better fit.",
            },
          ],
        },
      },
    ],
  },
}
oscar_bw_chat = ScriptedChat.create!(oscar_bw_chat_params)

# triggers:
Trigger.create!(order: 1, url_matchers: %w[/], flow: main_showcase)
Trigger.create!(order: 2, url_matchers: %w[/:id/checkouts/:checkoutId/thank_you], flow: purchase_outro)
Trigger.create!(order: 3, url_matchers: %w[/collections/:collectionName/products/elephant-brief-white-organic-cotton /products/elephant-brief-white-organic-cotton], flow: adam_ebw_chat)
Trigger.create!(order: 4, url_matchers: %w[/collections/:collectionName/products/orangutan-brief-red-organic-cotton /products/orangutan-brief-red-organic-cotton], flow: adam_obr_chat)
Trigger.create!(order: 5, url_matchers: %w[/collections/:collectionName/products/brief-cottonstretch-tight-grey-melange /products/brief-cottonstretch-tight-grey-melange], flow: adam_bgm_chat)
Trigger.create!(order: 6, url_matchers: %w[/collections/:collectionName/products/orangutan-brief-red-organic-cotton /products/orangutan-brief-red-organic-cotton], flow: james_obr_chat)
Trigger.create!(order: 7, url_matchers: %w[/collections/:collectionName/products/boxer-cottonstretch-tight-green /products/boxer-cottonstretch-tight-green], flow: james_bg_chat)
Trigger.create!(order: 8, url_matchers: %w[/collections/:collectionName/products/brief-cottonstretch-tight-grey-melange /products/brief-cottonstretch-tight-grey-melange], flow: james_bgm_chat)
Trigger.create!(order: 9, url_matchers: %w[/collections/:collectionName/products/gorilla-boxer-black-organic-cotton /products/gorilla-boxer-black-organic-cotton], flow: oscar_gbb_chat)
Trigger.create!(order: 10, url_matchers: %w[/collections/:collectionName/products/elephant-boxer-white-organic-cotton /products/elephant-boxer-white-organic-cotton], flow: oscar_ebw_chat)
Trigger.create!(order: 11, url_matchers: %w[/collections/:collectionName/products/boxer-cottonstretch-tight-white /products/boxer-cottonstretch-tight-white], flow: oscar_bw_chat)

# rubocop:enable Metrics/LineLength
