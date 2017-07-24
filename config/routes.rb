Rails.application.routes.draw do
  root 'parks#index'
  resources :parks, only: :index
  # get 'parks/index', :defaults => { :format => 'json' }
end
