Rails.application.routes.draw do
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
  end
end
