class ThemeAnswer < ApplicationRecord
  belongs_to :idea_session

  validates :answer, presence: true, length: { maximum: 255 }
end
