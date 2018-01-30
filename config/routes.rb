Rails.application.routes.draw do
  scope '/api/v1', defaults: { format: 'json' } do
    devise_for :influencers, only: []
    devise_scope :influencer do
      post "/influencers/sign_up", to: "influencers/registrations#create"
      post "/influencers/sign_in", to: "influencers/sessions#create"
      delete "/influencers/sign_out", to: "influencers/sessions#destroy"
    end
    get "/consumers/multipass", to: "consumers#multipass"
    resources :pdps
    resources :likes, only: %i[create show destroy]
    resources :products, only: %i[show]
  end
end
