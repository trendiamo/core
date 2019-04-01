class DuplicateAccount
  def initialize(account, name, hostnames)
    @name = name
    @hostnames = hostnames
    @account = account
    @cloned_account = @account.deep_clone { |_void, copy| copy.name = @name }
  end

  def perform
    duplicate
  rescue StandardError => e
    puts e
    @cloned_account.destroy if @cloned_account.persisted?
  end

  def duplicate
    @cloned_account.save!
    duplicate_personas
    duplicate_websites
    duplicate_flows
    duplicate_triggers
  end

  def duplicate_personas
    cloned_personas = clone_personas
    @mapped_ids = Hash[@account.personas.pluck(:id).map { |id| [id, nil] }]
    @personas = @account.personas
    ActsAsTenant.with_tenant(@cloned_account) do
      cloned_personas.each do |persona|
        cloned_persona = persona.deep_clone include: %i[profile_pic profile_pic_animation]
        cloned_persona.save!
        @mapped_ids[persona.id] = cloned_persona.id
      end
    end
  end

  def clone_personas
    @account.personas.each do |persona|
      persona.deep_clone include: %i[profile_pic profile_pic_animation]
    end
  end

  def duplicate_websites
    @account.websites.each do |website|
      website_cloned = website.deep_clone
      website_cloned.name = @name
      website_cloned.hostnames = @hostnames
      ActsAsTenant.with_tenant(@cloned_account) do
        website_cloned.save!
      end
    end
  end

  def duplicate_flows
    flows = find_flows
    ActsAsTenant.with_tenant(@cloned_account) do
      flows.each(&:save!)
    end
  end

  def find_flows
    flows = { navigations: navigations,
              showcases: showcases,
              simple_chats: simple_chats,
              outros: Outro.where(account: @account).map(&:deep_clone), }.collect { |_void, value| value }
    assign_personas(flows.flatten)
  end

  def navigations
    Navigation.where(account: @account).map do |navigation|
      navigation.deep_clone include: { navigation_items: :pic }
    end
  end

  def simple_chats
    SimpleChat.where(account: @account).map do |simple_chat|
      simple_chat.deep_clone include: { simple_chat_steps: :simple_chat_messages }
    end
  end

  def showcases
    showcases = Showcase.where(account: @account).map do |showcase|
      showcase.deep_clone include: { spotlights: { product_picks: :pic } }
    end
    showcases.map { |showcase| showcase if assign_personas(showcase.spotlights) }
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

  def assign_personas(collection)
    keys = @mapped_ids.keys
    collection.each_with_index.map do |object, index|
      persona = Persona.find(@mapped_ids[keys[index]])
      object.persona = persona
      object
    end
  end
end
