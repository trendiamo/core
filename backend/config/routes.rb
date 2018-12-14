require "resque/server"

Rails.application.routes.draw do
  mount Resque::Server, at: "/jobs" if Rails.env.development?

  devise_for :users, only: []
  post "/graphql", to: "graphql#execute"

  devise_scope :user do
    get "/users/confirmation", to: "users/confirmations#show"
    get "/users/password/edit", to: "users/passwords#edit"
  end

  defaults format: :json do
    scope "api/v1" do
      get "/csrf_token", to: "csrf#csrf_token"
      devise_scope :user do
        post "/users/sign_up", to: "users/registrations#create"
        put "/users/change_password", to: "users/registrations#update"
        post "/users/password", to: "users/passwords#create"
        put "/users/password", to: "users/passwords#update"
        post "/users/sign_in", to: "users/sessions#create"
        delete "/users/sign_out", to: "users/sessions#destroy"
        put "/users/onboarding", to: "mes#update_onboarding"
      end

      get "/personas/autocomplete", to: "autocompletes#personas_autocomplete"
      resources :personas, only: %i[index show update create]
      delete "/personas", to: "personas#destroy"

      resources :curations, only: %i[index show update create]
      delete "/curations", to: "curations#destroy"
      resources :scripted_chats, only: %i[index]
      delete "/scripted_chats", to: "scripted_chats#destroy"
      resources :outros, only: %i[index show update create]
      delete "/outros", to: "outros#destroy"

      resources :triggers, only: %i[index show update create]
      post "/triggers/sort", to: "triggers#sort"
      delete "/triggers", to: "triggers#destroy"
      resources :flows, only: %i[index]
      get "/flows/autocomplete", to: "autocompletes#flows_autocomplete"

      resource :me, only: %i[show update]
      resources :websites, only: %i[show update]
    end
    get "s3/sign", to: "s3#sign"
    # post :stripe, to: 'stripe#webhook'
    # resources :payments, only: :create
  end
end
