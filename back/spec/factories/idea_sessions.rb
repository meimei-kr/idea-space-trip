# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string(255)      not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  category               :integer          default(0), not null
#  question               :integer          default(0), not null
#  is_ai_answer_generated :boolean          default(FALSE), not null
#  theme                  :text(65535)
#  is_finished            :boolean          default(FALSE), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
FactoryBot.define do
  factory :idea_session do
    user { nil }
    uuid { 'MyString' }
    is_theme_determined { false }
    is_ai_theme_generated { false }
    category { 1 }
    question { 1 }
    is_ai_answer_generated { false }
    theme { 'MyText' }
    is_finished { false }
  end
end
