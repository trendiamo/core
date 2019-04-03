def uri_from_url(url)
  URI.parse(WEBrick::HTTPUtils.escape(url))
end

def generate_new_url(picture_url)
  uri = uri_from_url(picture_url)
  directories_array = uri.path[1..-1].split("/", 4)
  directories_array[2] = SecureRandom.hex(4)
  "#{uri.scheme}://#{uri.host}/#{directories_array.join('/')}"
end

def duplicate_pic_url(picture_url)
  new_url = generate_new_url(picture_url)
  source_path = uri_from_url(picture_url).path[1..-1]
  destination_path = uri_from_url(new_url).path[1..-1]
  bucket = Aws::S3::Bucket.new(ENV["DO_BUCKET"])
  bucket.object(destination_path).copy_from(bucket: ENV["DO_BUCKET"], key: source_path, acl: "public-read")
  new_url
end

class DuplicateAccount
  def initialize(account, name, hostnames)
    @account = account
    @name = name
    @hostnames = hostnames
  end

  def perform
    duplicate
  rescue StandardError, Aws::S3::Errors::ServiceError => e
    @cloned_account.destroy if @cloned_account.persisted?
    raise e
  end

  private

  def duplicate
    @cloned_account = @account.deep_clone { |_void, copy| copy.name = @name }
    @cloned_account.save!
    @persona_id_mapping = {} # hash of original ids to duplicate ids
    duplicate_personas
    duplicate_websites
    duplicate_flows
    duplicate_triggers
  end

  def duplicate_personas
    @account.personas.map do |persona|
      cloned_persona = persona.deep_clone(include: %i[profile_pic])
      cloned_persona.profile_pic.url = duplicate_pic_url(persona.profile_pic.url)
      ActsAsTenant.with_tenant(@cloned_account) do
        cloned_persona.save!
      end
      @persona_id_mapping[persona.id] = cloned_persona.id
      cloned_persona
    end
  end

  def duplicate_websites
    @account.websites.map do |website|
      cloned_website = website.deep_clone
      cloned_website.name = @name
      cloned_website.hostnames = @hostnames
      ActsAsTenant.with_tenant(@cloned_account) do
        cloned_website.save!
      end
    end
  end

  def duplicate_flows
    DuplicateFlows.new(@account, @cloned_account, @persona_id_mapping).perform
  end

  def duplicate_triggers
    Trigger.where(account: @account).each do |trigger|
      trigger.deep_clone do |original, copy|
        flow = original.flow
        copy.flow_id = copy.flow_type.constantize.where(name: flow.name, account: @cloned_account).first.id
        copy.account = @cloned_account
        copy.save!
      end
    end
  end
end

class DuplicateFlows
  def initialize(account, cloned_account, persona_id_mapping)
    @account = account
    @cloned_account = cloned_account
    @persona_id_mapping = persona_id_mapping
  end

  def perform
    flows = {
      navigations: navigations,
      showcases: showcases,
      simple_chats: simple_chats,
      outros: Outro.where(account: @account).map(&:deep_clone),
    }.collect { |_void, value| value }.flatten
    assign_personas(flows)
    ActsAsTenant.with_tenant(@cloned_account) do
      flows.map(&:save!)
    end
  end

  private

  def navigations
    Navigation.where(account: @account).map do |navigation|
      cloned_navigation = navigation.deep_clone(include: { navigation_items: :pic })
      process_cloned_navigation(cloned_navigation)
      cloned_navigation
    end
  end

  def showcases
    Showcase.where(account: @account).map do |showcase|
      cloned_showcase = showcase.deep_clone(include: { spotlights: { product_picks: :pic } })
      process_cloned_showcase(cloned_showcase)
      cloned_showcase
    end
  end

  def simple_chats
    SimpleChat.where(account: @account).map do |simple_chat|
      simple_chat.deep_clone(include: { simple_chat_steps: :simple_chat_messages })
    end
  end

  def process_cloned_navigation(cloned_navigation)
    cloned_navigation.navigation_items.map do |navigation_item|
      navigation_item.pic.url = duplicate_pic_url(navigation_item.pic.url)
      ActsAsTenant.with_tenant(@cloned_account) do
        navigation_item.pic.save!
      end
    end
  end

  def process_cloned_showcase(cloned_showcase)
    assign_personas(cloned_showcase.spotlights)
    cloned_showcase.spotlights.map do |spotlight|
      spotlight.product_picks.map do |product_pick|
        product_pick.pic.url = duplicate_pic_url(product_pick.pic.url)
        ActsAsTenant.with_tenant(@cloned_account) do
          product_pick.pic.save!
        end
      end
    end
  end

  def assign_personas(collection)
    collection.map do |object|
      object.persona_id = @persona_id_mapping[object.persona.id]
      object
    end
  end
end
