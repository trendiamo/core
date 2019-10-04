class StoreLoginEvent
  attr_reader :user, :auth

  def initialize(user, auth)
    @user = user
    @auth = auth
  end

  def perform
    request = ActionDispatch::Request.new(auth.env)
    LoginEvent.create!(user: user, timestamp: Time.now.utc, domain: request.domain)
  end
end
