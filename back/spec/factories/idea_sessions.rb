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
