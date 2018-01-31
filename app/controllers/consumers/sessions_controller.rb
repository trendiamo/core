module Consumers
  class SessionsController < Devise::SessionsController
    include MultipassAuth

    def create
      consumer = warden.authenticate!(auth_options)
      token = Tiddle.create_and_return_token(consumer, request)
      render json: { authentication_token: token, shopify_token: shopify_token(consumer) }
    end

    def destroy
      Tiddle.expire_token(current_consumer, request) if current_consumer
      render json: {}
    end

    private

    # this is invoked before destroy and we have to override it
    def verify_signed_out_consumer; end
  end
end
