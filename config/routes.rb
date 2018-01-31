Rails.application.routes.draw do
  scope "/api/v1", defaults: { format: "json" } do
    devise_for :influencers, only: []
    devise_scope :influencer do
      post "/influencers/sign_up", to: "influencers/registrations#create"
      post "/influencers/sign_in", to: "influencers/sessions#create"
      delete "/influencers/sign_out", to: "influencers/sessions#destroy"
    end

    devise_for :consumers, only: []
    devise_scope :consumer do
      post "/consumers/sign_up", to: "consumers/registrations#create"
      post "/consumers/sign_in", to: "consumers/sessions#create"
      delete "/consumers/sign_out", to: "consumers/sessions#destroy"
    end

    resources :consumers, only: :update
    # resources :pdps
    resources :likes, only: %i[create show destroy]
    resources :products, only: %i[show]
  end
end
