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
      devise_scope :user do
        post "/users/sign_up", to: "users/registrations#create"
        put "/users/change_password", to: "users/registrations#update"
        post "/users/password", to: "users/passwords#create"
        put "/users/password", to: "users/passwords#update"
        post "/users/sign_in", to: "users/sessions#create"
        delete "/users/sign_out", to: "users/sessions#destroy"
      end
      resources :influencers, only: %i[index show update create destroy]
      resource :me, only: %i[show update]
      resources :websites, only: %i[show update]
    end
    get "s3/sign", to: "s3#sign"
    # post :stripe, to: 'stripe#webhook'
    # resources :payments, only: :create
  end
end
