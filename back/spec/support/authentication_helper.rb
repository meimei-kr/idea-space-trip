module AuthenticationHelper
  def encode_jwt(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end
end
