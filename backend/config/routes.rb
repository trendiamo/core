require "resque/server"

Rails.application.routes.draw do
  mount Resque::Server, at: "/jobs" if Rails.env.development?

  devise_for :users, only: []
  post "/graphql", to: "graphql#execute"

  defaults format: :json do
    namespace :api do
      namespace :v1 do
        get "/csrf_token", to: "csrf#csrf_token"
        resource :me, only: %i[show update]
        get "/me/referrals", to: "mes#referrals"
        resources :generated_urls, only: %i[index create]
        get "s3/sign", to: "s3#sign"
        get "/cors_proxy(/*url)", to: "cors_proxy#download", format: false

        devise_scope :user do
          get "/users/confirmation", to: "users/confirmations#show"
          post "/users/sign_up", to: "users/registrations#create"
          post "/users/sign_up_with_invite", to: "users/registrations#create_with_invite"
          put "/users/change_password", to: "users/registrations#update"
          get "/users/password/edit", to: "users/passwords#edit"
          post "/users/password", to: "users/passwords#create"
          put "/users/password", to: "users/passwords#update"
          post "/users/sign_in", to: "users/sessions#create"
          delete "/users/sign_out", to: "users/sessions#destroy"
          put "/users/onboarding", to: "mes#update_onboarding"
          get "/users/invites", to: "users/invites#edit"
          post "/users/invites", to: "users/invites#create"
        end

        resources :accounts, only: %i[index show create destroy], param: :slug
        resources :websites, only: %i[show update]
        resources :website_settings, only: %i[update]
        get "/website_settings", to: "website_settings#show"
        resources :brands, only: %i[index]

        get "/sellers/autocomplete", to: "autocompletes#sellers_autocomplete"
        get "/flows/autocomplete", to: "autocompletes#flows_autocomplete"
        get "/path/autocomplete", to: "autocompletes#path_autocomplete"

        resources :images, only: %i[index create]
        delete "/images", to: "images#destroy"

        resources :sellers, only: %i[index show update create]
        delete "/sellers", to: "sellers#destroy"

        resources :showcases, only: %i[index show update create]
        delete "/showcases", to: "showcases#destroy"
        post "/showcases/:id/duplicate", to: "showcases#duplicate"
        resources :simple_chats, only: %i[index show update create]
        delete "/simple_chats", to: "simple_chats#destroy"
        post "/simple_chats/:id/duplicate", to: "simple_chats#duplicate"
        resources :outros, only: %i[index show update create]
        delete "/outros", to: "outros#destroy"
        post "/outros/:id/duplicate", to: "outros#duplicate"
        resources :triggers, only: %i[index show update create]
        post "/triggers/sort", to: "triggers#sort"
        delete "/triggers", to: "triggers#destroy"
        resources :users, only: %i[index]
        delete "/users", to: "users#destroy"
        resources :flows, only: %i[index]

        resources :affiliations, only: %i[create]

        get "/events", to: "mixpanel_events#index"
      end
    end

    namespace :shop_api do
      namespace :v1 do
        resources :products, only: %i[index show create update destroy]
      end
    end

    namespace :tagged_products_api do
      resources :clients, only: %i[index show create update destroy]
    end
  end
  # post :stripe, to: 'stripe#webhook'
  # resources :payments, only: :create
end
