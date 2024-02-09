module Api
  module V1
    class Api::V1::UsersController < ApplicationController
      def create
        user = User.find_or_create_by!(user_params)
        render json: { status: :ok }
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      def create_guest
        loop do
          guest_email = "guest_#{SecureRandom.alphanumeric(10)}@example.com"
          @user = User.create!(name: 'Guest', email: guest_email)
          break if @user.persisted?
        end
        render json: { user: @user }
      rescue StandardError => e
        puts "error:" + e.message
        render json: { error: e.message }, status: :internal_server_error
      end

      private

      def user_params
        params.require(:user).permit(:provider, :name, :email)
      end
    end
  end
end