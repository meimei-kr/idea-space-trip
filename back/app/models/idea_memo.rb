# == Schema Information
#
# Table name: idea_memos
#
#  id              :bigint           not null, primary key
#  idea_session_id :bigint           not null
#  perspective     :integer          not null
#  hint            :text(65535)
#  answer          :text(65535)      not null
#  comment         :text(65535)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class IdeaMemo < ApplicationRecord
  belongs_to :idea_session

  attribute :perspective, :integer
  enum :perspective,
       { modify: 10, substitute: 20, reverse: 30, combine: 40, magnify: 50, minify: 60 },
       prefix: true

  validates :perspective, presence: true
  validates :answer, presence: true, length: { maximum: 255 }
end
