FactoryBot.define do
  factory :idea_memo do
    idea_session { nil }
    perspective { 1 }
    hint { 'MyText' }
    answer { 'MyText' }
    comment { 'MyText' }
  end
end
