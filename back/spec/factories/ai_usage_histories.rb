# == Schema Information
#
# Table name: ai_usage_histories
#
#  id                     :bigint           not null, primary key
#  user_id                :bigint           not null
#  date                   :date             not null
#  theme_generated_count  :integer          default(0), not null
#  answer_generated_count :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
FactoryBot.define do
  factory :ai_usage_history do
    date { '2024-02-28' }
    theme_generated_count { 0 }
    answer_generated_count { 0 }
    user
  end
end
