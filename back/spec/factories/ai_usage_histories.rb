FactoryBot.define do
  factory :ai_usage_history do
    user { nil }
    date { '2024-02-28' }
    theme_generated_count { 1 }
    answer_generated_count { 1 }
  end
end
