Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['GOOGLE_OAUTH_CLIENT_KEY'], ENV['GOOGLE_OAUTH_CLIENT_SECRET_KEY'], {
    scope: "userinfo.email, userinfo.profile",
    request_path: "/shopify_store_api/v1/oauth",
    callback_path: "/shopify_store_api/v1/oauth/callback",
    provider_ignores_state: Rails.env.development?
  }
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_APP_SECRET'], {
    scope: "email",
    info_fields: 'email,name',
    request_path: "/shopify_store_api/v1/oauth/facebook",
    callback_path: "/shopify_store_api/v1/oauth/facebook/callback",
    provider_ignores_state: Rails.env.development?
  }
  configure do |config|
    config.path_prefix = '/users/auth'
  end

  on_failure do |env|
    # we need to setup env
    if env['omniauth.params'].present
      env["devise.mapping"] = Devise.mappings[:user]
    end
    Devise::OmniauthCallbacksController.action(:failure).call(env)
  end
end
