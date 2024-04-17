Rails.application.routes.draw do
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  mount ActionCable.server => '/cable'

  post 'auth/:provider/callback', to: 'api/v1/users#create'

  namespace :api do
    namespace :v1 do
      resource :user, only: %i[show destroy]
      resources :idea_sessions, param: :uuid, only: %i[create update destroy] do
        collection do
          get 'show_in_progress', to: 'idea_sessions#show_in_progress'
          get 'show_latest_two_with_memos', to: 'idea_sessions#show_latest_two_with_memos'
        end
        resources :ai_generated_themes, only: %i[create index]
        delete 'ai_generated_themes', to: 'ai_generated_themes#destroy_all'
        resources :ai_generated_answers, only: %i[create index]
        delete 'ai_generated_answers', to: 'ai_generated_answers#destroy_all'
        resources :idea_memos, only: %i[create]
        get 'idea_memos/all_in_session', to: 'idea_memos#all_in_session'
      end
      resource :ai_usage_history, only: %i[show update]
      resources :idea_memos, param: :uuid, only: %i[index show update destroy] do
        collection do
          get 'this_month_count', to: 'idea_memos#this_month_count'
          get 'index_with_filters', to: 'idea_memos#index_with_filters'
          get 'total_pages_with_filters', to: 'idea_memos#total_pages_with_filters'
        end
        resource :idea_likes, only: %i[create destroy]
      end
    end
  end
end
