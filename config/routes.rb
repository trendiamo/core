Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  scope "/api/v1", defaults: { format: "json" } do
    devise_for :users, only: []
    devise_scope :user do
      post "/users/sign_up", to: "users/registrations#create"
      post "/users/sign_in", to: "users/sessions#create"
      delete "/users/sign_out", to: "users/sessions#destroy"
    end

    resources :users, only: :update
    resources :likes, only: %i[create show destroy]
    resources :products, only: %i[show]
    resources :comments, only: %i[index create]
  end
end
