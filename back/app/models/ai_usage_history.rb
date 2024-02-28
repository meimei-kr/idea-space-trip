class AiUsageHistory < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :theme_generated_count, presence: true
  validates :answer_generated_count, presence: true
end
