def extract_path(url)
  url.gsub("https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}/", "")
end

def convert_to_url(path)
  "https://#{ENV['DO_BUCKET']}.#{ENV['DO_SPACE_ENDPOINT']}/#{path}"
end

def new_path_format?(source_path)
  source_path.split("/", 3)[1].starts_with?("account")
end

def generate_new_path(source_path)
  filename = source_path.split("/", 4)[3]
  filename = source_path.split("/", 3)[2][9..-1] if new_path_format?(source_path)
  "uploads/account-#{@cloned_account.id}/#{SecureRandom.hex(4)}-#{filename}"
end

def duplicate_pic_url(picture_url)
  source_path = extract_path(picture_url)
  new_path = generate_new_path(source_path)
  destination_path = new_path
  bucket = Aws::S3::Bucket.new(ENV["DO_BUCKET"])
  bucket.object(destination_path).copy_from(bucket: ENV["DO_BUCKET"], key: source_path, acl: "public-read")
  convert_to_url(new_path)
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
    @seller_id_mapping = {} # hash of original seller ids to duplicate ids
    @picture_id_mapping = {} # hash of original picture ids to duplicate ids
    duplicate_pictures
    duplicate_sellers
    duplicate_websites
    duplicate_flows
    duplicate_triggers
  end

  def duplicate_pictures
    @account.pictures.map do |picture|
      cloned_picture = picture.deep_clone
      cloned_picture.url = duplicate_pic_url(picture.url)
      ActsAsTenant.with_tenant(@cloned_account) do
        cloned_picture.save!
      end
      @picture_id_mapping[picture.id] = cloned_picture.id
      cloned_picture
    end
  end

  def duplicate_sellers
    @account.sellers.map do |seller|
      cloned_seller = seller.deep_clone
      cloned_seller.profile_pic_id = @picture_id_mapping[seller.profile_pic_id]
      ActsAsTenant.with_tenant(@cloned_account) do
        cloned_seller.save!
      end
      @seller_id_mapping[seller.id] = cloned_seller.id
      cloned_seller
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
    DuplicateFlows.new(@account, @cloned_account, @seller_id_mapping, @picture_id_mapping).perform
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
  def initialize(account, cloned_account, seller_id_mapping, picture_id_mapping)
    @account = account
    @cloned_account = cloned_account
    @seller_id_mapping = seller_id_mapping
    @picture_id_mapping = picture_id_mapping
  end

  def perform
    flows = {
      showcases: showcases,
      simple_chats: simple_chats,
      outros: Outro.where(account: @account).map(&:deep_clone),
    }.collect { |_void, value| value }.flatten
    assign_sellers(flows)
    ActsAsTenant.with_tenant(@cloned_account) do
      flows.map(&:save!)
    end
  end

  private

  def showcases
    Showcase.where(account: @account).map do |showcase|
      cloned_showcase = showcase.deep_clone(include: { spotlights: :product_picks })
      process_cloned_showcase(cloned_showcase)
      cloned_showcase
    end
  end

  def simple_chats
    SimpleChat.where(account: @account).map do |simple_chat|
      simple_chat.deep_clone(include: { simple_chat_steps: :simple_chat_messages })
    end
  end

  def process_cloned_showcase(cloned_showcase)
    assign_sellers(cloned_showcase.spotlights)
    cloned_showcase.spotlights.map do |spotlight|
      spotlight.product_picks.map do |product_pick|
        product_pick.pic_id = @picture_id_mapping[product_pick.pic.id]
      end
    end
  end

  def assign_sellers(collection)
    collection.map do |object|
      object.seller_id = @seller_id_mapping[object.seller.id]
      object
    end
  end
end
