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
require 'rails_helper'

RSpec.describe AiGeneratedTheme do
  describe 'validations' do
    it('valids with valid attributes') do
      ai_generated_theme = build(:ai_generated_theme)
      expect(ai_generated_theme).to be_valid
    end

    it('does not valid without theme') do
      ai_generated_theme = build(:ai_generated_theme, theme: nil)
      expect(ai_generated_theme).not_to be_valid
    end

    it('does not valid with theme longer than 255 letters') do
      ai_generated_theme = build(:ai_generated_theme, theme: 'a' * 256)
      expect(ai_generated_theme).not_to be_valid
    end
  end
end
