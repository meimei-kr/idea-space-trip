module Api
  module V1
    class UsersController < ApplicationController
      def create
        user = User.find_or_create_by!(user_params)

        render json: { user:, status: :ok }
      rescue StandardError => e
        render json: { error: "ログインに失敗しました: #{e.message}" }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:provider, :name, :email)
      end
    end
  end
end
