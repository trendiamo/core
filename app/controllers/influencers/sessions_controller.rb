module Influencers
  class SessionsController < Devise::SessionsController
    def create
      influencer = warden.authenticate!(auth_options)
      token = Tiddle.create_and_return_token(influencer, request)
      render json: { authentication_token: token }
    end

    def destroy
      Tiddle.expire_token(current_influencer, request) if current_influencer
      render json: {}
    end

    private

    # this is invoked before destroy and we have to override it
    def verify_signed_out_influencer; end
  end
end
