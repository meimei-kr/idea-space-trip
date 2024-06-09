# == Schema Information
#
# Table name: ai_generated_answers
#
#  id              :bigint           not null, primary key
#  perspective     :integer          not null
#  hint            :text             not null
#  answer          :text             not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :ai_generated_answer do
    perspective { :modify }
    hint { 'MyText' }
    sequence(:answer) { |n| "MyText#{n}" }
    idea_session
  end
end
