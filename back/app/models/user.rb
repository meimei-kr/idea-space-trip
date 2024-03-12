# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :string(255)      not null
#  email      :string(255)      not null
#  provider   :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  has_many :idea_sessions, dependent: :destroy
  has_one :ai_usage_history, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  # JWTをデコードしてユーザーを検索するクラスメソッド
  def self.find_by_jwt(encoded_token)
    decoded_token = JWT.decode(encoded_token,
                               Rails.application.credentials.secret_key_base,
                               true,
                               algorithm: 'HS256')
    payload = decoded_token.first
    find_by(id: payload['user_id'])
  rescue JWT::DecodeError
    nil
  end
end
