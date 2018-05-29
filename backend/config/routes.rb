Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"

  defaults format: :json do
    scope "api/v1" do
      devise_for :users, only: []
      devise_scope :user do
        post "/users/sign_up", to: "users/registrations#create"
        post "/users/sign_in", to: "users/sessions#create"
        delete "/users/sign_out", to: "users/sessions#destroy"
      end
    end

    namespace :bubble do
      resources :users, only: :create
      resources :collections, only: %i[create index show update destroy] do
        resources :products, only: %i[create index show update destroy]
      end
    end
  end
end
