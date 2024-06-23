# == Schema Information
#
# Table name: ai_generated_themes
#
#  id              :bigint           not null, primary key
#  theme           :text             not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class AiGeneratedTheme < ApplicationRecord
  belongs_to :idea_session

  validates :theme, presence: true, length: { maximum: 255 }

  # 生成したテーマを保存し、配列に格納
  def self.create_ai_generated_themes(idea_session, themes_array)
    ai_generated_themes = []
    ActiveRecord::Base.transaction do
      ai_generated_themes = themes_array.map do |theme|
        idea_session.ai_generated_themes.create!(theme:)
      end
      # idea_sessionのis_ai_theme_generatedをtrueに更新
      idea_session.update!(is_ai_theme_generated: true)
    end
    ai_generated_themes
  end
end
