# == Schema Information
#
# Table name: ai_generated_themes
#
#  id              :bigint           not null, primary key
#  theme           :text(65535)      not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class AiGeneratedTheme < ApplicationRecord
  belongs_to :idea_session

  validates :theme, presence: true, length: { maximum: 255 }
end
