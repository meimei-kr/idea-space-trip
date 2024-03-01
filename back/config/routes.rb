Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  post 'auth/:provider/callback', to: 'api/v1/users#create'

  namespace :api do
    namespace :v1 do
      resources :idea_sessions, param: :uuid, only: %i[index create update destroy] do
        collection do
          get 'show_in_progress', to: 'idea_sessions#show_in_progress'
        end
      end
      resource :ai_usage_history, only: %i[show update]
    end
  end
end
