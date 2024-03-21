module Api
  module V1
    class AiUsageHistoriesController < ApplicationController
      def show
        ai_usage_history = @current_user.ai_usage_history
        if ai_usage_history.nil?
          render json: { error: 'AI使用履歴が見つかりません。' }, status: :not_found
        else
          authorize ai_usage_history
          # 本日のAI使用履歴がなければ、日付とAI使用回数を更新
          if ai_usage_history.date != Time.zone.today
            begin
              ai_usage_history.date = Time.zone.today
              ai_usage_history.count = 0
              ai_usage_history.save!
            rescue ActiveRecord::RecordInvalid => e
              render json: { error: e.message }, status: :unprocessable_entity
              return
            end
          end
          render json: AiUsageHistorySerializer.new(ai_usage_history).serializable_hash.to_json,
                 status: :ok
        end
      end

      def update
        ai_usage_history = @current_user.ai_usage_history
        authorize ai_usage_history

        # AI使用回数を更新
        ai_usage_history.count += 1

        ai_usage_history.save!
        render json: AiUsageHistorySerializer.new(ai_usage_history).serializable_hash.to_json,
               status: :ok
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: "AI使用履歴の更新に失敗しました: #{e.message}" }, status: :unprocessable_entity
      end
    end
  end
end
