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
        resources :generated_urls, only: %i[index create]
        get "s3/sign", to: "s3#sign"
        get "/cors_proxy(/*url)", to: "cors_proxy#download", format: false

        devise_scope :user do
          get "/users/confirmation", to: "users/confirmations#show"
          post "/users/sign_up", to: "users/registrations#create"
          put "/users/change_password", to: "users/registrations#update"
          get "/users/password/edit", to: "users/passwords#edit"
          post "/users/password", to: "users/passwords#create"
          put "/users/password", to: "users/passwords#update"
          post "/users/sign_in", to: "users/sessions#create"
          delete "/users/sign_out", to: "users/sessions#destroy"
          put "/users/onboarding", to: "mes#update_onboarding"
        end

        resources :accounts, only: %i[index show create destroy]
        resources :websites, only: %i[show update]

        get "/personas/autocomplete", to: "autocompletes#personas_autocomplete"
        get "/flows/autocomplete", to: "autocompletes#flows_autocomplete"
        get "/path/autocomplete", to: "autocompletes#path_autocomplete"

        resources :pictures, only: %i[index]
        delete "/pictures", to: "pictures#destroy"

        resources :personas, only: %i[index show update create]
        delete "/personas", to: "personas#destroy"

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
        resources :users, only: %i[index create]
        delete "/users", to: "users#destroy"
        resources :flows, only: %i[index]
      end
    end

    namespace :shop_api do
      namespace :v1 do
        resources :products, only: %i[index show create update destroy]
      end
    end
  end
  # post :stripe, to: 'stripe#webhook'
  # resources :payments, only: :create
end
