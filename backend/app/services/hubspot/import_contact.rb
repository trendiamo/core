class Hubspot::ImportContact
  NEWSLETTER_PROPERTY = "leadin_would_you_like_to_signup_to_our_awesome_newsletter_b8a3b3fdf1f177b5d093d0728ce239bd"
  attr_reader :user, :ip_address

  def initialize(user, ip_address)
    @user = user
    @ip_address = ip_address
  end

  def perform
    return unless ENV["HUBSPOT_API_KEY"]
    hbspt_opts = { guid: ENV["HUBSPOT_CREATE_CUSTOMER_FORM_GUID"], formFieldGroups: [] }
    Hubspot::Form.new(hbspt_opts.stringify_keys).submit(body)
  end

  private

  def body
    {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      "#{NEWSLETTER_PROPERTY}": user.subscribed_to_newsletter ? "Checked" : nil,
      hs_context: hs_context,
    }
  end

  def hs_context
    {
      "ipAddress": ip_address,
    }.to_json
  end
end
