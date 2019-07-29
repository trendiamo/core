class PopulateShowcases
  def self.process
    new.process
  end

  def process
    create_showcases
  end

  private

  def create_showcases # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    Array.new(3) do
      persona = Persona.order("RANDOM()").first
      showcase_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Showcase",
        persona: persona,
        use_persona_animation: persona.profile_pic_animation&.url ? rand < 0.5 : false,
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
    persona = Persona.order("RANDOM()").first
    {
      product_picks_attributes: Array.new(3) { |index| product_picks_attributes(index) },
      persona: persona,
      use_persona_animation: persona.profile_pic_animation&.url ? rand < 0.5 : false,
      order: spotlight_index + 1,
    }
  end

  def product_picks_attributes(product_pick_index)
    {
      url: Faker::Internet.url,
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      display_price: "€#{Faker::Commerce.price}",
      pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                      file_format: "jpeg"),
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
      persona = Persona.order("RANDOM()").first
      simple_chat_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Chat",
        persona: persona,
        use_persona_animation: persona.profile_pic_animation&.url ? rand < 0.5 : false,
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
        html: "<p>#{Faker::Lorem.sentence}</p>",
      }
    end
  end

  def simple_chat_product_messages_attributes
    Array.new(1) do
      {
        type: "SimpleChatProductMessage",
        title: Faker::Commerce.product_name,
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                        file_format: "jpeg"),
        url: Faker::Internet.url,
        display_price: "€#{Faker::Commerce.price}",
      }
    end
  end

  def simple_chat_product_messages_carousel_attributes # rubocop:disable Metrics/MethodLength
    Array.new(2) do
      {
        type: "SimpleChatProductMessage",
        title: Faker::Commerce.product_name,
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                        file_format: "jpeg"),
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
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                        file_format: "jpeg"),
      }
    end
  end

  def simple_chat_picture_messages_carousel_attributes
    Array.new(2) do
      {
        type: "SimpleChatPictureMessage",
        pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                        file_format: "jpeg"),
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
    ActsAsTenant.default_tenant = Account.find_by(name: "Test Account")
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
    Account.create!(name: "Test Account")
    Account.create!(name: "Other Account")
  end

  def create_websites
    # 0.0.0.0:8080 is there to redirect the user to a trigger's page in console-frontend
    Website.create!(name: "Test Account", hostnames: %w[0.0.0.0:8080 0.0.0.0 localhost],
                    account: Account.find_by(name: "Test Account"))
    Website.create!(name: "Other Account", hostnames: %w[www.other-account.com],
                    account: Account.find_by(name: "Other Account"))
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

      Membership.create!(account: Account.find_by(name: "Test Account"),
                         user: user, role: team_member[:role] || "owner")
      if team_member[:multiple_memberships]
        Membership.create!(account: Account.find_by(name: "Other Account"),
                           user: user, role: "editor")
      end
    end
  end

  def create_personas # rubocop:disable Metrics/MethodLength
    Array.new(6) do |i|
      persona_attrs = {
        name: Faker::RickAndMorty.character,
        description: Faker::RickAndMorty.quote,
        profile_pic: Picture.find_or_create_by!(url: "https://randomuser.me/api/portraits/women/#{i % 99 + 1}.jpg",
                                                file_format: "jpeg"),
        profile_pic_animation: [Picture.find_or_create_by!(url: "https://random-d.uk/api/#{i % 99 + 1}.gif",
                                                           file_format: "gif"), nil,].sample,
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
