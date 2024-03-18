# == Schema Information
#
# Table name: ai_generated_answers
#
#  id              :bigint           not null, primary key
#  perspective     :integer          not null
#  hint            :text(65535)      not null
#  answer          :text(65535)      not null
#  idea_session_id :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :ai_generated_answer do
    perspective { 1 }
    hint { 'MyText' }
    answer { 'MyText' }
    idea_session
  end
end
