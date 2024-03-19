# == Schema Information
#
# Table name: idea_sessions
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  uuid                   :string           not null
#  is_theme_determined    :boolean          default(FALSE), not null
#  is_ai_theme_generated  :boolean          default(FALSE), not null
#  theme_category         :integer          default("unselected"), not null
#  theme_question         :integer          default("unselected"), not null
#  theme_answer           :text
#  is_ai_answer_generated :boolean          default(FALSE), not null
#  ai_answer_retry_count  :integer          default(0), not null
#  theme                  :text
#  is_finished            :boolean          default(FALSE), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
FactoryBot.define do
  factory :idea_session do
    uuid { 'MyString' }
    is_theme_determined { false }
    is_ai_theme_generated { false }
    theme_category { 0 }
    theme_question { 0 }
    theme_answer { 'MyText' }
    is_ai_answer_generated { false }
    ai_answer_retry_count { 0 }
    theme { 'MyText' }
    is_finished { false }
    user
  end
end
