Rails.application.routes.draw do
  # This line mounts Solidus's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the :at option to something different.
  #
  # We ask that you don't use the :as option here, as Solidus relies on it being the default of "spree"
  mount Spree::Core::Engine, at: '/'

  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # Custom controllers in admin
  Spree::Core::Engine.routes.draw do
    namespace :admin do
      resources :taxonomies, only: [] do
        resources :taxons, only: [] do
          resources :taxon_contents, only: [:edit, :update]
        end
      end
    end
    namespace :api do
      resources :taxonomies, only: [] do
        resources :taxons, only: [] do
          resources :taxon_contents, only: [:edit, :update]
        end
      end
    end
  end
end
