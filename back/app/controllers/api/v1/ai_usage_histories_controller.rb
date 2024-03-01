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

      def update; end

      private

      def ai_usage_history_params
        params.require(:ai_usage_history).permit(
          :date,
          :theme_generated_count,
          :answer_generated_count
        )
      end
    end
  end
end
