FactoryBot.define do
  factory :ai_generated_answer do
    perspective { 1 }
    hint { 'MyText' }
    answer { 'MyText' }
    idea_session { nil }
  end
end
