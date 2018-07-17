Rails.application.routes.draw do
  # This line mounts Solidus's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the :at option to something different.
  #
  # We ask that you don't use the :as option here, as Solidus relies on it being the default of "spree"
  mount Spree::Core::Engine, at: "/"

  Spree::Core::Engine.routes.draw do
   namespace :admin do
      resources :orders, only: [] do
        member do
          post :issue_invoice
        end
     end
    end
 end

  post "/graphql", to: "graphql#execute"

  defaults format: :json do
    namespace :rest do
      resources :orders, only: :create
    end
  end
  # put "admin/orders/:id/issue_invoice", controller: 'spree/admin/orders', to: "spree/admin/orders#issue_invoice", as: :issue_invoice


end
