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
FactoryBot.define do
  factory :ai_generated_theme do
    theme { 'MyText' }
    idea_session
  end
end
