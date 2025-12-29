Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'

  resources :spaces, only: [:index, :show]
  get "spaces/style/:style", to: "spaces#by_style", as: :spaces_by_style
  get "spaces/area/:area", to: "spaces#by_area", as: :spaces_by_area
  resources :stores, only: [:index, :show]
  get "stores/focus/:focus", to: "stores#by_focus", as: :stores_by_focus
  get "stores/area/:area", to: "stores#by_area", as: :stores_by_area
  get "events", to: "events#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get "spotify/playlist/:id", to: "spotify#playlist"

  # Defines the root path route ("/")
  # root "posts#index"
end
