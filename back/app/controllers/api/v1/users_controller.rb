module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate, only: [:create]

      def create
        @current_user = User.find_or_create_by!(user_params)
        # 初回ログイン時はAIUsageHistoryを作成
        create_ai_usage_history

        # JWTを発行
        payload = { user_id: @current_user.id, exp: 24.hours.from_now.to_i }
        encoded_token = encode_jwt(payload)

        render json: { user: @current_user, accessToken: encoded_token, status: :ok }
      rescue StandardError => e
        render json: { error: "ログインに失敗しました: #{e.message}" }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:provider, :name, :email)
      end

      def create_ai_usage_history
        ai_usage_history = @current_user.ai_usage_history
        return if ai_usage_history.present?

        @current_user.create_ai_usage_history!(date: Time.zone.today)
      end
    end
  end
end
