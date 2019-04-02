class PopulateShowcases
  def self.process
    new.process
  end

  def process
    create_showcases
  end

  private

  def create_showcases
    Array.new(3) do
      showcase_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Showcase",
        persona: Persona.order("RANDOM()").first,
        title: Faker::Lorem.sentence,
        subtitle: Faker::Lorem.sentence,
        spotlights_attributes: Array.new(3) { |index| spotlights_attributes(index) },
      }
      Showcase.create!(showcase_attrs)
    end
  end

  def spotlights_attributes(spotlight_index)
    {
      product_picks_attributes: Array.new(3) { |index| product_picks_attributes(index) },
      persona: Persona.order("RANDOM()").first,
      order: spotlight_index + 1,
    }
  end

  def product_picks_attributes(product_pick_index)
    {
      url: Faker::Internet.url,
      name: Faker::Lorem.words.join(" ").capitalize,
      description: Faker::Lorem.sentence,
      display_price: "€#{Faker::Number.decimal(2)}",
      pic_url: Faker::LoremPixel.image,
      pic: Picture.find_or_create_by!(url: Faker::LoremPixel.image("300x300", false, "fashion")),
      order: product_pick_index + 1,
    }
  end
end

class PopulateNavigations
  def self.process
    new.process
  end

  def process
    create_navigations
  end

  private

  def create_navigations
    Array.new(3) do
      navigation_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Navigation",
        persona: Persona.order("RANDOM()").first,
        navigation_items_attributes: Array.new(6) { |index| navigation_item_attributes(index) },
      }
      Navigation.create!(navigation_attrs)
    end
  end

  def navigation_item_attributes(navigation_item_index)
    {
      text: Faker::Lorem.word.capitalize,
      url: Faker::Internet.url,
      pic_url: Faker::LoremPixel.image,
      pic: Picture.find_or_create_by!(url: Faker::LoremPixel.image("300x300", false, "fashion")),
      order: navigation_item_index + 1,
    }
  end
end

class PopulateSimpleChats
  def self.process
    new.process
  end

  def process
    create_simple_chats
  end

  private

  def create_simple_chats
    Array.new(9) do
      simple_chat_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Chat",
        persona: Persona.order("RANDOM()").first,
        title: "Hello there",
        simple_chat_steps_attributes: chat_steps_attributes,
      }
      SimpleChat.create!(simple_chat_attrs)
    end
  end

  def chat_steps_attributes
    result = [
      {
        simple_chat_messages_attributes: simple_chat_messages_attributes,
      },
    ]
    3.times { result.push(simple_chat_step) }
    result
  end

  def simple_chat_step
    {
      key: Faker::Lorem.sentence,
      simple_chat_messages_attributes: simple_chat_messages_attributes,
    }
  end

  def simple_chat_messages_attributes
    Array.new(3) do
      {
        text: Faker::Lorem.sentence,
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
    create_users
    create_websites
    ActsAsTenant.default_tenant = Account.where(name: "Trendiamo Demo").first
    create_personas
    create_outros
    create_simple_chats
    create_showcases
    create_navigations
    create_triggers
  end

  private

  def team_members
    [
      { email: "db", name: "David Bennett" },
      { email: "dh", name: "Dylan Henderson" },
      { email: "frb", name: "Fabian Brooks" },
      { email: "mc", name: "Michael Campbell" },
      { email: "gc", name: "Gregg Cooper" },
      { email: "dw", name: "Douglas Wellington", admin: true },
      { email: "tds", name: "Thomas Simpson", admin: true },
    ]
  end

  def user_format(team_member)
    {
      email: "#{team_member[:email]}@trendiamo.com",
      first_name: team_member[:name].split(" ")[0],
      last_name: team_member[:name].split(" ")[1],
      password: "password", password_confirmation: "password",
      confirmed_at: Time.now,
    }
  end

  def create_account
    Account.create!(name: "Trendiamo Demo")
    Account.create!(name: "Intercom")
  end

  def create_websites
    Website.create!(name: "Trendiamo Demo", hostnames: %w[demo.frekkls.com],
                    account: Account.where(name: "Trendiamo Demo").first)
    Website.create!(name: "Intercom", hostnames: %w[www.intercom.com],
                    account: Account.where(name: "Intercom").first)
  end

  def create_users
    users_attrs = team_members.map do |team_member|
      user = user_format(team_member)
      user[:account] = Account.where(name: "Trendiamo Demo").first unless team_member[:admin]
      user[:admin] = team_member[:admin] == true
      user
    end
    User.create!(users_attrs)
  end

  def create_personas
    Array.new(22) do |i|
      persona_attrs = {
        name: Faker::RickAndMorty.character,
        description: Faker::RickAndMorty.quote,
        profile_pic_url: "https://randomuser.me/api/portraits/men/#{i % 99}.jpg",
        profile_pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/men/#{i % 99 + 1}.jpg"),
      }
      Persona.create!(persona_attrs)
    end
  end

  def create_outros
    Array.new(3) do
      outro_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Outro",
        persona: Persona.order("RANDOM()").first,
        chat_bubble_text: "Awesome! 🤩 Was I helpful?",
        chat_bubble_button_yes: "Yes, thanks!",
        chat_bubble_button_no: "Not really.",
      }
      Outro.create!(outro_attrs)
    end
  end

  def create_simple_chats
    PopulateSimpleChats.process
  end

  def create_showcases
    PopulateShowcases.process
  end

  def create_navigations
    PopulateNavigations.process
  end

  def create_triggers
    Array.new(11) do |i|
      trigger_attrs = {
        order: i + 1,
        flow: [Showcase, SimpleChat, Outro, Navigation].sample.all.sample,
        url_matchers: Array.new(rand(1...5)) { "/" + Faker::Internet.slug(Faker::Lorem.words(2).join("-")) },
      }
      Trigger.create!(trigger_attrs)
    end
  end
end
