# == Schema Information
#
# Table name: ai_usage_histories
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  date       :date             not null
#  count      :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AiUsageHistory < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :count, presence: true, numericality: { greater_than_or_equal_to: 0 }
end
