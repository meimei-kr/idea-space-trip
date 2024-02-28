class IdeaSession < ApplicationRecord
  belongs_to :user

  validates :uuid, presence: true, uniqueness: true
  validates :is_theme_determined, inclusion: { in: [true, false] }
  validates :is_ai_theme_generated, inclusion: { in: [true, false] }
  validates :category, presence: true
  validates :question, presence: true
  validates :is_ai_answer_generated, inclusion: { in: [true, false] }
  validates :is_finished, inclusion: { in: [true, false] }
  validates :theme, length: { maximum: 255 }
end
