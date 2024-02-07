module Api
  module V1
    class Api::V1::UsersController < ApplicationController
      def create
        user = User.find_or_create_by!(provider: params[:provider], name: [:name], email: params[:email])
        if user
          head :ok
        else
          render json: { error: 'ログインに失敗しました' }, status: :unprocessable_entity
        end
      resque StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end