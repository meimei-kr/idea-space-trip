module Api
  module V1
    class AiUsageHistoriesController < ApplicationController
      def show
        ai_usage_history = @current_user.ai_usage_history
        if ai_usage_history.nil?
          render json: { error: 'AI使用履歴が見つかりません。' }, status: :not_found
        else
          authorize ai_usage_history
          render json: AiUsageHistorySerializer.new(ai_usage_history).serializable_hash.to_json,
                 status: :ok
        end
      end

      def update
        ai_usage_history = @current_user.ai_usage_history
        authorize ai_usage_history
        if ai_usage_history.update(count: ai_usage_history.count + 1)
          render json: AiUsageHistorySerializer.new(ai_usage_history).serializable_hash.to_json,
                 status: :ok
        else
          render json: ai_usage_history.errors, status: :unprocessable_entity
        end
      end
    end
  end
end
