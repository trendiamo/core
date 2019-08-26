Rails.application.configure do
  config.lograge.base_controller_class = 'ActionController::API'
  config.lograge.enabled = true

  # this action is hit too many times per second to keep logging this
  config.lograge.ignore_actions = ['GraphqlController#execute'] if Rails.env.production?
end
