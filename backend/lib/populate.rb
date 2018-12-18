class PopulateCurations
  def self.process
    new.process
  end

  def process
    create_curations
  end

  private

  def create_curations
    Array.new(3) do
      curation_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Curation",
        persona: Persona.order("RANDOM()").first,
        title: Faker::Lorem.sentence,
        subtitle: Faker::Lorem.sentence,
        spotlights_attributes: Array.new(3) { spotlights_attributes },
      }
      Curation.create!(curation_attrs)
    end
  end

  def spotlights_attributes
    {
      text: Faker::Lorem.sentence,
      product_picks_attributes: Array.new(3) { product_picks_attributes },
      persona: Persona.order("RANDOM()").first,
    }
  end

  def product_picks_attributes
    {
      url: Faker::Internet.url,
      name: Faker::Lorem.words.join(" ").capitalize,
      description: Faker::Lorem.sentence,
      display_price: "€#{Faker::Number.decimal(2)}",
      pic_url: Faker::LoremPixel.image,
    }
  end
end

class PopulateScriptedChats
  def self.process
    new.process
  end

  def process
    create_scripted_chats
  end

  private

  def create_scripted_chats
    Array.new(9) do
      scripted_chat_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Chat",
        persona: Persona.order("RANDOM()").first,
        title: "Hello there",
        chat_step_attributes: chat_step_attributes(1),
      }
      ScriptedChat.create!(scripted_chat_attrs)
    end
  end

  def chat_step_attributes(height)
    {
      chat_messages_attributes: [
        {
          delay: 800,
          text: Faker::Lorem.paragraph,
        },
      ],
      chat_options_attributes: height.positive? ? chat_options_attributes(height) : [],
    }
  end

  def chat_options_attributes(height)
    Array.new(3) do
      {
        text: "#{Faker::Lorem.sentence}?",
        destination_chat_step_attributes: chat_step_attributes(height - 1),
      }
    end
  end
end

class Populate
  def self.process
    new.process
  end

  def process
    create_account
    create_websites
    create_users
    create_personas
    create_outros
    create_scripted_chats
    create_curations
    create_triggers
  end

  private

  def team_members
    [
      { email: "db", name: "David Bennett" },
      { email: "dh", name: "Dylan Henderson" },
      { email: "frb", name: "Fabian Brooks" },
      { email: "mc", name: "Michael Campbell" },
    ]
  end

  def create_account
    ActsAsTenant.default_tenant = Account.create!(name: "Trendiamo")
  end

  def create_websites
    Website.create!(name: "Demo", hostnames: %w[demo.trendiamo.com])
  end

  def create_users
    users_attrs = team_members.map do |team_member|
      {
        email: "#{team_member[:email]}@trendiamo.com",
        first_name: team_member[:name].split(" ")[0],
        last_name: team_member[:name].split(" ")[1],
        password: "password", password_confirmation: "password",
        confirmed_at: Time.now,
      }
    end
    User.create!(users_attrs)
  end

  def create_personas
    Array.new(22) do |i|
      persona_attrs = {
        name: Faker::RickAndMorty.character,
        description: Faker::RickAndMorty.quote,
        profile_pic_url: "https://randomuser.me/api/portraits/men/#{i % 99}.jpg",
      }
      Persona.create!(persona_attrs)
    end
  end

  def create_outros
    Array.new(3) do
      outro_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Outro",
        persona: Persona.order("RANDOM()").first,
      }
      Outro.create!(outro_attrs)
    end
  end

  def create_scripted_chats
    PopulateScriptedChats.process
  end

  def create_curations
    PopulateCurations.process
  end

  def create_triggers
    Array.new(11) do |i|
      trigger_attrs = {
        order: i + 1,
        flow: [Curation, ScriptedChat, Outro, Navigation].sample.all.sample,
        url_matchers: Array.new(rand(1...5)) { "/" + Faker::Internet.slug(Faker::Lorem.words(2).join("-")) },
      }
      Trigger.create!(trigger_attrs)
    end
  end
end
