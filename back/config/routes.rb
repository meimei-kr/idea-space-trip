Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  post 'auth/:provider/callback', to: 'api/v1/users#create'
  post 'auth/guest/signin', to: 'api/v1/users#create_guest'
end
