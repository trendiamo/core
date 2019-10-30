Rails.application.routes.draw do
  root :to => "home#index"
  put "/shop/enable", to: "shop#enable"
  get "/shop/", to: "shop#show"
  mount ShopifyApp::Engine, at: "/"
end
