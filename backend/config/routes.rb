Rails.application.routes.draw do
  post 'signup', to: 'users#sign_up'
  post 'login', to: 'sessions#create'
  get 'gifs', to: 'gif#index'
  get 'saved-list', to: 'saved_lists#index'
  post 'saved-list', to: 'saved_lists#create'
  delete 'saved-list/:id', to: 'saved_lists#destroy'
end
