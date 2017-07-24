Rails.application.routes.draw do
  root 'parks#index'
  resources :parks, only: [:index, :create]
end
