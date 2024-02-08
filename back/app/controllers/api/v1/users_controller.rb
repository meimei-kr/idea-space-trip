module Api
  module V1
    class Api::V1::UsersController < ApplicationController
      def create
        user = User.find_or_create_by!(provider: params[:provider], name: params[:name], email: params[:email])
        render json: { status: :ok }
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end
    end
  end
end