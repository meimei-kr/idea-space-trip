# == Schema Information
#
# Table name: users
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  email      :string           not null
#  provider   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class User < ApplicationRecord
  has_many :idea_sessions, dependent: :destroy
  has_many :idea_memos, through: :idea_sessions
  has_one :ai_usage_history, dependent: :destroy
  has_many :idea_likes, dependent: :destroy
  has_many :liked_idea_memos, through: :idea_likes, source: :idea_memo

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  # JWTをデコードしてユーザーを検索するクラスメソッド
  def self.find_with_jwt(encoded_token)
    decoded_token = JWT.decode(encoded_token,
                               Rails.application.credentials.secret_key_base,
                               true,
                               algorithm: 'HS256')
    payload = decoded_token.first
    find_by(id: payload['user_id'])
  rescue JWT::DecodeError
    nil
  end

  # アイデアメモをお気に入り登録する
  def like(idea_memo)
    liked_idea_memos << idea_memo
  end

  # アイデアメモのお気に入り登録を解除する
  def unlike(idea_memo)
    liked_idea_memos.destroy(idea_memo)
  end

  # アイデアメモがお気に入り登録されているかどうかを返す
  def like?(idea_memo)
    liked_idea_memos.include?(idea_memo)
  end
end
