class ApplicationController < ActionController::API
  before_action :authenticate
  before_action :snake_case_params

  SECRET_KEY = Rails.application.credentials.secret_key_base

  def encode_jwt(payload)
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  private

  def authenticate
    encoded_token = request.headers['Authorization']&.split&.last
    payload = decode_jwt(encoded_token)
    @current_user = User.find(payload['user_id'])
  rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
    render json: { error: "認証に失敗しました: #{e.message}" }, status: :unauthorized
  end

  def decode_jwt(encoded_token)
    decoded_token = JWT.decode(encoded_token, SECRET_KEY, true, algorithm: 'HS256')
    decoded_token.first
  end

  def snake_case_params
    request.parameters.deep_transform_keys!(&:underscore)
  end
end
