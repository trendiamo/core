class PopulateShowcases
  def self.process
    new.process
  end

  def process
    create_showcases
  end

  private

  def create_showcases # rubocop:disable Metrics/MethodLength
    Array.new(3) do
      showcase_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Showcase",
        persona: Persona.order("RANDOM()").first,
        title: Faker::Lorem.sentence,
        subtitle: Faker::Lorem.sentence,
        chat_bubble_text: Faker::Movie.quote,
        chat_bubble_extra_text: Faker::Movie.quote,
        spotlights_attributes: Array.new(3) { |index| spotlights_attributes(index) },
        owner: User.where(admin: false).sample,
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
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      display_price: "€#{Faker::Commerce.price}",
      pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg"),
      order: product_pick_index + 1,
    }
  end
end

class PopulateSimpleChats # rubocop:disable Metrics/ClassLength
  def self.process
    new.process
  end

  def process
    create_simple_chats
  end

  private

  def create_simple_chats # rubocop:disable Metrics/MethodLength
    Array.new(3) do
      simple_chat_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Chat",
        persona: Persona.order("RANDOM()").first,
        title: "Hello there",
        chat_bubble_text: Faker::Movie.quote,
        chat_bubble_extra_text: Faker::Movie.quote,
        simple_chat_steps_attributes: chat_steps_attributes,
        owner: User.where(admin: false).sample,
      }
      SimpleChat.create!(simple_chat_attrs)
    end
  end

  def chat_steps_attributes
    result = [
      {
        simple_chat_messages_attributes: update_order(simple_chat_messages_attributes),
      },
    ]
    3.times { result.push(simple_chat_step) }
    result
  end

  def simple_chat_step
    {
      key: Faker::Lorem.sentence,
      simple_chat_messages_attributes: update_order(simple_chat_messages_attributes),
    }
  end

  def simple_chat_messages_attributes
    simple_chat_text_messages_attributes
      .concat(simple_chat_product_messages_attributes)
      .concat(simple_chat_product_messages_carousel_attributes)
      .concat(simple_chat_video_messages_attributes)
      .concat(simple_chat_picture_messages_attributes)
      .concat(simple_chat_picture_messages_carousel_attributes)
  end

  def update_order(flows)
    flows.map.with_index do |flow, index|
      flow.merge(order: index + 1)
    end
  end

  def simple_chat_text_messages_attributes
    Array.new(rand(1..2)) do
      {
        type: "SimpleChatTextMessage",
        text: Faker::Lorem.sentence,
      }
    end
  end

  def simple_chat_product_messages_attributes
    Array.new(1) do
      {
        type: "SimpleChatProductMessage",
        title: Faker::Commerce.product_name,
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg"),
        url: Faker::Internet.url,
        display_price: "€#{Faker::Commerce.price}",
      }
    end
  end

  def simple_chat_product_messages_carousel_attributes
    Array.new(2) do
      {
        type: "SimpleChatProductMessage",
        title: Faker::Commerce.product_name,
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg"),
        url: Faker::Internet.url,
        display_price: "€#{Faker::Commerce.price}",
        group_with_adjacent: true,
      }
    end
  end

  def simple_chat_video_messages_attributes
    Array.new(rand(1..2)) do
      {
        type: "SimpleChatVideoMessage",
        video_url: "https://www.youtube.com/watch?v=#{%w[ytqp1xD9fgA 99Qs6Vlj-Oc aATDh1G28hM].sample}",
      }
    end
  end

  def simple_chat_picture_messages_attributes
    Array.new(1) do
      {
        type: "SimpleChatPictureMessage",
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg"),
      }
    end
  end

  def simple_chat_picture_messages_carousel_attributes
    Array.new(2) do
      {
        type: "SimpleChatPictureMessage",
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg"),
        group_with_adjacent: true,
      }
    end
  end
end

class Populate # rubocop:disable Metrics/ClassLength
  def self.process
    new.process
  end

  def process
    create_account
    create_users
    create_memberships
    create_websites
    ActsAsTenant.default_tenant = Account.where(name: "Trendiamo Demo").first
    create_personas
    create_outros
    create_simple_chats
    create_showcases
    create_triggers
  end

  private

  def team_members # rubocop:disable Metrics/MethodLength
    [
      { email: "admin", name: "Admin User", admin: true },
      { email: "owner", name: "Owner User" },
      { email: "editor", name: "Editor User", role: "editor" },
      { email: "mm", name: "Multiple Memberships User", multiple_memberships: true },
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
      confirmed_at: Time.now.utc,
    }
  end

  def create_account
    Account.create!(name: "Trendiamo Demo")
    Account.create!(name: "Intercom")
  end

  def create_websites
    # 0.0.0.0:8080 is there to redirect the user to a trigger's page in console-frontend
    Website.create!(name: "Trendiamo Demo", hostnames: %w[0.0.0.0:8080 0.0.0.0 localhost demo.frekkls.com],
                    account: Account.where(name: "Trendiamo Demo").first)
    Website.create!(name: "Intercom", hostnames: %w[www.intercom.com],
                    account: Account.where(name: "Intercom").first)
  end

  def create_users
    users_attrs = team_members.map do |team_member|
      user = user_format(team_member)
      user[:admin] = team_member[:admin] == true
      user
    end
    User.create!(users_attrs)
  end

  def create_memberships
    team_members.each do |team_member|
      user = User.find_by(email: "#{team_member[:email]}@trendiamo.com")
      next if user.admin

      Membership.create!(account: Account.where(name: "Trendiamo Demo").first,
                         user: user, role: team_member[:role] || "owner")
      if team_member[:multiple_memberships]
        Membership.create!(account: Account.where(name: "Intercom").first,
                           user: user, role: "editor")
      end
    end
  end

  def create_personas
    Array.new(6) do |i|
      persona_attrs = {
        name: Faker::RickAndMorty.character,
        description: Faker::RickAndMorty.quote,
        profile_pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/women/#{i % 99 + 1}.jpg"),
      }
      Persona.create!(persona_attrs)
    end
  end

  def create_outros # rubocop:disable Metrics/MethodLength
    Array.new(3) do
      outro_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Outro",
        persona: Persona.order("RANDOM()").first,
        chat_bubble_text: "Awesome! 🤩 Was I helpful?",
        chat_bubble_button_yes: "Yes, thanks!",
        chat_bubble_button_no: "Not really.",
        owner: User.where(admin: false).sample,
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

  def create_default_triggers(flows)
    flows.each do |flow|
      url_matchers = flow == SimpleChat ? ["/simple-chat", "/chat"] : ["/#{flow.name.underscore.tr('\_', '-')}"]
      Trigger.create!(flow: flow.first, url_matchers: url_matchers)
    end
  end

  def create_triggers
    flows = [Showcase, SimpleChat, Outro]
    create_default_triggers(flows)
    Array.new(3) do
      trigger_attrs = {
        flow: flows.sample.all.sample,
        url_matchers: Array.new(rand(1...3)) { "/#{Faker::Internet.slug(nil, '-')}" },
      }
      Trigger.create!(trigger_attrs)
    end
  end
end
