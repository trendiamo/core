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
      seller = Seller.order("RANDOM()").first
      showcase_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Showcase",
        seller: seller,
        use_seller_animation: seller.animated_img&.url ? rand < 0.5 : false,
        heading: Faker::Lorem.sentence,
        subheading: Faker::Lorem.sentence,
        teaser_message: Faker::Movie.quote,
        extra_teaser_message: Faker::Movie.quote,
        spotlights_attributes: Array.new(3) { |index| spotlights_attributes(index) },
        owner: User.where(admin: false, affiliate_role: "not_affiliate").sample,
      }
      Showcase.create!(showcase_attrs)
    end
  end

  def spotlights_attributes(spotlight_index)
    seller = Seller.order("RANDOM()").first
    {
      product_picks_attributes: Array.new(3) { |index| product_picks_attributes(index) },
      seller: seller,
      use_seller_animation: seller.animated_img&.url ? rand < 0.5 : false,
      order: spotlight_index + 1,
    }
  end

  def product_picks_attributes(product_pick_index)
    {
      url: Faker::Internet.url,
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      display_price: "€#{Faker::Commerce.price}",
      img: Image.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
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
      seller = Seller.order("RANDOM()").first
      simple_chat_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Chat",
        seller: seller,
        use_seller_animation: seller.animated_img&.url ? rand < 0.5 : false,
        heading: "Hello there",
        teaser_message: Faker::Movie.quote,
        extra_teaser_message: Faker::Movie.quote,
        simple_chat_sections_attributes: chat_sections_attributes,
        owner: User.where(admin: false, affiliate_role: "not_affiliate").sample,
      }
      SimpleChat.create!(simple_chat_attrs)
    end
  end

  def chat_sections_attributes
    result = [
      {
        simple_chat_messages_attributes: update_order(simple_chat_messages_attributes),
      },
    ]
    3.times { result.push(simple_chat_section) }
    result
  end

  def simple_chat_section
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
      .concat(simple_chat_image_messages_attributes)
      .concat(simple_chat_image_messages_carousel_attributes)
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
        img: Image.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
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
        img: Image.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
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

  def simple_chat_image_messages_attributes
    Array.new(1) do
      {
        type: "SimpleChatImageMessage",
        img: Image.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                      file_format: "jpeg"),
      }
    end
  end

  def simple_chat_image_messages_carousel_attributes
    Array.new(2) do
      {
        type: "SimpleChatImageMessage",
        img: Image.find_or_create_by!(url: "https://randomuser.me/api/portraits/lego/#{rand(1..9)}.jpg",
                                      file_format: "jpeg"),
        group_with_adjacent: true,
      }
    end
  end
end

class PopulateUsers
  def self.process
    new.process
  end

  def process
    create_users
    create_memberships
  end

  private

  def team_members # rubocop:disable Metrics/MethodLength
    [
      { email: "admin", name: "Admin User", admin: true },
      { email: "owner", name: "Owner User" },
      { email: "editor", name: "Editor User", role: "editor" },
      { email: "mm", name: "Multiple Memberships User", multiple_memberships: true },
      { email: "dh", name: "Dylan Henderson" },
      { email: "frb", name: "Fabian Brooks" },
      { email: "mc", name: "Michael Campbell" },
      { email: "gc", name: "Gregg Cooper" },
      { email: "dw", name: "Douglas Wellington", admin: true },
      { email: "tds", name: "Thomas Simpson", admin: true },
      { email: "promoter", name: "Paul Simon", affiliate_role: "promoter" },
      { email: "seller", name: "Selena Gomez", affiliate_role: "seller", bio: Faker::RickAndMorty.quote,
        img_url: "https://randomuser.me/api/portraits/women/99.jpg", },
    ]
  end

  def user_format(team_member) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    {
      email: "#{team_member[:email]}@trendiamo.com",
      first_name: team_member[:name].split(" ")[0],
      last_name: team_member[:name].split(" ")[1],
      password: "password", password_confirmation: "password",
      confirmed_at: Time.now.utc,
      affiliate_role: team_member[:affiliate_role] || "not_affiliate",
      social_media_url: team_member[:affiliate_role] ? "http://ig.com/frekkls" : nil,
      bio: team_member[:bio],
      img_url: team_member[:img_url],
      created_at: Date.new(2019, 1, 1),
      accepted_terms_and_conditions_at: team_member[:affiliate_role] && Time.now.utc,
    }
  end

  def create_users # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    users_attrs = team_members.map do |team_member|
      user = user_format(team_member)
      user[:admin] = team_member[:admin] == true
      user[:image] = Image.find_or_create_by!(url: team_member[:img_url], file_format: "jpeg") if team_member[:img_url]
      user
    end
    User.create!(users_attrs)
    code = User.find_by(email: "promoter@trendiamo.com").referral_code
    extra_users_attrs = [
      user_format(email: "i", name: "Invited Lazy", affiliate_role: "promoter").merge(referred_by_code: code),
      user_format(email: "iu", name: "Invited Useful", affiliate_role: "promoter").merge(referred_by_code: code),
    ]
    User.create!(extra_users_attrs)
  end

  def create_memberships
    team_members.each do |team_member|
      user = User.find_by(email: "#{team_member[:email]}@trendiamo.com")
      next if user.admin || user.affiliate_role != "not_affiliate"

      Membership.create!(account: Account.find_by(name: "Test Account"),
                         user: user, role: team_member[:role] || "owner")
      if team_member[:multiple_memberships]
        Membership.create!(account: Account.find_by(name: "Other Account"),
                           user: user, role: "editor")
      end
    end
  end
end

class Populate # rubocop:disable Metrics/ClassLength
  def self.process
    new.process
  end

  def process # rubocop:disable Metrics/MethodLength
    create_accounts
    create_brands
    PopulateUsers.process
    create_websites
    ActsAsTenant.default_tenant = Account.find_by(name: "Test Account")
    create_sellers
    create_outros
    create_simple_chats
    create_showcases
    create_triggers
    create_affiliations
    create_orders
  end

  private

  def create_accounts
    Account.create!(name: "Test Account", is_affiliate: true, created_at: Date.new(2019, 1, 1))
    Account.create!(name: "Other Account")
    8.times { Account.create!(name: Faker::Company.name, is_affiliate: true) }
  end

  def create_websites
    # 0.0.0.0:8080 is there to redirect the user to a trigger's page in console-frontend
    Website.create!(name: "Test Account", hostnames: %w[0.0.0.0:8080 0.0.0.0 localhost],
                    account: Account.find_by(name: "Test Account"))
    Account.where.not(name: "Test Account").each do |account|
      website_attrs = {
        name: account.name,
        hostnames: ["#{account.slug}.com"],
        account: account,
      }
      Website.create!(website_attrs)
    end
  end

  def create_sellers # rubocop:disable Metrics/MethodLength
    Array.new(6) do |i|
      seller_attrs = {
        name: Faker::RickAndMorty.character,
        bio: Faker::RickAndMorty.quote,
        img: Image.find_or_create_by!(url: "https://randomuser.me/api/portraits/women/#{i % 99 + 1}.jpg",
                                      file_format: "jpeg"),
        animated_img: [Image.find_or_create_by!(url: "https://random-d.uk/api/#{i % 99 + 1}.gif",
                                                file_format: "gif"), nil,].sample,
      }
      Seller.create!(seller_attrs)
    end
  end

  def create_outros # rubocop:disable Metrics/MethodLength
    Array.new(3) do
      outro_attrs = {
        name: "#{Faker::Lorem.word.capitalize} Outro",
        seller: Seller.order("RANDOM()").first,
        teaser_message: "Awesome! 🤩 Was I helpful?",
        chat_bubble_button_yes: "Yes, thanks!",
        chat_bubble_button_no: "Not really.",
        owner: User.where(admin: false, affiliate_role: "not_affiliate").sample,
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

  def create_brands # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
    Account.where(is_affiliate: true).each do |account|
      brand_attrs = {
        name: account.name,
        account: account,
        description: Faker::Lorem.sentence(25),
        full_description: "<h2>#{account.name}: #{Faker::Company.bs}!</h2>
                           <p>#{Faker::Lorem.sentence(500)}</p>",
        terms_and_conditions: "<p>#{Faker::Lorem.sentence(500)}</p>",
        header_image_url: Faker::LoremPixel.image("960x300", false, "abstract", Faker::Number.between(1, 10)),
        logo_url: Faker::Company.logo,
        commission_rate: Faker::Number.between(1, 20).to_f / 100,
        commission_description: "per Purchase",
        instagram_url: "https://instagram.com/#{account.slug}",
        facebook_url: "https://facebook.com/#{account.slug}",
        twitter_url: "https://twitter.com/#{account.slug}",
        available_locations: ["🇪🇺 europe", "🇺🇸 usa", "🇬🇧 uk", "🇩🇪 de", "🇳🇱 nl"].sample(rand(1..3)).join(", "),
        is_preview: false,
      }
      Brand.create!(brand_attrs)
    end
    Account.last(3).each do |account|
      account.brand.update!(is_preview: true)
    end
  end

  def create_affiliations
    promoters = User.where.not(affiliate_role: "not_affiliate", last_name: "Lazy")
    affiliate_accounts = Account.where(is_affiliate: true).first(5)
    promoters.each do |promoter|
      affiliate_accounts.sample(affiliate_accounts.length / 2).each do |account|
        affiliation_attrs = { user: promoter, account: account }
        Affiliation.create!(affiliation_attrs)
      end
    end
  end

  def order_params(affiliation) # rubocop:disable Metrics/MethodLength
    amount_in_cents = rand(100_000)
    {
      source: "dummy",
      seller: affiliation.user,
      account: affiliation.account,
      captured_at: (Date.new(2019, 7, 1)..Time.zone.today).to_a.sample,
      commission_rate: affiliation.account.brand.commission_rate,
      currency: "PTT",
      amount_in_cents: amount_in_cents,
      products: [{
        "currency": "PTT",
        "name": Faker::Cannabis.strain,
        "price": amount_in_cents,
        "quantity": rand(1..10),
        "url": "https://trendiamo-mvp.myshopify.com/collections/all/products/white-sweatshirt",
      }],
    }
  end

  def create_orders
    Affiliation.all.map do |affiliation|
      20.times { Order.create!(order_params(affiliation)) }
    end
  end
end
