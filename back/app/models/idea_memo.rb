# == Schema Information
#
# Table name: idea_memos
#
#  id              :bigint           not null, primary key
#  uuid            :string           not null
#  idea_session_id :bigint           not null
#  perspective     :integer          not null
#  hint            :text
#  answer          :text             not null
#  comment         :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class IdeaMemo < ApplicationRecord
  belongs_to :idea_session
  has_one :idea_like, dependent: :destroy

  attribute :perspective, :integer
  enum :perspective,
       { modify: 10, substitute: 20, reverse: 30, combine: 40, magnify: 50, minify: 60 },
       prefix: true

  validates :perspective, presence: true
  validates :answer, presence: true, length: { maximum: 255 }
  validates :comment, length: { maximum: 255 }
end
