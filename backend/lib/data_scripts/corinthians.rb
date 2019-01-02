# rubocop:disable Metrics/LineLength

# account:
account = Account.find_or_create_by!(name: "Corinthians")
ActsAsTenant.default_tenant = account

# website:
Website.create!(name: "Corinthians", hostnames: %w[www.shoptimao.com.br])

# personas:
cassio_params = {
  name: "Cássio",
  description: "Quero te mostrar minhas peças favoritas para você usar em campo!",
  profile_pic_url: "https://console-assets.ams3.digitaloceanspaces.com/manual/corinthians/cassio.jpg",
}
cassio = Persona.create!(cassio_params)
pedrinho_params = {
  name: "Pedrinho",
  description: "Dá uma olhada nos produtos que eu mais uso e selecionei para você...",
  profile_pic_url: "https://console-assets.ams3.digitaloceanspaces.com/manual/corinthians/pedrinho.jpg",
}
pedrinho = Persona.create!(pedrinho_params)
jadson_params = {
  name: "Jadson",
  description: "Se você é um jogador, a camisa nº 10 é pra você! Dá uma olhada 😉",
  profile_pic_url: "https://console-assets.ams3.digitaloceanspaces.com/manual/corinthians/jadson.jpg",
}
jadson = Persona.create!(jadson_params)

# flows:

main_showcase_params = {
  name: "Main Showcase",
  title: "Precisa de Ajuda?",
  subtitle: "Conheça o time",
  persona_id: cassio.id,
  spotlights_attributes: [
    {
      text: "Quero te mostrar minhas peças favoritas para você usar em campo!",
      product_picks_attributes: [
        {
          url: "https://www.shoptimao.com.br/camiseta-corinthians-cassio-logo-masculina-branco-D65-1724-014",
          name: "Camiseta Cássio Logo",
          description: "Eu amo essa camisa, ela me representa não só como jogador, mas como pessoa.",
          display_price: "R$ 69,99",
          pic_url: "http://static.shoptimao.com.br/produtos/camiseta-corinthians-cassio-logo-masculina/14/D65-1724-014/D65-1724-014_zoom1.jpg",
        },
        {
          url: "https://www.shoptimao.com.br/calcao-corinthians-nike-masculino-preto+branco-D12-9825-026",
          name: "Calção - Preto e Branco",
          description: "Esse é um calção preto clássico que você pode sempre usar em seus jogos.",
          display_price: "R$ 129,89",
          pic_url: "https://static.shoptimao.com.br/produtos/calcao-corinthians-nike-masculino/26/D12-9825-026/D12-9825-026_zoom1.jpg",
        },
        {
          url: "https://www.shoptimao.com.br/luva-de-goleiro-nike-match-masculina-azul-HZM-0281-008",
          name: "Luva de Goleiro Nike Match",
          description: "Essa luva me trás muitas memórias e grandes emoções. Dê uma espiada!",
          display_price: "R$ 129,90",
          pic_url: "https://static.shoptimao.com.br/produtos/luva-de-goleiro-nike-match-masculina/08/HZM-0281-008/HZM-0281-008_zoom1.jpg",
        },
      ],
      persona: cassio,
    },
    {
      text: "Dá uma olhada nos produtos que eu mais uso e selecionei para você...",
      product_picks_attributes: [
        {
          url: "https://www.shoptimao.com.br/camisa-corinthians-ii-1819-n-38-pedrinho-torcedor-nike-masculina-preto-D12-9947-006",
          name: "Camisa II 18/19 Pedrinho",
          description: "Eu amo a coleção desse ano, tem detalhes incríveis e com muitas memórias históricas.",
          display_price: "R$ 199,99",
          pic_url: "https://static.shoptimao.com.br/produtos/camisa-corinthians-ii-1819-n-38-pedrinho-torcedor-nike-masculina/06/D12-9947-006/D12-9947-006_zoom1.jpg",
        },
        {
          url: "https://www.shoptimao.com.br/camiseta-corinthians-pedrinho-logo-masculina-branco-D65-1726-014",
          name: "Camiseta Pedrinho Logo",
          description: "Eu acho incrível essa camisa personalisada. Eu gosto de usar no meu dia a dia.",
          display_price: "R$ 69,99",
          pic_url: "https://static.shoptimao.com.br/produtos/camiseta-corinthians-pedrinho-logo-masculina/14/D65-1726-014/D65-1726-014_zoom1.jpg",
        },
        {
          url: "https://www.shoptimao.com.br/camisa-corinthians-i-1819-n-38-pedrinho-torcedor-nike-masculina-branco+preto-D12-9944-028",
          name: "Camisa I 18/19 Pedrinho",
          description: "Essa camisa edição 2018 e 2019 já se tornou um clássico do timão.",
          display_price: "R$ 179,99",
          pic_url: "https://console-assets.ams3.digitaloceanspaces.com/manual/corinthians/product-pedrinho.jpg",
        },
      ],
      persona: pedrinho,
    },
    {
      text: "Se você é um jogador, a camisa nº 10 é pra você! Dá uma olhada 😉",
      product_picks_attributes: [
        {
          url: "https://www.shoptimao.com.br/camisa-corinthians-ii-1819-n-10-jadson-torcedor-nike-masculina-preto-D12-9937-006",
          name: "Camisa II 18/19 Nº 10 Jadson",
          description: "Nos dê uma força usando essa edição especial e surpreenda nossos oponentes!",
          display_price: "R$ 199,99",
          pic_url: "https://static.shoptimao.com.br/produtos/camisa-corinthians-ii-1819-n-10-jadson-torcedor-nike-masculina/06/D12-9937-006/D12-9937-006_zoom1.jpg",
        },
        {
          url: "https://www.shoptimao.com.br/camisa-corinthians-iii-1718-n-10-jadson-torcedor-nike-masculina-grafite+laranja-D12-9027-236",
          name: "Camisa III 17/18 Nº 10 Jadson",
          description: "Essa é uma das minhas versões favoritas. Eu adoro os tons laranja e cinza.",
          display_price: "R$ 269,99",
          pic_url: "https://static.shoptimao.com.br/produtos/camisa-corinthians-iii-1718-n-10-jadson-torcedor-nike-masculina/36/D12-9027-236/D12-9027-236_zoom1.jpg",
        },
        {
          url: "https://www.shoptimao.com.br/camisa-corinthians-i-1819-n-10-jadson-torcedor-nike-masculina-branco+preto-D12-9948-028",
          name: "Camisa I 18/19 Nº 10 Jadson",
          description: "Essa camisa me trás muitas lembranças das minhas aventuras no timão, é clássica!",
          display_price: "R$ 179,99",
          pic_url: "https://console-assets.ams3.digitaloceanspaces.com/manual/corinthians/product-jadson.jpg",
        },
      ],
      persona: jadson,
    },
  ],
}
main_showcase = Showcase.create!(main_showcase_params)

chat_step_attributes = {
  chat_messages_attributes: [
    {
      delay: 800,
      text: "Existe mais alguma dúvida que posso te ajudar com esse produto?",
    },
  ],
  chat_options_attributes: [
    {
      text: "De quais materiais são feitos?",
      destination_chat_step_attributes: {
        chat_messages_attributes: [
          {
            delay: 800,
            text: "Nosso produtos são feitos de Poliéster com tecnologia Dri-Fit, que é um tecido de desempenho que afasta o suor da pele 💦 e mantém você seco e confortável. 👍",
          },
        ],
      },
    },
    {
      text: "Como funciona a entrega?",
      destination_chat_step_attributes: {
        chat_messages_attributes: [
          {
            delay: 800,
            text: "Nós temos 3 formas de entrega. Entrega Express, em até 48h para região de São Paulo. Entrega Normal, em até 7 dias e entrega Agendada, que você pode escolher a data que deseja receber o produto. 🚚",
          },
        ],
      },
    },
    {
      text: "Como funciona o Pagamento?",
      destination_chat_step_attributes: {
        chat_messages_attributes: [
          {
            delay: 800,
            text: "O pagamento das suas compras podem ser feitas por Boleto Bancário, Cartão de Crédito ou Paypal. No Cartão de Crédito você pode parcelar em até 10x. 👍",
          },
        ],
      },
    },
  ],
}

cassio_chat_params = {
  name: "Cássio Chat",
  title: "Precisa de Ajuda?",
  persona_id: cassio.id,
  chat_step_attributes: chat_step_attributes,
}
cassio_chat = ScriptedChat.create!(cassio_chat_params)
pedrinho_chat_params = {
  name: "Pedrinho Chat",
  title: "Precisa de Ajuda?",
  persona_id: pedrinho.id,
  chat_step_attributes: chat_step_attributes,
}
pedrinho_chat = ScriptedChat.create!(pedrinho_chat_params)
jadson_chat_params = {
  name: "Jadson Chat",
  title: "Precisa de Ajuda?",
  persona_id: jadson.id,
  chat_step_attributes: chat_step_attributes,
}
jadson_chat = ScriptedChat.create!(jadson_chat_params)

# triggers:
Trigger.create!(order: 1, url_matchers: %w[/], flow: main_showcase)
Trigger.create!(order: 2, url_matchers: %w[/camiseta-corinthians-cassio-logo-masculina-branco-D65-1724-014 /calcao-corinthians-nike-masculino-preto+branco-D12-9825-026 /luva-de-goleiro-nike-match-masculina-azul-HZM-0281-008], flow: cassio_chat)
Trigger.create!(order: 3, url_matchers: %w[/camisa-corinthians-ii-1819-n-38-pedrinho-torcedor-nike-masculina-preto-D12-9947-006 /camiseta-corinthians-pedrinho-logo-masculina-branco-D65-1726-014 /camisa-corinthians-i-1819-n-38-pedrinho-torcedor-nike-masculina-branco+preto-D12-9944-028], flow: pedrinho_chat)
Trigger.create!(order: 4, url_matchers: %w[/camisa-corinthians-ii-1819-n-10-jadson-torcedor-nike-masculina-preto-D12-9937-006 /camisa-corinthians-iii-1718-n-10-jadson-torcedor-nike-masculina-grafite+laranja-D12-9027-236 /camisa-corinthians-i-1819-n-10-jadson-torcedor-nike-masculina-branco+preto-D12-9948-028], flow: jadson_chat)

# rubocop:enable Metrics/LineLength
